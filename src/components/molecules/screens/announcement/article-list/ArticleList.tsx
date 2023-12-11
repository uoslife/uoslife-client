import {forwardRef} from 'react';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import ArticleItem from './ArticleItem';
import {ArticleItemType} from '../../../../../types/announcement.type';

type ArticleListProps = {
  articles: ArticleItemType[];
  showCategoryName?: boolean;
  ListFooterComponent: JSX.Element | null;
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
};

const ArticleList = forwardRef<FlatList, ArticleListProps>(
  (
    {
      articles,
      showCategoryName = true,
      ListFooterComponent,
      onRefresh,
      refreshing,
      onEndReached,
    },
    ref,
  ) => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        ref={ref}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
        renderItem={({item}) => (
          <ArticleItem
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
