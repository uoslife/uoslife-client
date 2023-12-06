import {useCallback, useEffect, useMemo} from 'react';
import {PrimitiveAtom, useAtom} from 'jotai';
import BookmarkAPI from '../api/services/util/bookmark/bookmarkAPI';

const useBookmark = (id: number, bookmarkAtom: PrimitiveAtom<boolean>) => {
  const [isBookmarked, setIsBookmarked] = useAtom(bookmarkAtom);

  useEffect(() => {
    console.log('hook rerendered');
    console.log({id});
  });

  const setBookmarkOn = useCallback(async () => {
    try {
      setIsBookmarked(true);
      await BookmarkAPI.postBookmark({announcementId: id});

      return 'success';
    } catch (error) {
      setIsBookmarked(false);

      return null;
    }
  }, [id]);

  const setBookmarkOff = useCallback(async () => {
    try {
      setIsBookmarked(false);
      await BookmarkAPI.cancelBookmark({announcementId: id});

      return 'success';
    } catch (error) {
      setIsBookmarked(true);

      return null;
    }
  }, [id]);

  return useMemo(
    () => ({
      setBookmarkOn,
      setBookmarkOff,
      isBookmarked,
    }),
    [setBookmarkOn, setBookmarkOff, isBookmarked],
  );
};

export default useBookmark;
