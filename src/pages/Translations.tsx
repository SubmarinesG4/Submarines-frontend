import { useState } from "react";
import NavBar from "@/components/NavBar";
import TranslationDrawer from "@/components/TranslationDrawer";
import TranslationTable from "@/components/TranslationTable";
import { Button } from "@mui/material";
import { Translation } from "@/types/Translation";
import { TranslationFromList } from "@/types/TranslationFromList";
import { api } from "@/app/services/api";

export default function Translations() {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  const [translationKey, setTranslationKey] = useState<string>("");
  const [translation, setTranslation] = useState<Translation>({
    translationKey: "",
    defaultTranslationLanguage: "",
    defaultTranslationinLanguage: "",
    languages: [],
    modifiedByUser: "",
    modificationDate: new Date(),
    creationDate: new Date(),
    published: false,
    versionedTranslations: [],
  });
  const [drawerView, setDrawerView] = useState<1 | 2 | 3>(1); // 1 = DrawerList, 2 = HistoryList, 3 = NewTranslationList

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === "keydown") {
        return;
      }
      setDrawerOpenState(open);
    };

  const changeTranslationKey = (translationKey: string) => (event: any) => {
    setTranslationKey(translationKey);
    setDrawerOpenState(true);
    const items = getTranslations();
    const translation = items.filter(
      (item) => item.translationKey === translationKey
    )[0];
    setTranslation(translation);
  };

  const showEdit = (translationKey: string) => (event: any) => {
    setDrawerView(1);
    changeTranslationKey(translationKey)(event);
  };

  const showHistory = (translationKey: string) => (event: any) => {
    setDrawerView(2);
    changeTranslationKey(translationKey)(event);
  };

  const showNew = () => (event: any) => {
    setDrawerView(3);
    setDrawerOpenState(true);
  };

  function createData(
    translationKey: string,
    defaultTranslationLanguage: string,
    defaultTranslationinLanguage: string,
    languages: { language: string; content: string }[],
    modifiedByUser: string,
    modificationDate: Date,
    creationDate: Date,
    published: boolean,
    versionedTranslations: {
      modifiedByUser: string;
      modificationDate: Date;
      translations: { language: string; content: string }[];
    }[]
  ): Translation {
    return {
      translationKey,
      defaultTranslationLanguage,
      defaultTranslationinLanguage,
      languages,
      modifiedByUser,
      modificationDate,
      creationDate,
      published,
      versionedTranslations,
    };
  }

  function getTranslations(): Translation[] {
    return [
      createData(
        "fj489hg934",
        "it",
        "Ciao",
        [
          { language: "it", content: "Ciao" },
          { language: "en", content: "Hello" },
        ],
        "admin",
        new Date(),
        new Date(),
        false,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao hist" },
              { language: "en", content: "Hello hist" },
            ],
          },
          {
            modifiedByUser: "user",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Buondi hist" },
              { language: "en", content: "Goodday hist" },
            ],
          },
        ]
      ),
      createData(
        "g4803hg04",
        "it",
        "Mondo",
        [
          { language: "it", content: "Mondo" },
          { language: "en", content: "World" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Mondo hist" },
              { language: "en", content: "World hist" },
            ],
          },
        ]
      ),
      createData(
        "gf3049jg0394",
        "it",
        "Ciao Mondo",
        [
          { language: "it", content: "Ciao Mondo" },
          { language: "en", content: "Hello World" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao Mondo hist" },
              { language: "en", content: "Hello World hist" },
            ],
          },
        ]
      ),
      createData(
        "gfh3498hg0",
        "it",
        "Ciao Mondo!",
        [
          { language: "it", content: "Ciao Mondo!" },
          { language: "en", content: "Hello World!" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao Mondo! hist" },
              { language: "en", content: "Hello World! hist" },
            ],
          },
        ]
      ),
      createData(
        "fj304jg03",
        "it",
        "Ciao Mondo!!",
        [
          { language: "it", content: "Ciao Mondo!!" },
          { language: "en", content: "Hello World!!" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao Mondo!! hist" },
              { language: "en", content: "Hello World!! hist" },
            ],
          },
        ]
      ),
      createData(
        "gj3094jg3",
        "it",
        "Ciao",
        [
          { language: "it", content: "Ciao" },
          { language: "en", content: "Hello" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao hist" },
              { language: "en", content: "Hello hist" },
            ],
          },
        ]
      ),
      createData(
        "gj0394j3g",
        "it",
        "Mondo",
        [
          { language: "it", content: "Mondo" },
          { language: "en", content: "World" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Mondo hist" },
              { language: "en", content: "World hist" },
            ],
          },
        ]
      ),
      createData(
        "fk30o4kf3o",
        "it",
        "Ciao",
        [
          { language: "it", content: "Ciao" },
          { language: "en", content: "Hello" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao hist" },
              { language: "en", content: "Hello hist" },
            ],
          },
        ]
      ),
      createData(
        "koiwj4ow",
        "it",
        "Mondo",
        [
          { language: "it", content: "Mondo" },
          { language: "en", content: "World" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Mondo hist" },
              { language: "en", content: "Hello hist" },
            ],
          },
        ]
      ),
      createData(
        "oihvwei",
        "it",
        "Ciao",
        [
          { language: "it", content: "Ciao" },
          { language: "en", content: "Hello" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao hist" },
              { language: "en", content: "Hello hist" },
            ],
          },
        ]
      ),
      createData(
        "fj03ij53",
        "it",
        "Mondo",
        [
          { language: "it", content: "Mondo" },
          { language: "en", content: "World" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Mondo hist" },
              { language: "en", content: "World hist" },
            ],
          },
        ]
      ),
      createData(
        "34094ut03",
        "it",
        "Ciao",
        [
          { language: "it", content: "Ciao" },
          { language: "en", content: "Hello" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao hist" },
              { language: "en", content: "Hello hist" },
            ],
          },
        ]
      ),
      createData(
        "c3po4ik3m04",
        "it",
        "Mondo",
        [
          { language: "it", content: "Mondo" },
          { language: "en", content: "World" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Mondo hist" },
              { language: "en", content: "World hist" },
            ],
          },
        ]
      ),
      createData(
        "3904i0c34",
        "it",
        "Ciao",
        [
          { language: "it", content: "Ciao" },
          { language: "en", content: "Hello" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Ciao hist" },
              { language: "en", content: "Hello hist" },
            ],
          },
        ]
      ),
      createData(
        "09fk340mf",
        "it",
        "Mondo",
        [
          { language: "it", content: "Mondo" },
          { language: "en", content: "World" },
        ],
        "admin",
        new Date(),
        new Date(),
        true,
        [
          {
            modifiedByUser: "admin",
            modificationDate: new Date(),
            translations: [
              { language: "it", content: "Mondo hist" },
              { language: "en", content: "World hist" },
            ],
          },
        ]
      ),
    ];
  }

  return (
    <div>
      <NavBar />
      <TranslationTable
        toggleDrawer={toggleDrawer}
        items={getTranslations()}
        showEdit={showEdit}
        showHistory={showHistory}
        showNew={showNew}
      />
      <TranslationDrawer
        open={drawerOpenState}
        toggleDrawer={toggleDrawer}
        translation={translation}
        translationKey={translationKey}
        view={drawerView}
      />
    </div>
  );
}
