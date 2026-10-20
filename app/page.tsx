'use client';

/* oxlint-disable next/no-img-element */
import { useEffect, useSyncExternalStore } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Repeat2,
  Smartphone,
} from 'lucide-react';
import {
  languageLabels,
  resolveLanguage,
  supportedLanguages,
  translations,
  type Language,
} from './translations';

const baseUrl = import.meta.env.BASE_URL;
const appStoreLanguages: Record<Language, string> = {
  en: 'en-US',
  'zh-Hans': 'zh-Hans-CN',
  'zh-Hant': 'zh-Hant-TW',
};
const assetUrl = (path: string) => baseUrl + path.replace(/^\/+/, '');
const subscribeLanguage = () => () => {};
const getBrowserLanguage = (): Language =>
  resolveLanguage(
    new URLSearchParams(window.location.search).get('lang') || undefined,
  );
const getServerLanguage = (): Language => 'en';

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
}: {
  copy: (typeof translations)[Language];
  language: Language;
  compact?: boolean;
}) {
  return (
    <a
      className={
        'download-button' + (compact ? ' download-button-compact' : '')
      }
      href={
        'https://apps.apple.com/app/id6809829261?l=' +
        appStoreLanguages[language]
      }
      aria-label={copy.appStoreLabel}
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
  const language = useSyncExternalStore(
    subscribeLanguage,
    getBrowserLanguage,
    getServerLanguage,
  );
  const t = translations[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = 'PackGo — ' + t.heroLine + ' ' + t.heroAccent;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.description);
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
          <div
            className="language-switcher"
            role="group"
            aria-label={t.language}
          >
            {supportedLanguages.map((option) => (
              <a
                href={baseUrl + '?lang=' + option}
                hrefLang={option}
                aria-label={t.languageNames[option]}
                aria-current={option === language ? 'page' : undefined}
                key={option}
              >
                {languageLabels[option]}
              </a>
            ))}
          </div>
          <DownloadButton copy={t} language={language} compact />
        </nav>
      </header>
      <section
        className="hero section-shell"
        id="top"
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>{t.heroLine}</span>
            <span className="hero-accent">{t.heroAccent}</span>
          </h1>
          <p className="hero-description">{t.description}</p>
          <DownloadButton copy={t} language={language} />
          <ul className="trust-list" aria-label={t.highlights}>
            {t.trust.map((note) => (
              <li key={note}>
                <Check size={13} aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-visual" aria-label={t.preview}>
          <div className="phone phone-back phone-left">
            <img
              src={assetUrl('assets/latest/' + language + '/trips.webp')}
              alt={t.tripsAlt}
              width="736"
              height="1600"
            />
          </div>
          <div className="phone phone-front">
            <img
              src={assetUrl('assets/latest/' + language + '/packing.webp')}
              alt={t.packingAlt}
              width="736"
              height="1600"
              fetchPriority="high"
            />
          </div>
          <div className="phone phone-back phone-right">
            <img
              src={assetUrl('assets/latest/' + language + '/items.webp')}
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
              src={assetUrl('assets/photo-icon/editor-en.png')}
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
                    <small className="plan-coming-soon">
                      {t.shareComingSoon}
                    </small>
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
        <DownloadButton copy={t} language={language} />
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
    </main>
  );
}
