import React from "react"

//HOOK
export type UseTranslationListOptions = {
	projectId: string
}
export type UseTranslationListReturn = {
	handleClick: () => void
	items: any
	isLoading: boolean
	error: unknown
}

export type UseTranslationList = (options: UseTranslationListOptions) => UseTranslationListReturn

//COMPONENT
export type TranslationListProps = {}

export type TranslationListView = React.FC<TranslationListProps>