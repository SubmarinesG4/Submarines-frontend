interface TranslationSend {
  defaultTranslationLanguage: string;
  defaultTranslationinLanguage: string;
  translations: { language: string; content: string }[];
  modifiedbyUser: string;
  published: boolean;
}

export type { TranslationSend };
