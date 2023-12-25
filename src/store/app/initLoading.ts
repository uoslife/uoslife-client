import {atom} from 'jotai';

export type InitLoadingAtomType = boolean;

const initInitLoadingFinish = false;

const initLoadingFinishAtom = atom<InitLoadingAtomType>(initInitLoadingFinish);

export default initLoadingFinishAtom;
