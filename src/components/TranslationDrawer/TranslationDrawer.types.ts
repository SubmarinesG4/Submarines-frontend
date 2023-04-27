import { Translation } from "@/types/Translation"
import React from "react"

export type UseTranslationDrawerOptions = {
    translationKey: string
}

export type UseTranslationDrawerReturn = {
    handleSave: () => void
}

export type UseTranslationDrawer = (options: UseTranslationDrawerOptions) => UseTranslationDrawerReturn

export type TranslationDrawerProps = { 
    open: boolean
    toggleDrawer: (open: boolean) => any
    items: Translation[]
    translationKey: string
}

export type TranslationDrawerView = React.FC<TranslationDrawerProps>