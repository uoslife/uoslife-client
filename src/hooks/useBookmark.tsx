import {atomFamily} from 'jotai/utils';
import {useCallback} from 'react';
import {atom, useAtom} from 'jotai';
import BookmarkAPI from '../api/services/util/bookmark/bookmarkAPI';
import {ArticleItemType} from '../types/announcement.type';

export type BookmarkInfo = Pick<
  ArticleItemType,
  'bookmarkCount' | 'bookmarked'
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
    {bookmarkCount: bookmarkCountCurrent, bookmarked: bookmarkedCurrent},
    setBookmarkInfo,
  ] = useAtom(bookmarkAtomFamily({id, bookmarkInfo: initialBookmarkInfo}));

  const addBookmark = useCallback(async () => {
    try {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount + 1,
        bookmarked: true,
      }));

      await BookmarkAPI.postBookmark({announcementId: id});
    } catch (error) {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount - 1,
        bookmarked: false,
      }));
    }
  }, [setBookmarkInfo, id]);

  const cancelBookmark = useCallback(async () => {
    try {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount - 1,
        bookmarked: false,
      }));

      await BookmarkAPI.cancelBookmark({announcementId: id});
    } catch (error) {
      setBookmarkInfo(prev => ({
        bookmarkCount: prev.bookmarkCount + 1,
        bookmarked: true,
      }));
    }
  }, [setBookmarkInfo, id]);

  const onPressBookmarkToggle = bookmarkedCurrent
    ? cancelBookmark
    : addBookmark;

  return {
    onPressBookmarkToggle,
    bookmarkCountCurrent,
    bookmarkedCurrent,
  };
};

export default useBookmark;
