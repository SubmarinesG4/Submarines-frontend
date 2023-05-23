interface Translation {
  translationKey: string;
  defaultTranslationLanguage: string;
  defaultTranslationinLanguage: string;
  translations: { language: string; content: string }[];
  modifiedbyUser: string;
  modificationDate: Date;
  creationDate: Date;
  published: boolean;
  versionedTranslations: {
    modifiedbyUser: string;
    modificationDate: Date;
    translations: { language: string; content: string }[];
  }[];
}

export type { Translation };
