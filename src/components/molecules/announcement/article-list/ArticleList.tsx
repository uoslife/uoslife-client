import {forwardRef} from 'react';
import ArticleItem from './ArticleItem';
import {FlatList} from 'react-native';
import {ArticleListType} from '../../../../types/announcement.type';

type ArticleListProps = {
  articles: ArticleListType;
  showCategoryName?: boolean;
  onEndReached: () => void;
};

const ArticleList = forwardRef<FlatList, ArticleListProps>(
  ({articles, showCategoryName = true, onEndReached}, ref) => {
    return (
      <FlatList
        ref={ref}
        contentContainerStyle={{paddingBottom: 150}}
        renderItem={({item}) => (
          <ArticleItem
            showCategoryName={showCategoryName}
            articleItem={item}
            key={item.id}
          />
        )}
        data={articles}
        onEndReached={onEndReached}
      />
    );
  },
);

export default ArticleList;
