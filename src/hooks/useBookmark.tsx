import {atomFamily} from 'jotai/utils';
import {useCallback} from 'react';
import {atom, useAtom} from 'jotai';
import BookmarkAPI from '../api/services/util/bookmark/bookmarkAPI';
import {ArticleItemType} from '../types/announcement.type';

type BookmarkInfo = Pick<ArticleItemType, 'bookmarkCount' | 'bookmarked'>;

// Reference(AtmoFamily API): https://jotai.org/docs/utilities/family
export const bookmarkAtomFamily = atomFamily(
  ({bookmarkInfo}: {id: number; bookmarkInfo: BookmarkInfo}) =>
    atom(bookmarkInfo),
  (before, after) => before.id === after.id,
);

/** Intercept and control bookmark information(total count, if bookmarked by me) globally */
const useBookmark = (id: number, initialBookmarkInfo: BookmarkInfo) => {
  const [
    {bookmarkCount: bookmarkCountNow, bookmarked: bookmarkedNow},
    setBookmarkInfo,
  ] = useAtom(bookmarkAtomFamily({id, bookmarkInfo: initialBookmarkInfo}));

  const setBookmarkOn = useCallback(async () => {
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

  const setBookmarkOff = useCallback(async () => {
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

  const onPressBookmarkToggle = bookmarkedNow ? setBookmarkOff : setBookmarkOn;

  return {
    onPressBookmarkToggle,
    bookmarkCountNow,
    bookmarkedNow,
  };
};

export default useBookmark;
