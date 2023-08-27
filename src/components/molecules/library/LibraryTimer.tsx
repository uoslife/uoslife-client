import {View} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {Txt, colorsType} from '@uoslife/design-system';
import {pad} from '../../../utils/handle-date';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

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
      <CountdownCircleTimer
        colors={['#F9B000', '#E5212A', '#E5212A']}
        duration={0}
        trailColor={'#E1DFDD'}
        colorsTime={[1000, 1000]}
        size={240}
        strokeWidth={2}>
        {({}) => (
          <>
            <Txt
              color={'grey130'}
              label={'이용 중인 좌석이'}
              typograph="titleLarge"
            />
            <Txt color={'grey130'} label={'없어요.'} typograph="titleLarge" />
          </>
        )}
      </CountdownCircleTimer>
    );

  const {timerColors, duration, initialRemainingTime, trailColor} =
    getTimerDesigns({
      timerTime,
      usingStatus,
    });

  return (
    <>
      <CountdownCircleTimer
        isPlaying
        size={240}
        rotation={'counterclockwise'}
        duration={duration}
        initialRemainingTime={initialRemainingTime}
        colors={timerColors}
        colorsTime={[5400, 1800, 0]} // usingStatus === 1 || usingStatus === 2일 때
        trailColor={trailColor}
        strokeWidth={2}
        isSmoothColorTransition={false}>
        {({remainingTime, elapsedTime}) => (
          <>
            <Txt
              color={'grey130'}
              label={usingStatus === 0 ? '학습시간' : '남은 시간'}
              typograph="titleSmall"
            />
            <View style={{paddingTop: 4}}>
              <Txt
                color={'grey190'}
                label={getDisplayTimeString({
                  timerTime: usingStatus === 0 ? elapsedTime : remainingTime,
                  usingStatus,
                })}
                typograph="headlineMedium"
              />
            </View>
            <View style={{paddingTop: 24}}>
              <Txt
                color={getBottomTxtColor({usingStatus, remainingTime})}
                label={usingStatus === 0 ? '이용 중' : '외출 중'}
                typograph="titleSmall"
              />
            </View>
          </>
        )}
      </CountdownCircleTimer>
    </>
  );
};

export default LibraryTimer;

const getBottomTxtColor = ({
  usingStatus,
  remainingTime,
}: {
  usingStatus: 0 | 1 | 2;
  remainingTime: number;
}) => {
  if (usingStatus === 0) return 'primaryBrand';
  if (remainingTime > 1800) return 'secondaryUi';
  return 'red';
};

const getTimerDesigns = ({
  usingStatus,
  timerTime,
}: {
  usingStatus: 0 | 1 | 2;
  timerTime: number;
}): {
  timerColors: any;
  bottomTxtColor: colorsType;
  duration: number;
  initialRemainingTime: number;
  trailColor: any;
} => {
  return {
    timerColors: ['#4686FF', ['#F9B000', '#E5212A'], ['#F9B000', '#E5212A']][
      usingStatus
    ],
    bottomTxtColor: ['primaryBrand', 'secondaryUi', 'red'][
      usingStatus
    ] as colorsType, // 배열 내 요소들이 colorsType을 만족시킴에도 as ~ 지우면 오류가 발생. 더 좋은 방법이 없을까요?
    // usingStatus === 0일때, elapsedTime = duration - remainingTime이기 때문에 이런식으로 짰습니다.
    duration: [100000, 5400, 5400][usingStatus],
    initialRemainingTime: [100000 - timerTime, timerTime, timerTime][
      usingStatus
    ],
    trailColor: ['#4686FF', '#E1DFDD', '#E1DFDD'][usingStatus],
  };
};

const getDisplayTimeString = ({
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
