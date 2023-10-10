import {atom} from 'jotai';
import {ArticleCategoryNum} from '../../types/announcement.type';

export const categoryTabNumAtom = atom<ArticleCategoryNum>(0);
