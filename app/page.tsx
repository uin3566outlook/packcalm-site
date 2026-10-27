'use client';

/* oxlint-disable next/no-img-element */
import { useEffect, useRef, useSyncExternalStore, type MouseEventHandler } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Globe2,
  Repeat2,
  Smartphone,
  X,
} from 'lucide-react';
import {
  languageLabels,
  resolveLanguage,
  resolvePreferredLanguage,
  supportedLanguages,
  translations,
  type Language,
} from './translations';

const baseUrl = import.meta.env.BASE_URL;
const appStoreUrl = 'https://apps.apple.com/us/app/packgo-travel-packing-list/id6809829261';
const appStoreLanguages: Record<Language, string> = {
  en: 'en-US',
  'zh-Hans': 'zh-Hans-CN',
  'zh-Hant': 'zh-Hant-TW',
  ja: 'ja-JP', ko: 'ko-KR', es: 'es-MX', 'pt-BR': 'pt-BR',
  fr: 'fr-CA', id: 'id-ID', th: 'th-TH', vi: 'vi-VN', ar: 'ar-SA',
};
const assetUrl = (path: string) => baseUrl + path.replace(/^\/+/, '');
const screenshotUrl = (language: Language, screen: string) => {
  return assetUrl(`assets/latest/${language}/${screen}.png`);
};
const languageEvent = 'packgo-language-change';
const subscribeLanguage = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  window.addEventListener('languagechange', onChange);
  window.addEventListener(languageEvent, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener('languagechange', onChange);
    window.removeEventListener(languageEvent, onChange);
  };
};
const getBrowserLanguage = (): Language => {
  const requested = new URLSearchParams(window.location.search).get('lang');
  return requested ? resolveLanguage(requested) : resolvePreferredLanguage(navigator.languages);
};
const getServerLanguage = (): Language => 'en';

function selectLanguage(language: Language) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(languageEvent));
}

function legalUrl(
  document: 'privacy-policy' | 'terms-of-use' | 'support',
  language: Language,
) {
  return (
    baseUrl +
    'legal/' +
    document +
    '.html?lang=' +
    language +
    '&locked=1#' +
    language
  );
}

function DownloadButton({
  copy,
  language,
  compact = false,
  onClick,
}: {
  copy: (typeof translations)[Language];
  language: Language;
  compact?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      className={
        'download-button' + (compact ? ' download-button-compact' : '')
      }
      href={
        appStoreUrl + '?l=' +
        appStoreLanguages[language]
      }
      aria-label={copy.appStoreLabel}
      onClick={onClick}
    >
      <Smartphone aria-hidden="true" size={compact ? 17 : 24} strokeWidth={2} />
      <span>{!compact && <small>{copy.downloadFor}</small>}App Store</span>
      {!compact && (
        <ArrowRight aria-hidden="true" size={19} className="download-arrow" />
      )}
    </a>
  );
}

