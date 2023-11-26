/* 
  TODO: 
    해당 훅 포함하여 로컬스토리지에 id 저장하고 사용하는 로직 날리고,
    개별 endpoint에서 북마크 정보를 받아오도록 고치기
 */

import BookmarkAPI from '../api/services/util/bookmark/bookmarkAPI';
import storage from '../storage';

const BOOKMARK_ID_LIST_LITERAL = 'bookmark-id-list';

const useBookmarkOnLocal = () => {
  const loadBookmarkOnLocal = () => {
    const idListJson = storage.getString(BOOKMARK_ID_LIST_LITERAL);
    return idListJson ? (JSON.parse(idListJson) as number[]) : null;
  };
  const saveBookmarkOnLocal = (bookmarkIdList: number[]) => {
    storage.set(BOOKMARK_ID_LIST_LITERAL, JSON.stringify(bookmarkIdList));
  };

  /** 북마크 정보를 로컬에서 가져와 반환, 없다면 새로 요청해서 반환 */
  const getBookmarkIdList = async () => {
    const loadedFromLocal = loadBookmarkOnLocal();
    if (loadedFromLocal) {
      return loadedFromLocal;
    }

    const loadedFromServer = (await BookmarkAPI.getBookmarkedArticles({}))
      .bookmarkInformation;

    const idList: number[] = loadedFromServer || ([] as number[]);

    saveBookmarkOnLocal(idList);

    return idList;
  };

  return {
    saveBookmarkOnLocal,
    getBookmarkIdList,
  };
};

export default useBookmarkOnLocal;
