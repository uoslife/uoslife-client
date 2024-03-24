import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';

import {Suspense} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSuspenseQuery} from '@tanstack/react-query';
import {Pressable} from 'react-native';
import {UtilAPI} from '../../../../api/services';
import LibraryStatusCard from './LibraryStatusCard';
import Skeleton from '../../common/skeleton/Skeleton';

const LibrarySeatStatus = () => {
  const insets = useSafeAreaInsets();
  const {data, refetch} = useSuspenseQuery({
    queryKey: ['getAllLibraryStatus'],
    queryFn: () => UtilAPI.getAllLibraryStatus({}),
  });

  return (
    <S.seatStatusWrapper style={{paddingBottom: insets.bottom}}>
      <S.TitleWrapper>
        <Txt label="도서관 좌석 현황" color="grey190" typograph="titleLarge" />
        <Pressable onPress={() => refetch()}>
          <Icon name="refresh" width={24} height={24} color="grey90" />
        </Pressable>
      </S.TitleWrapper>

      <Suspense fallback={<Skeleton variant="card" />}>
        <S.cardsWrapper>
          {data
            .filter(item => item.type.code === 'C') // 중앙도서관을 가장 위로 정렬
            .concat(...data.filter(item => item.type.code !== 'C'))
            .map(item => (
              <LibraryStatusCard
                key={item.type.code}
                item={item.item}
                type={item.type}
              />
            ))}
        </S.cardsWrapper>
      </Suspense>
    </S.seatStatusWrapper>
  );
};

export default LibrarySeatStatus;

const S = {
  seatStatusWrapper: styled.View`
    width: 100%;
    padding: 48px 16px 0 16px;
    gap: 12px;
  `,
  cardsWrapper: styled.View`
    gap: 16px;
  `,
  TitleWrapper: styled.View`
    padding: 0 5px 0 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
};
