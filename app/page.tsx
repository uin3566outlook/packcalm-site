import {
  ArrowRight,
  Check,
  CheckCircle2,
  Heart,
  LibraryBig,
  PlaneTakeoff,
  Repeat2,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { PackingDemo } from './packing-demo';

const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || '#download';

const trustNotes = ['Free to download', 'No account', 'No ads'];

const useCases = [
  'Business trips',
  'Weekend escapes',
  'Family holidays',
  'Beach days',
  'Cold-weather travel',
];

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
        <div className="hero-copy">
          <p className="eyebrow">A CALMER WAY TO PACK</p>
          <h1>
            Stop remembering.
            <br />
            <span>Start packing.</span>
          </h1>
          <p className="hero-description">
            PackCalm turns the things you already bring into reusable lists—then
            lets you check or drag every item straight into your suitcase.
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
            <img src="/assets/trips-home.png" alt="PackCalm Trips screen" />
          </div>
          <div className="phone phone-front">
            <img src="/assets/packing.png" alt="Packing progress and interactive suitcase in PackCalm" />
          </div>
          <div className="phone phone-back phone-right">
            <img src="/assets/items-library.png" alt="Personal item library in PackCalm" />
          </div>
          <div className="floating-note note-ready"><strong>9 of 14</strong><span>ready to go</span></div>
          <div className="floating-note note-private"><strong>100% local</strong><span>your lists stay yours</span></div>
        </div>
      </section>

      <div className="use-case-strip" aria-label="Great for every kind of trip">
        <div className="use-case-track">
          {[...useCases, ...useCases].map((item, index) => (
            <span key={`${item}-${index}`}><PlaneTakeoff size={17} /> {item}</span>
          ))}
        </div>
      </div>

      <section className="problem-section section-shell">
        <div className="section-heading split-heading">
          <p className="eyebrow">THE TRIP IS THE FUN PART</p>
          <h2>Packing shouldn&apos;t take up this much space in your head.</h2>
        </div>
        <div className="problem-grid">
          <article>
            <span className="problem-number">01</span>
            <p>You rebuild the same list every time.</p>
          </article>
          <article>
            <span className="problem-number">02</span>
            <p>You still wonder what you forgot.</p>
          </article>
          <article className="problem-answer">
            <CheckCircle2 size={28} />
            <p>PackCalm remembers your system, so you can leave with a clear head.</p>
          </article>
        </div>
      </section>

      <section className="demo-section" id="how-it-works">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">TRY THE FEELING</p>
            <h2>Packing should feel this satisfying.</h2>
            <p>Tap the items below. Your checklist and suitcase always stay in sync.</p>
          </div>
          <PackingDemo />
        </div>
      </section>

      <section className="steps-section section-shell">
        <div className="section-heading steps-title">
          <p className="eyebrow">YOUR SYSTEM, READY TO REUSE</p>
          <h2>Less setup with every trip.</h2>
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
            <p>Check an item or drag it into the suitcase. Watch the unfinished list disappear.</p>
            <div className="progress-card" aria-hidden="true">
              <div><strong>Ready</strong><strong>100%</strong></div>
              <span><i /></span>
              <small>Nothing left to pack</small>
            </div>
          </article>
        </div>
      </section>

      <section className="feature-story section-shell">
        <div className="story-copy">
          <p className="eyebrow">NOT A GENERIC CHECKLIST</p>
          <h2>It looks like your life, not someone else&apos;s packing advice.</h2>
          <p className="story-lede">Add the things you own, organize them your way, and even turn a photo into a private on-device icon.</p>
          <ul className="check-list">
            <li><Check size={17} /> Searchable personal item library</li>
            <li><Check size={17} /> Built-in icons for everyday essentials</li>
            <li><Check size={17} /> Your own names, quantities, and notes</li>
          </ul>
        </div>
        <div className="story-visual story-visual-items">
          <div className="story-phone">
            <img src="/assets/items-library.png" alt="PackCalm personal item library" />
          </div>
          <div className="story-callout callout-search"><span>120+</span> useful item icons</div>
          <div className="story-callout callout-photo"><span>Yours</span> photo icons stay local</div>
        </div>
      </section>

      <section className="feature-story feature-story-reverse section-shell">
        <div className="story-copy">
          <p className="eyebrow">START AHEAD</p>
          <h2>Your essentials are already waiting for you.</h2>
          <p className="story-lede">Mix your core items with reusable lists for work, weather, swimming, or whatever your next trip needs.</p>
          <ul className="check-list">
            <li><Check size={17} /> Smart duplicate merging</li>
            <li><Check size={17} /> Reuse trips without changing the original</li>
            <li><Check size={17} /> Edit every item before you pack</li>
          </ul>
        </div>
        <div className="story-visual story-visual-templates">
          <div className="story-phone">
            <img src="/assets/templates.png" alt="Reusable lists in PackCalm" />
          </div>
          <div className="template-stack" aria-hidden="true">
            <span><i className="dot dot-blue" /> Business essentials</span>
            <span><i className="dot dot-mint" /> Swimming</span>
            <span><i className="dot dot-lilac" /> Cold weather</span>
          </div>
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div className="section-shell privacy-shell">
          <div className="privacy-icon"><ShieldCheck size={42} /></div>
          <div className="privacy-copy">
            <p className="eyebrow">PRIVATE BY DEFAULT</p>
            <h2>Your trip is your business.</h2>
            <p>PackCalm works offline and keeps your trips, notes, lists, and custom photo icons on your iPhone. No account. No ads. No behavioral analytics.</p>
          </div>
          <div className="privacy-facts">
            <span><strong>0</strong>accounts required</span>
            <span><strong>0</strong>ads or tracking</span>
            <span><strong>100%</strong>core packing offline</span>
          </div>
        </div>
      </section>

      <section className="value-section section-shell">
        <div className="value-badge"><Sparkles size={18} /> Simple on purpose</div>
        <h2>Free for real trips.<br /><span>Pro once, not forever.</span></h2>
        <p>The complete core packing flow is free. If you want more active trips, unlimited custom lists, and advanced organization, PackCalm Pro is a one-time unlock—not another subscription.</p>
        <div className="value-points">
          <span><Check size={17} /> Pack full trips for free</span>
          <span><Check size={17} /> Unlimited personal items</span>
          <span><Check size={17} /> Optional one-time Pro</span>
        </div>
      </section>

      <section className="download-section" id="download">
        <div className="download-card">
          <div className="download-glow glow-one" />
          <div className="download-glow glow-two" />
          <img className="download-icon" src="/assets/app-icon.png" alt="PackCalm app icon" />
          <p className="eyebrow">YOUR NEXT TRIP STARTS CALMER</p>
          <h2>Pack the bag.<br />Leave the worry.</h2>
          <p>Free to download for iPhone. Your first trip takes minutes.</p>
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
