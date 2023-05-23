interface TranslationSend {
  translationKey: string;
  defaultTranslationLanguage: string;
  defaultTranslationinLanguage: string;
  languages: { language: string; content: string }[];
  modifiedByUser: string;
  published: boolean;
}

export type { TranslationSend };
