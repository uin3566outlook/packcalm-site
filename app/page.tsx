/* oxlint-disable next/no-img-element */
import { useEffect } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Heart,
  LibraryBig,
  Luggage,
  MapPin,
  PlaneTakeoff,
  Repeat2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Ticket,
} from 'lucide-react';
import {
  languageLabels,
  resolveLanguage,
  supportedLanguages,
  translations,
  type Language,
} from './translations';

const baseUrl = import.meta.env.BASE_URL;
const appStoreUrl = import.meta.env.VITE_APP_STORE_URL || '#download';
const assetUrl = (path: string) => `${baseUrl}${path.replace(/^\/+/, '')}`;

function legalUrl(
  document: 'privacy-policy' | 'terms-of-use' | 'support',
  language: Language,
) {
  return `${baseUrl}legal/${document}.html?lang=${encodeURIComponent(language)}&locked=1#${encodeURIComponent(language)}`;
}

function DownloadButton({
  copy,
  compact = false,
}: {
  copy: (typeof translations)[Language];
  compact?: boolean;
}) {
  return (
    <a
      className={`download-button${compact ? ' download-button-compact' : ''}`}
      href={appStoreUrl}
    >
      <Smartphone
        aria-hidden="true"
        size={compact ? 18 : 22}
        strokeWidth={2.2}
      />
      <span>
        <small>{copy.downloadFor}</small>
        {copy.device}
      </span>
      {!compact && (
        <ArrowRight aria-hidden="true" className="download-arrow" size={19} />
      )}
    </a>
  );
}

