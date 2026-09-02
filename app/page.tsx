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

const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || '#download';

const trustNotes = ['Free to download', 'No account', 'No ads'];

function DownloadButton({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`download-button${compact ? ' download-button-compact' : ''}`} href={appStoreUrl}>
      <Smartphone aria-hidden="true" size={compact ? 18 : 22} strokeWidth={2.2} />
      <span>
        <small>Download for</small>
        iPhone
      </span>
      {!compact && <ArrowRight aria-hidden="true" className="download-arrow" size={19} />}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PackCalm home">
          <img src="/assets/app-icon.png" alt="" />
          <span>PackCalm</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#privacy">Privacy</a>
          <DownloadButton compact />
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="travel-atmosphere" aria-hidden="true">
          <div className="travel-route">
            <span>HOME</span>
            <i />
            <PlaneTakeoff size={18} strokeWidth={1.8} />
            <i />
            <span>NEXT TRIP</span>
          </div>
          <div className="departure-stamp">
            <Ticket size={27} strokeWidth={1.6} />
            <span><small>DEPARTURE</small><strong>GATE 12 · 07:45</strong></span>
          </div>
          <div className="travel-tag">
            <Luggage size={32} strokeWidth={1.5} />
            <span><small>PACKED</small><strong>READY TO GO</strong></span>
          </div>
          <MapPin className="travel-pin" size={72} strokeWidth={1.1} />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">A CALMER WAY TO PACK</p>
          <h1>
            <span className="hero-line">Stop remembering.</span>
            <span className="hero-accent">Start packing.</span>
          </h1>
          <p className="hero-description">
            PackCalm turns the things you already bring into reusable lists—so
            every trip starts organized and nothing important gets left behind.
          </p>
          <div className="hero-actions">
            <DownloadButton />
            <a className="text-link" href="#how-it-works">See how it works <span>↓</span></a>
          </div>
          <ul className="trust-list" aria-label="Product highlights">
            {trustNotes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </div>

        <div className="hero-visual" aria-label="PackCalm app preview">
          <div className="color-orb color-orb-blue" />
          <div className="color-orb color-orb-lilac" />
          <div className="phone phone-back phone-left">
            <img src="/assets/latest/trips.webp" alt="Current PackCalm Trips screen" />
          </div>
          <div className="phone phone-front">
            <img src="/assets/latest/packing.webp" alt="Current packing checklist and progress in PackCalm" />
          </div>
          <div className="phone phone-back phone-right">
            <img src="/assets/latest/items.webp" alt="Current personal item library in PackCalm" />
          </div>
          <div className="floating-note note-ready"><strong>9 of 14</strong><span>ready to go</span></div>
          <div className="floating-note note-private"><strong>100% local</strong><span>your lists stay yours</span></div>
        </div>
      </section>

      <section className="steps-section section-shell" id="how-it-works">
        <div className="section-heading steps-title">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>Build once. Pack faster every time.</h2>
        </div>
        <div className="steps-grid">
          <article className="step-card step-card-blue">
            <span className="step-icon"><LibraryBig size={23} /></span>
            <span className="step-number">01</span>
            <h3>Save it once</h3>
            <p>Build a personal catalog of what you actually bring—from your passport to your lucky socks.</p>
            <div className="mini-shelf" aria-hidden="true">
              {['passport', 'phone', 'laptop', 'headphones'].map((item, index) => (
                <span className={`color-${['mint', 'blue', 'lilac', 'ink'][index]}`} key={item}>
                  <img src={`/assets/items/${item}.svg`} alt="" />
                </span>
              ))}
            </div>
          </article>
          <article className="step-card step-card-mint">
            <span className="step-icon"><Repeat2 size={23} /></span>
            <span className="step-number">02</span>
            <h3>Reuse what works</h3>
            <p>Start from My Core List, a ready-made pack, or a past trip. Adjust only what changed.</p>
            <div className="reuse-list" aria-hidden="true">
              <span><Heart size={16} fill="currentColor" /> My Core List <Check size={16} /></span>
              <span><Sparkles size={16} /> Business Trip <Check size={16} /></span>
              <span><PlaneTakeoff size={16} /> Beach Weekend <Check size={16} /></span>
            </div>
          </article>
          <article className="step-card step-card-yellow">
            <span className="step-icon"><CheckCircle2 size={23} /></span>
            <span className="step-number">03</span>
            <h3>Pack with confidence</h3>
            <p>Check things off as they go into your bag and see exactly what is still waiting.</p>
            <div className="progress-card" aria-hidden="true">
              <div><strong>Ready</strong><strong>100%</strong></div>
              <span><i /></span>
              <small>Nothing left to pack</small>
            </div>
          </article>
        </div>
      </section>

      <section className="essentials-section" id="privacy">
        <div className="section-shell essentials-shell">
          <div className="essentials-heading">
            <p className="eyebrow">SIMPLE ON PURPOSE</p>
            <h2>Everything you need.<br />Nothing in the way.</h2>
          </div>
          <div className="essentials-grid">
            <article>
              <span className="essentials-icon essentials-icon-mint"><ShieldCheck size={26} /></span>
              <h3>Private by default</h3>
              <p>Your trips, notes, lists, and custom photo icons stay on your iPhone. No account, ads, or behavioral tracking.</p>
              <span className="essentials-proof"><Check size={16} /> Core packing works offline</span>
            </article>
            <article>
              <span className="essentials-icon essentials-icon-yellow"><Sparkles size={26} /></span>
              <h3>Free for real trips</h3>
              <p>The complete core packing flow is free. PackCalm Pro is an optional one-time unlock, never another subscription.</p>
              <span className="essentials-proof"><Check size={16} /> Unlimited personal items</span>
            </article>
          </div>
        </div>
      </section>

      <section className="download-section" id="download">
        <div className="download-card">
          <div className="download-glow glow-one" />
          <div className="download-glow glow-two" />
          <img className="download-icon" src="/assets/app-icon.png" alt="PackCalm app icon" />
          <p className="eyebrow">YOUR NEXT TRIP STARTS CALMER</p>
          <h2>Pack the bag.<br />Leave the worry.</h2>
          <p>Free to download. No account required.</p>
          <DownloadButton />
          {!process.env.NEXT_PUBLIC_APP_STORE_URL && (
            <small className="launch-note">App Store link will activate at launch.</small>
          )}
        </div>
      </section>

      <footer className="site-footer section-shell">
        <a className="brand" href="#top" aria-label="Back to the top">
          <img src="/assets/app-icon.png" alt="" />
          <span>PackCalm</span>
        </a>
        <p>Remember what to bring, without starting from scratch.</p>
        <div className="footer-links">
          <a href="https://uin3566outlook.github.io/bringcue-legal/privacy-policy.html">Privacy</a>
          <a href="https://uin3566outlook.github.io/bringcue-legal/terms-of-use.html">Terms</a>
          <a href="https://uin3566outlook.github.io/bringcue-legal/support.html">Support</a>
        </div>
        <p className="copyright">© 2026 PackCalm. Apple and iPhone are trademarks of Apple Inc.</p>
      </footer>
    </main>
  );
}
