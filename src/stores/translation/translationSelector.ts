import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectState = (state: RootState) => state;

export const selectTranslations = createSelector(
  [
    (state: RootState) => state.translation,
    (_state: RootState, searchWord: string) => searchWord
  ],
  (translation, searchWord: string) => {
    const matrix = translation?.translations;
    const found = matrix?.find(t => {
        return String(t.en).toLowerCase() === searchWord.toLowerCase();
    });

    if(found && translation.lang === 'ar'){
      return found.ar;
    }
    
    return searchWord;
  }
);

export const selectWordTranslation = (searchWord: string) => 
  (state: RootState) => selectTranslations(state, searchWord);

export const translationStateSelector = createSelector(
  [selectState],
  (state) => state.translation
)

export const langSelector = createSelector(
  [translationStateSelector],
  (translation) => translation.lang
)
