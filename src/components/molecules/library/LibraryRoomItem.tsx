import React from 'react';
import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {LibraryStatusItemType} from '../../../api/services/util/library/libraryAPI.type';

export type Props = {item: LibraryStatusItemType};

const LibraryRoomItem = ({item}: Props) => {
  return (
    <S.Container>
      <S.itemTxtContainer>
        <Txt
          label={`${item.room_name}`}
          color={'grey190'}
          typograph={'titleSmall'}
        />
        <Txt
          label={`잔여 ${item.remain_seat}석 / ${item.total_seat}석`}
          color={'grey130'}
          typograph={'bodyLarge'}
        />
      </S.itemTxtContainer>
      <S.progressBarConatiner>
        <S.progressBarTrail>
          <S.progressBarInner useRate={item.use_rate} />
        </S.progressBarTrail>
      </S.progressBarConatiner>
    </S.Container>
  );
};

export default LibraryRoomItem;

const S = {
  Container: styled.View`
    display: flex;
    padding: 12px 0;
    gap: 4px;
  `,
  itemTxtContainer: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  progressBarConatiner: styled.View`
    margin-top: 8px;
    margin-bottom: 8px;
  `,
  progressBarTrail: styled.View`
    height: 4px;
    background: ${colors.grey20};
  `,
  progressBarInner: styled.View<{
    useRate: LibraryStatusItemType['use_rate'];
  }>`
    background: ${colors.primaryBrand};

    height: 4px;
    width: ${({useRate}) => `${useRate}%`};
    border-radius: 100px 0 0 100px;
  `,
};
