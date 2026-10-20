# PackGo landing page — selected direction 3

Source: `/Users/xufang/vibecoding/ios/bringcue/artifacts/landing-page/2026-10-20-simplify/display-3.png` (941 × 1672).

Implementation: `http://127.0.0.1:5184/?lang=zh-Hans`, CSS viewport 941 × 900, browser DPR 0.75. The in-app browser full-page capture includes surplus canvas at this zoom. Normalize by cropping the measured 941 × 1788 CSS content rectangle, without stretching or scaling the page. Raw evidence: `implementation-pass-1-matched.png`; combined evidence: `comparison-pass-1.jpg`, both in the source artifact directory.

## Findings — pass 1

- [P2] The headline and feature icons are smaller than the selected design. Increase the Chinese headline scale and retain the 68px feature icon containers at the comparison width.
- [P2] Photo and plan panels are too tall. The full real photo editor screenshot creates a taller panel than the generated mock; the plan cards then stretch with excessive empty space. Reduce the screenshot's displayed width while preserving its true aspect ratio, tighten the bottom download spacing, and check legibility of plan rows again.

The original, supplied app screenshots and logo are used. The mock's reconstructed photo editor is intentionally replaced by the genuine source screenshot; no generated app UI is presented as a real screenshot. The established Smartphone download icon is retained instead of the generated Apple silhouette. Future QR sharing remains explicitly marked for 1.0.1.

## Comparison history — pass 2

Both P2 findings were fixed: the Chinese headline uses the selected larger scale, feature icons retain 68px containers, the real photo screenshot is smaller without distortion, and the lower download spacing is shorter. The matched implementation is now 941 × 1690, compared with the selected 941 × 1672 design. Raw capture: `implementation-pass-2-raw.png` (1255 × 2253); the surplus blank canvas is cropped to the measured CSS content bounds in `implementation-desktop.png`. No page content is stretched.

Full-view evidence: `comparison-pass-2.jpg`. Focused evidence: `comparison-hero.jpg` and `comparison-plans.jpg`, each containing source and implementation together. These comparisons were opened and inspected. There are no remaining actionable P0/P1/P2 findings.

## Required fidelity surfaces

- Fonts and typography: existing system sans-serif, black/blue two-line heading, consistent weights and readable 14–15px body copy. English has a separate display scale. All three languages remain legible without truncation. Small CJK weight differences from the generated mock are P3.
- Spacing and layout: hero, feature row, side-by-side photo and pricing panels, quiet download row, and footer follow the selected order. At the original 1280px width the page is 1947px high, versus 5332px before. Equal-width comparison evidence is `implementation-desktop-1280.png` and the original `current-full.jpg`.
- Colors and tokens: warm ivory, near-black, blue headline, mint photo surface, and butter pricing surface follow the existing palette. Focus rings, download buttons, captions, and checkmarks remain distinct.
- Image quality and assets: original logo and real, language-specific app screenshots are retained at their true aspect ratios. The photo editor example is explicitly identified as an actual English app screen. Existing library icons are used; no new synthetic app screenshots or rasterized page UI were introduced.
- Copy and content: repetitive privacy/free/download sections are consolidated. One active trip and two custom reusable lists remain explicit. All four Pro benefits, the upcoming 1.0.1 label, original-account restoration, and in-app localized pricing remain explicit. Shared-image behavior is described as upcoming rather than already released.

## Functional and responsive verification

- Browser-rendered phone checks: 391px, English/Simplified Chinese/Traditional Chinese; 360px, English. Every page has three free bullets, four Pro bullets, no horizontal overflow, and no broken images. Evidence: `mobile-*-normalized.png`, `small-phone-en-normalized.png`, and `qa-mobile-heroes.jpg`.
- Tablet: 768px Traditional Chinese; desktop: 941px Chinese and English, plus 1280px Chinese. Photo and pricing panels adapt to stacked layouts without losing their content. Evidence: `tablet-zh-Hant-normalized.png`, `desktop-en-normalized.png`.
- Tested language links and selected-language state, Pro anchor navigation, footer Support navigation and its rendered Chinese content, back navigation, keyboard Tab focus, and visible focus outline. The existing localized App Store destinations and Apple product ID are preserved.
- Apple public lookup confirms product 6809829261, version 1.0, in the US storefront. The desktop Chinese storefront redirected to Today; no product availability claim is made for that storefront. This is an external-storefront verification limit, not a changed website destination.
- Browser console errors: none in the final preview. Local build, GitHub Pages base-path build, TypeScript, and whitespace checks passed. Reduced-motion styles and semantic links, headings, groups, and image descriptions are present.

## Follow-up polish

P3 only: generated typography and phone geometry are not reproduced by distorting genuine screenshots; narrow plan labels may wrap naturally. No blocking visual or interaction issues remain.

## Implementation checklist

- [x] Resolve the selected visual target and preserve real assets.
- [x] Fix both initial P2 findings and compare revised full/focused captures.
- [x] Verify three languages, phone/tablet/desktop layouts, links, keyboard focus, and console.
- [x] Pass local and GitHub Pages builds, TypeScript, and whitespace checks.

final result: passed
