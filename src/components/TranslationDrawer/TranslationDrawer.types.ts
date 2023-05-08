import { Translation } from "@/types/Translation"
import React from "react"

export type UseTranslationDrawerOptions = {
    translationKey: string
    items: Translation[]
}

export type UseTranslationDrawerReturn = {
    handleSave: () => void
    translation: Translation
}

export type UseTranslationDrawer = (options: UseTranslationDrawerOptions) => UseTranslationDrawerReturn

export type TranslationDrawerProps = { 
    open: boolean
    toggleDrawer: (open: boolean) => any
    items: Translation[]
    translationKey: string
}

export type TranslationDrawerView = React.FC<TranslationDrawerProps>