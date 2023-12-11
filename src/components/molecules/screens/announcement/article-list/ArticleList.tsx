import {forwardRef} from 'react';
import {Dimensions, ListRenderItem} from 'react-native';
import {colors} from '@uoslife/design-system';
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

const {width} = Dimensions.get('window');

const ArticleList = forwardRef<FlatList, ArticleListProps>(
  (
    {
      articles,
      showCategoryName = true,
      ListFooterComponent,
      refreshing,
      onRefresh,
      onEndReached,
    },
    ref,
  ) => {
    const refreshControl = (
      <RefreshControl
        onRefresh={onRefresh}
        colors={[colors.primaryBrand, colors.primaryBrand]}
        refreshing={refreshing}
      />
    );

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
        refreshControl={refreshControl}
        ref={ref}
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