export default function Home() {
  const downloadDialog = useRef<HTMLDialogElement>(null);
  const language = useSyncExternalStore(
    subscribeLanguage,
    getBrowserLanguage,
    getServerLanguage,
  );
  const t = translations[language];
  const handleDownloadClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (!isMobile && downloadDialog.current?.showModal) {
      event.preventDefault();
      downloadDialog.current.showModal();
    }
  };
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language.startsWith('ar') ? 'rtl' : 'ltr';
    document.title = 'PackGo — ' + t.heroLine + ' ' + t.heroAccent;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', `${t.description} ${t.releaseAnnouncement}. ${t.languageNote}`);
  }, [language, t]);
  const steps = [
    {
      Icon: FileText,
      title: t.saveTitle,
      description: t.saveDescription,
      color: 'blue',
    },
    {
      Icon: Repeat2,
      title: t.reuseTitle,
      description: t.reuseDescription,
      color: 'mint',
    },
    {
      Icon: CheckCircle2,
      title: t.confidenceTitle,
      description: t.confidenceDescription,
      color: 'yellow',
    },
  ];
  return (
    <main>
      <a className="skip-link" href="#how-it-works">
        {t.skipLabel}
      </a>
      <header className="site-header section-shell">
        <a className="brand" href="#top" aria-label={t.homeLabel}>
          <img
            src={assetUrl('assets/app-icon.png')}
            width="40"
            height="40"
            alt=""
          />
          <span>PackGo</span>
        </a>
        <nav aria-label={t.navigation}>
          <a className="nav-link" href="#how-it-works">
            {t.navHow}
          </a>
          <a className="nav-link" href="#pro">
            Pro
          </a>
          <label className="language-switcher">
            <Globe2 size={16} aria-hidden="true" />
            <select
              aria-label={t.language}
              value={language}
              onChange={(event) => selectLanguage(resolveLanguage(event.target.value))}
            >
              {supportedLanguages.map((option) => (
                <option value={option} lang={option} key={option}>
                  {languageLabels[option]}
                </option>
              ))}
            </select>
          </label>
          <DownloadButton copy={t} language={language} compact onClick={handleDownloadClick} />
        </nav>
      </header>
      <section
        className="hero section-shell"
        id="top"
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <p className="release-announcement">
            <Globe2 size={15} aria-hidden="true" />
            <span><bdi>1.1.0</bdi> · {t.releaseAnnouncement}</span>
          </p>
          <h1 id="hero-title">
            <span>{t.heroLine}</span>
            <span className="hero-accent">{t.heroAccent}</span>
          </h1>
          <p className="hero-description">{t.description}</p>
          <DownloadButton copy={t} language={language} onClick={handleDownloadClick} />
          <ul className="trust-list" aria-label={t.highlights}>
            {t.trust.map((note) => (
              <li key={note}>
                <Check size={13} aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
          <p className="language-note">{t.languageNote}</p>
        </div>
        <div className="hero-visual" aria-label={t.preview}>
          <div className="phone phone-back phone-left">
            <img
              src={screenshotUrl(language, 'trips')}
              alt={t.tripsAlt}
              width="736"
              height="1600"
            />
          </div>
          <div className="phone phone-front">
            <img
              src={screenshotUrl(language, 'packing')}
              alt={t.packingAlt}
              width="736"
              height="1600"
              fetchPriority="high"
            />
          </div>
          <div className="phone phone-back phone-right">
            <img
              src={screenshotUrl(language, 'items')}
              alt={t.itemsAlt}
              width="736"
              height="1600"
            />
          </div>
          <img
            className="hero-decoration decoration-passport"
            src={assetUrl('assets/items/passport.svg')}
            alt=""
            aria-hidden="true"
          />
          <img
            className="hero-decoration decoration-jacket"
            src={assetUrl('assets/items/jacket.svg')}
            alt=""
            aria-hidden="true"
          />
          <img
            className="hero-decoration decoration-headphones"
            src={assetUrl('assets/items/headphones.svg')}
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>
      <section
        className="steps-section section-shell"
        id="how-it-works"
        aria-label={t.navHow}
      >
        {steps.map(({ Icon, title, description, color }) => (
          <article className="step" key={title}>
            <span className={'step-icon step-icon-' + color}>
              <Icon size={29} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </section>
      <div className="details-grid section-shell">
        <section
          className="photo-feature"
          id="photo-icons"
          aria-labelledby="photo-title"
        >
          <h2 id="photo-title">{t.photoTitle}</h2>
          <p>{t.photoDescription}</p>
          <div className="photo-screen">
            <img
              src={screenshotUrl(language, 'photo-icon')}
              alt={t.photoEditorAlt}
              width="1206"
              height="2622"
              loading="lazy"
            />
          </div>
          <p className="photo-caption">{t.photoCaption}</p>
        </section>
        <section
          className="plans-section"
          id="pro"
          aria-labelledby="plans-title"
        >
          <div className="plans-heading">
            <h2 id="plans-title">{t.plansTitle}</h2>
            <p>{t.plansSubtitle}</p>
          </div>
          <div className="plans-grid">
            <article className="plan-card plan-card-free">
              <h3>{t.freePlanLabel}</h3>
              <ul>
                {t.freePlanFeatures.map((feature) => (
                  <li key={feature}>
                    <Check size={18} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="plan-card plan-card-pro">
              <h3>PackGo Pro</h3>
              <ul>
                {t.proPlanFeatures.map((feature) => (
                  <li key={feature}>
                    <Check size={18} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>
                    {t.proShareFeature}
                  </span>
                </li>
              </ul>
            </article>
          </div>
          <p className="plan-sharing-note">{t.sharingNote}</p>
          <p className="plan-purchase-note">{t.purchaseNote}</p>
        </section>
      </div>
      <div className="download-section section-shell" id="download">
        <DownloadButton copy={t} language={language} onClick={handleDownloadClick} />
      </div>
      <footer className="site-footer section-shell" id="privacy">
        <a className="brand" href="#top" aria-label={t.topLabel}>
          <img
            src={assetUrl('assets/app-icon.png')}
            width="32"
            height="32"
            alt=""
          />
          <span>PackGo</span>
        </a>
        <p className="footer-tagline">{t.footerTagline}</p>
        <div className="footer-links">
          <a href={legalUrl('privacy-policy', language)}>{t.privacy}</a>
          <a href={legalUrl('terms-of-use', language)}>{t.terms}</a>
          <a href={legalUrl('support', language)}>{t.support}</a>
        </div>
        <p className="copyright">{t.copyright}</p>
      </footer>
      <dialog
        ref={downloadDialog}
        className="download-dialog"
        aria-labelledby="download-dialog-title"
        aria-describedby="download-dialog-description"
      >
        <div className="download-dialog-content">
          <form method="dialog">
            <button type="submit" className="download-dialog-close" aria-label={t.closeDownload}>
              <X size={20} aria-hidden="true" />
            </button>
          </form>
          <h2 id="download-dialog-title">{t.downloadTitle}</h2>
          <p id="download-dialog-description">{t.scanToDownload}</p>
          <img
            className="download-qr"
            src={assetUrl('assets/app-store-qr.png')}
            alt={t.downloadQrAlt}
            width="216"
            height="216"
          />
          <p className="download-availability">{t.downloadAvailability}</p>
          <a
            className="store-web-link"
            href={appStoreUrl + '?l=' + appStoreLanguages[language]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.viewInBrowser}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </main>
  );
}
