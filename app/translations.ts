import { baseTranslations } from './base-translations';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import es from './locales/es.json';
import pt_BR from './locales/pt-BR.json';
import fr from './locales/fr.json';
import id from './locales/id.json';
import th from './locales/th.json';
import vi from './locales/vi.json';
import ar from './locales/ar.json';

export const supportedLanguages = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'es', 'pt-BR', 'fr', 'id', 'th', 'vi', 'ar'] as const;
export type Language = (typeof supportedLanguages)[number];
export const languageLabels: Record<Language, string> = {
  en: 'English', 'zh-Hans': '简体中文', 'zh-Hant': '繁體中文',
  ja: '日本語', ko: '한국어', es: 'Español', 'pt-BR': 'Português (Brasil)',
  fr: 'Français', id: 'Bahasa Indonesia', th: 'ไทย', vi: 'Tiếng Việt', ar: 'العربية',
};

function matchLanguage(requested?: string): Language | undefined {
  if (!requested) return undefined;
  const tag = requested.replaceAll('_', '-').toLowerCase();
  if (/^zh-(hant|tw|hk|mo)(-|$)/.test(tag)) return 'zh-Hant';
  if (/^zh(-|$)/.test(tag)) return 'zh-Hans';
  if (/^pt(-|$)/.test(tag)) return 'pt-BR';
  return supportedLanguages.find((language) => language.toLowerCase() === tag || language === tag.split('-')[0]);
}

export function resolveLanguage(requested?: string): Language {
  return matchLanguage(requested) ?? 'en';
}

export function resolvePreferredLanguage(preferences: readonly string[]): Language {
  for (const preference of preferences) {
    const language = matchLanguage(preference);
    if (language) return language;
  }
  return 'en';
}

type EnglishCopy = typeof baseTranslations.en;
export type Translation = {
  [Key in keyof EnglishCopy]: Key extends 'languageNames'
    ? Record<Language, string>
    : EnglishCopy[Key] extends readonly string[] ? readonly string[] : string;
};
const addLanguageNames = (copy: Omit<Translation, 'languageNames'>): Translation => ({
  ...copy, languageNames: languageLabels,
});
export const translations: Record<Language, Translation> = {
  en: { ...baseTranslations.en, languageNames: languageLabels },
  'zh-Hans': { ...baseTranslations['zh-Hans'], languageNames: languageLabels },
  'zh-Hant': { ...baseTranslations['zh-Hant'], languageNames: languageLabels },
  "ja": addLanguageNames(ja),
  "ko": addLanguageNames(ko),
  "es": addLanguageNames(es),
  "pt-BR": addLanguageNames(pt_BR),
  "fr": addLanguageNames(fr),
  "id": addLanguageNames(id),
  "th": addLanguageNames(th),
  "vi": addLanguageNames(vi),
  "ar": addLanguageNames(ar),
};
