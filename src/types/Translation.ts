interface Translation {
  translationKey: string;
  defaultTranslationLanguage: string;
  defaultTranslationinLanguage: string;
  languages: { language: string; content: string }[];
  modifiedByUser: string;
  modificationDate: Date;
  creationDate: Date;
  published: boolean;
  versionedTranslations: {
    modifiedByUser: string;
    modificationDate: Date;
    translations: { language: string; content: string }[];
  }[];
}

export type { Translation };
