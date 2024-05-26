import {atomFamily} from 'jotai/utils';
import {useCallback} from 'react';
import {atom, useAtom} from 'jotai';
import BookmarkAPI from '../../../api/services/util/bookmark/bookmarkAPI';
import {ArticleItemType} from '../types/announcement.type';

export type BookmarkInfo = Pick<
  ArticleItemType,
  'bookmarkCount' | 'isBookmarked'
>;

// Reference(atomFamily API): https://jotai.org/docs/utilities/family
const bookmarkAtomFamily = atomFamily(
  ({bookmarkInfo}: {id: number; bookmarkInfo: BookmarkInfo}) =>
    atom(bookmarkInfo),
  (a, b) => a.id === b.id,
);

/** Intercept and control bookmark information(total count, if bookmarked by me) globally.
 *  Once atom is created(using id), by atomFamily's caching machanism, initialBookmarkInfo will not be overrided.
 */
const useBookmark = (id: number, initialBookmarkInfo: BookmarkInfo) => {
  const [
    {bookmarkCount: bookmarkCountCurrent, isBookmarked: isBookmarkedCurrent},
    setBookmarkInfo,
  ] = useAtom(bookmarkAtomFamily({id, bookmarkInfo: initialBookmarkInfo}));

  const addBookmark = useCallback(async () => {
    try {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount + 1,
        isBookmarked: true,
      }));

      await BookmarkAPI.postBookmark({announcementId: id});
    } catch (error) {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount - 1,
        isBookmarked: false,
      }));
    }
  }, [setBookmarkInfo, id]);

  const cancelBookmark = useCallback(async () => {
    try {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount - 1,
        isBookmarked: false,
      }));

      await BookmarkAPI.cancelBookmark({announcementId: id});
    } catch (error) {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount + 1,
        isBookmarked: true,
      }));
    }
  }, [setBookmarkInfo, id]);

  const onPressBookmarkToggle = isBookmarkedCurrent
    ? cancelBookmark
    : addBookmark;

  return {
    onPressBookmarkToggle,
    bookmarkCountCurrent,
    isBookmarkedCurrent,
  };
};

export default useBookmark;
