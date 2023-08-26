import {View} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {Txt, colors, colorsType} from '@uoslife/design-system';
import {pad} from '../../../utils/handle-date';

type LibraryUsingStatus = {
  // 3: 비이용        0: 이용, 미외출
  // 1: 이용, 외출, 남은시간 30분 초과
  // 2: 이용, 외출, 남은시간 30분 미만
  usingStatus: 3 | 0 | 1 | 2;
  timerTime?: number; // 초 단위로
};

// 시간줄어드는거 구현 필요
const LibraryTimer = ({usingStatus, timerTime}: LibraryUsingStatus) => {
  if (usingStatus === 3 || !timerTime)
    return (
      <S.containerCircle style={{borderColor: colors.grey40}}>
        <Txt
          color={'grey130'}
          label={'이용 중인 좌석이 없어요.'}
          typograph="titleSmall"
        />
      </S.containerCircle>
    );

  const {circleColor, bottomTxtColor} = getTimerDesigns({
    timerTime,
    usingStatus,
  });

  return (
    <S.containerCircle style={{borderColor: circleColor}}>
      <Txt
        color={'grey130'}
        label={usingStatus === 0 ? '학습시간' : '남은 시간'}
        typograph="titleSmall"
      />
      <View style={{paddingTop: 4}}>
        <Txt
          color={'grey190'}
          label={getProcessedTimeString({
            timerTime,
            usingStatus,
          })}
          typograph="headlineMedium"
        />
      </View>
      <View style={{paddingTop: 24}}>
        <Txt
          color={bottomTxtColor}
          label={usingStatus === 0 ? '이용 중' : '외출 중'}
          typograph="titleSmall"
        />
      </View>
    </S.containerCircle>
  );
};

export default LibraryTimer;

const getTimerDesigns = ({
  usingStatus,
  timerTime,
}: {
  usingStatus: 0 | 1 | 2;
  timerTime: number;
}): {
  circleColor: any;
  bottomTxtColor: colorsType;
} => {
  return {
    circleColor: [colors.primaryBrand, colors.secondaryUi, colors.red][
      usingStatus
    ],
    bottomTxtColor: ['primaryBrand', 'secondaryUi', 'red'][
      usingStatus
    ] as colorsType, // 배열 내 요소들이 colorsType을 만족시킴에도 as ~ 지우면 오류가 발생. 더 좋은 방법이 없을까요?
  };
};

const getProcessedTimeString = ({
  usingStatus,
  timerTime,
}: {
  usingStatus: 0 | 1 | 2;
  timerTime: number;
}) => {
  const hour = Math.floor(timerTime / 3600);
  const minute = pad(Math.floor((timerTime - hour * 3600) / 60));
  const second = pad(timerTime % 60);

  switch (usingStatus) {
    case 0:
      return `${!!hour ? `${hour}시간 ` : ``}${minute}분`;
    default: // 1, 2
      return `${!!hour ? `${hour}시간 ` : ``}${
        !hour && !!minute ? `${minute}분 ` : ``
      }${second}초`;
  }
};

const S = {
  containerCircle: styled.View`
    width: 240px;
    height: 240px;

    border: 2px;
    border-radius: 120px;

    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
