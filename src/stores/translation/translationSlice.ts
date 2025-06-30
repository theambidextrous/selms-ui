import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum Lang { "EN", "AR"};

export interface Translation {
    id: number,
    en: string,
    ar: string,
}

interface TranslationState {
    lang: string,
    translations: Translation[]
}

const initialState = {
    lang: 'en',
    translations: []
} as TranslationState

const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {
        keepTranslation: (state, action: PayloadAction<Translation[]>) => {
            return {...state, translations: action.payload}
        },
        keepLang: (state, action: PayloadAction<string>) => {
            return {...state, lang: action.payload}
        },
    },
});

const { keepTranslation, keepLang } = translationSlice.actions;
const translationReducer = translationSlice.reducer;

export { keepTranslation, keepLang, translationReducer };
