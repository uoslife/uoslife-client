import {PrimitiveAtom, atom} from 'jotai';

export type BookmarkKeyValueMap = {[key in number]?: PrimitiveAtom<boolean>};

// atoms-in-atom pattern, ref: https://jotai.org/docs/guides/atoms-in-atom
export const bookmarksAtom = atom<BookmarkKeyValueMap>({});
