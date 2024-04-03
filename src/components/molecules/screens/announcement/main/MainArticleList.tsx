import styled from '@emotion/native';
import {FlatList} from 'react-native-gesture-handler';
import {Suspense, forwardRef, useMemo} from 'react';
import {useAtom, useAtomValue} from 'jotai';
import {ArticleItemType} from '../../../../../types/announcement.type';
import ArticleList from '../list/ArticleList';
import Spinner from '../../../../atoms/spinner/Spinner';
import LoadingFailed from '../LoadingFailed/LoadingFailed';
import getAnnouncement from '../../../../../store/announcement/getAnnouncement';
import announcementCurrentOriginAtom from '../../../../../store/announcement/announcementCurrentOrigin';

const MainArticleList = forwardRef<FlatList>((_, ref) => {
  const [{data, fetchNextPage, isError, isFetching, error, refetch}] =
    useAtom(getAnnouncement);
  const currentOrigin = useAtomValue(announcementCurrentOriginAtom);

  const onEndReached = () => fetchNextPage();

  const articles = useMemo(
    () =>
      data.pages.reduce(
        (accumulator, page) => accumulator.concat(page.content),
        [] as ArticleItemType[],
      ),
    [data.pages],
  );

  if (isError && error?.name !== 'TimeoutError')
    return (
      <S.Root>
        <LoadingFailed onRefresh={refetch} />
      </S.Root>
    );

  return (
    <Suspense fallback={<Spinner />}>
      <S.Root>
        <ArticleList
          key={currentOrigin}
          ListFooterComponent={isFetching ? <Spinner /> : null}
          ref={ref}
          showCategoryName={false}
          articles={articles}
          onEndReached={onEndReached}
        />
      </S.Root>
    </Suspense>
  );
});

export default MainArticleList;

const S = {
  Root: styled.View`
    height: 100%;
  `,
};
