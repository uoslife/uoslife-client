import {atom} from 'jotai';

export type BootSplashVisibleAtomType = boolean;

const initBootSplashVisible = false;

const bootSplashVisibleAtom = atom<BootSplashVisibleAtomType>(
  initBootSplashVisible,
);

export default bootSplashVisibleAtom;
