import {forwardRef} from 'react';
import {Dimensions, ListRenderItem} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ArticleItem from './ArticleItem';
import {ArticleItemType} from '../../../../../types/announcement.type';

type ArticleListProps = {
  articles: ArticleItemType[];
  showCategoryName?: boolean;
  ListFooterComponent: JSX.Element | null;
  onEndReached: () => void;
};

const {width} = Dimensions.get('window');

const ArticleList = forwardRef<FlatList, ArticleListProps>(
  (
    {articles, showCategoryName = true, ListFooterComponent, onEndReached},
    ref,
  ) => {
    const renderItem: ListRenderItem<any> = ({item}) => (
      <ArticleItem
        showCategoryName={showCategoryName}
        articleItem={item}
        key={item.id}
      />
    );

    return (
      <FlatList
        style={{width}}
        ref={ref}
        scrollIndicatorInsets={{right: 1}}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
        renderItem={renderItem}
        data={articles}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
      />
    );
  },
);

export default ArticleList;
