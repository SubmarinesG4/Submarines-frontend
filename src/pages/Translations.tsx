import { useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import TranslationDrawer from "@/components/TranslationDrawer";
import TranslationTable from "@/components/TranslationTable";
import { Button } from "@mui/material";
import { Translation } from "@/types/Translation";

export default function Translations() {
    const [drawerOpenState, setDrawerOpenState] = useState(false);
    const [translationKey, setTranslationKey] = useState<string>("");

    const toggleDrawer =
    (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event.type === 'keydown') {
                return;
            }
            setDrawerOpenState(open);
        };

    const changeTranslationKey = 
    (translationKey: string) => 
    (event: any) => {
        setTranslationKey(translationKey);
        console.log(translationKey);
        setDrawerOpenState(true);
    }

    function createData(
        translationKey: string,
        defaultLanguage: string,
        defaultLanguageContent: string,
        languages: { language: string, content: string }[],
        modifiedBy: string,
        modifiedAt: Date,
        createdAt: Date,
        published: boolean
    ): Translation {
        return { translationKey, defaultLanguage, defaultLanguageContent, languages, modifiedBy, modifiedAt, createdAt, published };
    }

    function getTranslations(translationKey: string): Translation[] {
        return [
            createData('fj489hg934', 'it', 'Ciao', [{ language: 'en', content: 'Hello' }], 'admin', new Date(), new Date(), true),
            createData('g4803hg04', 'it', 'Mondo', [{ language: 'en', content: 'World' }], 'admin', new Date(), new Date(), true),
            createData('gf3049jg0394', 'it', 'Ciao Mondo', [{ language: 'en', content: 'Hello World' }], 'admin', new Date(), new Date(), true),
            createData('gfh3498hg0', 'it', 'Ciao Mondo!', [{ language: 'en', content: 'Hello World!' }], 'admin', new Date(), new Date(), true),
            createData('fj304jg03', 'it', 'Ciao Mondo!!', [{ language: 'en', content: 'Hello World!!' }], 'admin', new Date(), new Date(), true),
            createData('gj3094jg3', 'it', 'Ciao', [{ language: 'en', content: 'Hello' }], 'admin', new Date(), new Date(), true),
            createData('gj0394j3g', 'it', 'Mondo', [{ language: 'en', content: 'World' }], 'admin', new Date(), new Date(), true),
            createData('fk30o4kf3o', 'it', 'Ciao', [{ language: 'en', content: 'Hello' }], 'admin', new Date(), new Date(), true),
            createData('koiwj4ow', 'it', 'Mondo', [{ language: 'en', content: 'World' }], 'admin', new Date(), new Date(), true),
            createData('oihvwei', 'it', 'Ciao', [{ language: 'en', content: 'Hello' }], 'admin', new Date(), new Date(), true),
            createData('fj03ij53', 'it', 'Mondo', [{ language: 'en', content: 'World' }], 'admin', new Date(), new Date(), true),
            createData('34094ut03', 'it', 'Ciao', [{ language: 'en', content: 'Hello' }], 'admin', new Date(), new Date(), true),
            createData('c3po4ik3m04', 'it', 'Mondo', [{ language: 'en', content: 'World' }], 'admin', new Date(), new Date(), true),
            createData('3904i0c34', 'it', 'Ciao', [{ language: 'en', content: 'Hello' }], 'admin', new Date(), new Date(), true),
            createData('09fk340mf', 'it', 'Mondo', [{ language: 'en', content: 'World' }], 'admin', new Date(), new Date(), true),
        ];
    }

    return (
        <div>
            <NavBar />
            <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
            <TranslationTable 
                toggleDrawer={toggleDrawer} 
                items={getTranslations(translationKey)} 
                changeTranslationKey={changeTranslationKey} 
            />
            <TranslationDrawer 
                open={drawerOpenState} 
                toggleDrawer={toggleDrawer} 
                items={getTranslations(translationKey)} 
                translationKey={translationKey}
            />
        </div>
    );
}