import React from 'react';
import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

export type RoomProps = {
  roomName: string;
  totalSeatCnt: number;
  remainingSeatCnt: number;
};

const LibraryCardRoomItem = ({
  remainingSeatCnt,
  roomName,
  totalSeatCnt,
}: RoomProps) => {
  return (
    <S.itemContainer>
      <S.itemTxtContainer>
        <Txt label={`${roomName}`} color={'grey190'} typograph={'titleSmall'} />
        <Txt
          label={`잔여 ${remainingSeatCnt}석 / ${totalSeatCnt}석`}
          color={'grey130'}
          typograph={'bodyLarge'}
        />
      </S.itemTxtContainer>
      <S.progressBarConatiner>
        <S.progressBarTrail>
          <S.progressBarInner
            percentage={
              ((totalSeatCnt - remainingSeatCnt) / totalSeatCnt) * 100
            }
          />
        </S.progressBarTrail>
      </S.progressBarConatiner>
    </S.itemContainer>
  );
};

export default LibraryCardRoomItem;

const S = {
  itemContainer: styled.View`
    display: flex;
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
    background: ${() => colors.grey20};
  `,
  progressBarInner: styled.View<{percentage: number}>`
    background: ${() => colors.primaryBrand};

    height: 4px;
    width: ${({percentage}) => `${percentage}%`};
    border-radius: 100px 0 0 100px;
  `,
};
