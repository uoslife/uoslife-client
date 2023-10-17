import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

import LibraryRoomItem from './LibraryRoomItem';
import {useEffect, useState} from 'react';
import {UtilAPI} from '../../../api/services';
import {GetAllLibraryStatusRes} from '../../../api/services/util/library/libraryAPI.type';
import LibraryStatusCard from './LibraryStatusCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const LibraryStatus = () => {
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
          <></>
        ) : (
          libraryStatus.map(item => (
            <LibraryStatusCard item={item.item} type={item.type} />
          ))
        )}
      </S.cardsWrapper>
    </S.seatStatusWrapper>
  );
};

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
