import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const htmlPath = path.join(scriptDir, 'og-card.html');
const outputPath = path.join(projectDir, 'public', 'og.jpg');

const assets = {
  icon: pathToFileURL(path.join(projectDir, 'public', 'assets', 'app-icon.png')).href,
  screenshot: pathToFileURL(path.join(projectDir, 'public', 'assets', 'latest', 'en', 'packing.webp')).href,
};

const browser = await chromium.launch({
  headless: true,
  args: ['--allow-file-access-from-files', '--disable-dev-shm-usage'],
});

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await page.evaluate(async (assetUrls) => {
    window.setAssets(assetUrls);
    await Promise.all([...document.images].map((image) => image.decode()));
    await document.fonts.ready;
  }, assets);
  await page.screenshot({ path: outputPath, type: 'jpeg', quality: 94 });
} finally {
  await browser.close();
}

process.stdout.write(`${outputPath}\n`);
