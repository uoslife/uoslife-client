import {forwardRef} from 'react';
import {Dimensions, ListRenderItem, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {DefinedInfiniteQueryObserverResult} from '@tanstack/react-query';
import ArticleItem from './ArticleItem';
import {ArticleItemType} from '../../../../../types/announcement.type';
import usePullToRefresh from '../../../../../hooks/usePullToRefresh';

type ArticleListProps = {
  articles: ArticleItemType[];
  showCategoryName?: boolean;
  ListFooterComponent: JSX.Element | null;
  onEndReached: () => void;
  refetch?: DefinedInfiniteQueryObserverResult['refetch'];
};

const {width} = Dimensions.get('window');

const ArticleList = forwardRef<FlatList, ArticleListProps>(
  (
    {
      articles,
      showCategoryName = true,
      ListFooterComponent,
      onEndReached,
      refetch,
    },
    ref,
  ) => {
    // pull to refresh
    const {onRefresh, refreshing} = usePullToRefresh(() =>
      refetch ? refetch() : undefined,
    );

    // render item
    const renderItem: ListRenderItem<any> = ({item}) => (
      <ArticleItem
        showCategoryName={showCategoryName}
        articleItem={item}
        key={item.id}
      />
    );

    return (
      <FlatList
        refreshControl={
          refetch ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
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