export default function Home() {
  const requestedLanguage =
    new URLSearchParams(window.location.search).get('lang') || undefined;
  const language = resolveLanguage(requestedLanguage, navigator.language);
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `PackCalm — ${t.heroLine} ${t.heroAccent}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.description);
  }, [language, t]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t.homeLabel}>
          <img src={assetUrl('assets/app-icon.png')} alt="" />
          <span>PackCalm</span>
        </a>
        <nav aria-label={t.navigation}>
          <a href="#how-it-works">{t.navHow}</a>
          <a href="#privacy">{t.navPrivacy}</a>
          <div className="language-switcher" aria-label={t.language}>
            {supportedLanguages.map((option) => (
              <a
                href={`${baseUrl}?lang=${option}`}
                hrefLang={option}
                aria-current={option === language ? 'page' : undefined}
                key={option}
              >
                {languageLabels[option]}
              </a>
            ))}
          </div>
          <DownloadButton copy={t} compact />
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="travel-atmosphere" aria-hidden="true">
          <div className="travel-route">
            <span>{t.home}</span>
            <i />
            <PlaneTakeoff size={18} strokeWidth={1.8} />
            <i />
            <span>{t.nextTrip}</span>
          </div>
          <div className="departure-stamp">
            <Ticket size={27} strokeWidth={1.6} />
            <span>
              <small>{t.departure}</small>
              <strong>{t.gate}</strong>
            </span>
          </div>
          <div className="travel-tag">
            <Luggage size={32} strokeWidth={1.5} />
            <span>
              <small>{t.packed}</small>
              <strong>{t.readyToGo}</strong>
            </span>
          </div>
          <MapPin className="travel-pin" size={72} strokeWidth={1.1} />
          <div className="packing-checklist">
            <small>{t.packingList}</small>
            <span>
              <Check size={12} /> {t.passport}
            </span>
            <span>
              <Check size={12} /> {t.charger}
            </span>
            <span>
              <Check size={12} /> {t.headphones}
            </span>
          </div>
          <div className="packing-items">
            {['passport', 'laptop', 'headphones', 'toothbrush', 'jacket'].map(
              (item) => (
                <span className={`packing-item packing-${item}`} key={item}>
                  <img src={assetUrl(`assets/items/${item}.svg`)} alt="" />
                </span>
              ),
            )}
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>
            <span className="hero-line">{t.heroLine}</span>
            <span className="hero-accent">{t.heroAccent}</span>
          </h1>
          <p className="hero-description">{t.description}</p>
          <div className="hero-actions">
            <DownloadButton copy={t} />
            <a className="text-link" href="#how-it-works">
              {t.seeHow} <span>↓</span>
            </a>
          </div>
          <ul className="trust-list" aria-label={t.highlights}>
            {t.trust.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual" aria-label={t.preview}>
          <div className="color-orb color-orb-blue" />
          <div className="color-orb color-orb-lilac" />
          <div className="phone phone-back phone-left">
            <img
              src={assetUrl(`assets/latest/${language}/trips.webp`)}
              alt={t.tripsAlt}
              loading="eager"
              decoding="sync"
            />
          </div>
          <div className="phone phone-front">
            <img
              src={assetUrl(`assets/latest/${language}/packing.webp`)}
              alt={t.packingAlt}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </div>
          <div className="phone phone-back phone-right">
            <img
              src={assetUrl(`assets/latest/${language}/items.webp`)}
              alt={t.itemsAlt}
              loading="eager"
              decoding="sync"
            />
          </div>
          <div className="floating-note note-ready">
            <strong>{t.readyCount}</strong>
            <span>{t.readyCaption}</span>
          </div>
          <div className="floating-note note-private">
            <strong>{t.localTitle}</strong>
            <span>{t.localCaption}</span>
          </div>
        </div>
      </section>

      <section className="steps-section section-shell" id="how-it-works">
        <div className="section-heading steps-title">
          <p className="eyebrow">{t.howEyebrow}</p>
          <h2>{t.howTitle}</h2>
        </div>
        <div className="steps-grid">
          <article className="step-card step-card-blue">
            <span className="step-icon">
              <LibraryBig size={23} />
            </span>
            <span className="step-number">01</span>
            <h3>{t.saveTitle}</h3>
            <p>{t.saveDescription}</p>
            <div className="mini-shelf" aria-hidden="true">
              {['passport', 'phone', 'laptop', 'headphones'].map(
                (item, index) => (
                  <span
                    className={`color-${['mint', 'blue', 'lilac', 'ink'][index]}`}
                    key={item}
                  >
                    <img src={assetUrl(`assets/items/${item}.svg`)} alt="" />
                  </span>
                ),
              )}
            </div>
          </article>
          <article className="step-card step-card-mint">
            <span className="step-icon">
              <Repeat2 size={23} />
            </span>
            <span className="step-number">02</span>
            <h3>{t.reuseTitle}</h3>
            <p>{t.reuseDescription}</p>
            <div className="reuse-list" aria-hidden="true">
              <span>
                <Heart size={16} fill="currentColor" /> {t.coreList}{' '}
                <Check size={16} />
              </span>
              <span>
                <Sparkles size={16} /> {t.businessTrip} <Check size={16} />
              </span>
              <span>
                <PlaneTakeoff size={16} /> {t.beachWeekend} <Check size={16} />
              </span>
            </div>
          </article>
          <article className="step-card step-card-yellow">
            <span className="step-icon">
              <CheckCircle2 size={23} />
            </span>
            <span className="step-number">03</span>
            <h3>{t.confidenceTitle}</h3>
            <p>{t.confidenceDescription}</p>
            <div className="progress-card" aria-hidden="true">
              <div>
                <strong>{t.ready}</strong>
                <strong>100%</strong>
              </div>
              <span>
                <i />
              </span>
              <small>{t.nothingLeft}</small>
            </div>
          </article>
        </div>
      </section>

      <section className="essentials-section" id="privacy">
        <div className="section-shell essentials-shell">
          <div className="essentials-heading">
            <p className="eyebrow">{t.simpleEyebrow}</p>
            <h2>
              {t.essentialsTitle[0]}
              <br />
              {t.essentialsTitle[1]}
            </h2>
          </div>
          <div className="essentials-grid">
            <article>
              <span className="essentials-icon essentials-icon-mint">
                <ShieldCheck size={26} />
              </span>
              <h3>{t.privateTitle}</h3>
              <p>{t.privateDescription}</p>
              <span className="essentials-proof">
                <Check size={16} /> {t.privateProof}
              </span>
            </article>
            <article>
              <span className="essentials-icon essentials-icon-yellow">
                <Sparkles size={26} />
              </span>
              <h3>{t.freeTitle}</h3>
              <p>{t.freeDescription}</p>
              <span className="essentials-proof">
                <Check size={16} /> {t.freeProof}
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="download-section" id="download">
        <div className="download-card">
          <div className="download-glow glow-one" />
          <div className="download-glow glow-two" />
          <img
            className="download-icon"
            src={assetUrl('assets/app-icon.png')}
            alt="PackCalm app icon"
          />
          <p className="eyebrow">{t.downloadEyebrow}</p>
          <h2>
            {t.downloadTitle[0]}
            <br />
            {t.downloadTitle[1]}
          </h2>
          <p>{t.downloadDescription}</p>
          <DownloadButton copy={t} />
          {!import.meta.env.VITE_APP_STORE_URL && (
            <small className="launch-note">{t.launchNote}</small>
          )}
        </div>
      </section>

      <footer className="site-footer section-shell">
        <a className="brand" href="#top" aria-label={t.topLabel}>
          <img src={assetUrl('assets/app-icon.png')} alt="" />
          <span>PackCalm</span>
        </a>
        <p>{t.footerTagline}</p>
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
