import {forwardRef} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import ArticleItem from './ArticleItem';
import {ArticleItemType} from '../../../../../types/announcement.type';

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
    return (
      <FlatList
        ref={ref}
        scrollIndicatorInsets={{right: 1}}
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
