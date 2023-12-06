import {forwardRef, useEffect, useRef} from 'react';
import {atom, useAtom} from 'jotai';
import {FlatList} from 'react-native-gesture-handler';
import ArticleItem from './ArticleItem';
import {ArticleItemType} from '../../../../../types/announcement.type';
import {
  BookmarkKeyValueMap,
  bookmarksAtom,
} from '../../../../../store/announcement/bookmark';
import BookmarkAPI from '../../../../../api/services/util/bookmark/bookmarkAPI';

type ArticleListProps = {
  articles: ArticleItemType[];
  showCategoryName?: boolean;
  ListFooterComponent: JSX.Element | null;
  onEndReached: () => void;
};

const ArticleList = forwardRef<FlatList, ArticleListProps>(
  (
    {articles, showCategoryName = true, ListFooterComponent, onEndReached},
    ref,
  ) => {
    const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
    const prevArticles = useRef(articles); // 전 <-> 후 상태 비교

    useEffect(() => {
      if (bookmarks !== null) return;

      (async () => {
        const converted: BookmarkKeyValueMap = {};

        const loadedFromServer = (await BookmarkAPI.getBookmarkedArticles({}))
          .bookmarkInformation;

        if (!loadedFromServer) {
          setBookmarks({});
          return;
        }

        loadedFromServer.forEach(item => {
          converted[item] = atom(true);
        });

        setBookmarks(converted);
      })();
    }, []);

    useEffect(() => {
      if (articles !== prevArticles.current) {
        const nextBookmarks = {...bookmarks};
        articles.forEach(article => {
          if (bookmarks[article.id] === undefined) {
            nextBookmarks[article.id] = atom(false);
          }
        });
        setBookmarks(nextBookmarks);
        prevArticles.current = articles;
      }
    }, [setBookmarks, articles, bookmarks]);

    return (
      bookmarks && (
        <FlatList
          ref={ref}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
          renderItem={({item}) => {
            const bookmarkAtom = bookmarks[item.id];

            return bookmarkAtom ? (
              <ArticleItem
                bookmarkAtom={bookmarkAtom}
                showCategoryName={showCategoryName}
                articleItem={item}
                key={item.id}
              />
            ) : null;
          }}
          data={articles}
          onEndReached={onEndReached}
          ListFooterComponent={ListFooterComponent}
        />
      )
    );
  },
);

export default ArticleList;
