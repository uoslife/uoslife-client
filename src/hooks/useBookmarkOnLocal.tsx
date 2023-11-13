import {storage} from '../storage';

const BOOKMARK = 'bookmark';

type IdList = number[];

const useBookmarkOnLocal = () => {
  const saveBookmarkOnLocal = (idList: IdList) => {
    storage.set(BOOKMARK, JSON.stringify(idList));
  };

  const loadBookmarkFromLocal = () => {
    const loaded = storage.getString(BOOKMARK);
    if (loaded) return JSON.parse(loaded) as IdList;

    return null;
  };

  return {saveBookmarkOnLocal, loadBookmarkFromLocal};
};

export default useBookmarkOnLocal;
