import atomWithMMKV from '../../storage/atomWithMMKV';

export const initIsLibraryStateActivity = true;
export const libraryStateActivityAtom = atomWithMMKV<boolean>(
  'isLibraryStateActivity',
  initIsLibraryStateActivity,
);
