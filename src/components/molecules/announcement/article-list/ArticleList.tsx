import {forwardRef} from 'react';
import ArticleItem from './ArticleItem';
import useBookmarkOnLocal from '../../../../hooks/useBookmarkOnLocal';
import {FlatList} from 'react-native-gesture-handler';
import {ArticleListType} from '../../../../types/announcement.type';

type ArticleListProps = {
  articles: ArticleListType;
  showCategoryName?: boolean;
  onEndReached: () => void;
  ListFooterComponent: JSX.Element;
};

const ArticleList = forwardRef<FlatList, ArticleListProps>(
  (
    {articles, showCategoryName = true, onEndReached, ListFooterComponent},
    ref,
  ) => {
    const {loadBookmarkFromLocal} = useBookmarkOnLocal();

    const isBookmarkedByMe = (id: number) => {
      const bookmarkOnLocal = loadBookmarkFromLocal();
      if (!bookmarkOnLocal) return false;

      return id in bookmarkOnLocal;
    };

    return (
      <FlatList
        ref={ref}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
        renderItem={({item}) => (
          <ArticleItem
            isBookmarkedByMe={isBookmarkedByMe(item.id)}
            showCategoryName={showCategoryName}
            articleItem={item}
            key={item.id}
          />
        )}
        data={articles}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
      />
    );
  },
);

export default ArticleList;
