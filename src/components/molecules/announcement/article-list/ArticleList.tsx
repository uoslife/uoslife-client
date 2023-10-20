import {forwardRef} from 'react';
import ArticleItem from './ArticleItem';
import {FlatList} from 'react-native';
import {ArticleListType} from '../../../../types/announcement.type';
import {Txt} from '@uoslife/design-system';
import styled from '@emotion/native';

type ArticleListProps = {
  articles: ArticleListType;
  showCategoryName?: boolean;
  onEndReached: () => void;
  ListFooterComponent: JSX.Element;
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
