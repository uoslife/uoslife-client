import {forwardRef} from 'react';
import ArticleItem from './ArticleItem';
import {FlatList} from 'react-native-gesture-handler';
import {ArticleItemType} from '../../../../types/announcement.type';

type ArticleListProps = {
  articles: ArticleItemType[];
  showCategoryName?: boolean;
  ListFooterComponent: JSX.Element;
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
