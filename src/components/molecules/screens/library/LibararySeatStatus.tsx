import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';

import {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UtilAPI} from '../../../../api/services';
import {GetAllLibraryStatusRes} from '../../../../api/services/util/library/libraryAPI.type';
import LibraryStatusCard from './LibraryStatusCard';
import Skeleton from '../../common/skeleton/Skeleton';

const LibrarySeatStatus = () => {
  const insets = useSafeAreaInsets();
  const [libraryStatus, setLibraryStatus] = useState<GetAllLibraryStatusRes>();

  useEffect(() => {
    (async () => {
      const libraryStatusRes = await UtilAPI.getAllLibraryStatus({});
      setLibraryStatus(libraryStatusRes);
    })();
  }, []);

  return (
    <S.seatStatusWrapper style={{paddingBottom: insets.bottom}}>
      <Txt
        label="도서관 좌석 현황"
        color="grey190"
        typograph="titleLarge"
        style={{paddingLeft: 8}}
      />
      <S.cardsWrapper>
        {!libraryStatus ? (
          <Skeleton variant="card" />
        ) : (
          libraryStatus.map(item => (
            <LibraryStatusCard
              key={item.type.code}
              item={item.item}
              type={item.type}
            />
          ))
        )}
      </S.cardsWrapper>
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
};
