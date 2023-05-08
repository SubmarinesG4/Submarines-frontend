import { Translation } from "@/types/Translation"
import React from "react"

export type UseTranslationTableOptions = {
    translationKey: string
}

export type UseTranslationTableReturn = {}

export type UseTranslationTable = (options: UseTranslationTableOptions) => UseTranslationTableReturn

export type TranslationTableProps = {
    toggleDrawer: (open: boolean) => any
    items: Translation[]
    changeTranslationKey: (translationKey: string) => any
}

export type TranslationTableView = React.FC<TranslationTableProps>