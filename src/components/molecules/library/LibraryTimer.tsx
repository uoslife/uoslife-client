import {View} from 'react-native';
import React from 'react';
import {Txt, colorsType} from '@uoslife/design-system';
import {pad} from '../../../utils/handle-date';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {UsingStatus, UsingStatusWithoutNotUsed} from './LibraryUserInfo';

type LibraryUsingStatus = {
  usingStatus: UsingStatus;
  timerTime?: number; // 초 단위로
};

// 시간줄어드는거 구현 필요
const LibraryTimer = ({usingStatus, timerTime}: LibraryUsingStatus) => {
  // early return: "NOT-USED" case
  if (usingStatus === 'NOT-USED' || !timerTime)
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

  const getBottomTxtColor = ({
    usingStatus,
  }: {
    usingStatus: UsingStatusWithoutNotUsed;
  }): colorsType => {
    return {
      'IN-USE': 'primaryBrand',
      OUTGO: 'secondaryUi',
      'BE-CLOSED': 'red',
    }[usingStatus] as colorsType;
  };

  const getTimerDesigns = ({
    usingStatus,
    timerTime,
  }: {
    usingStatus: UsingStatusWithoutNotUsed;
    timerTime: number;
  }): {
    timerColors: any;
    bottomTxtColor: colorsType;
    duration: number;
    initialRemainingTime: number;
    trailColor: any;
  } => {
    return {
      timerColors: {
        'IN-USE': '#4686FF',
        OUTGO: ['#F9B000', '#E5212A'],
        'BE-CLOSED': ['#F9B000', '#E5212A'],
      }[usingStatus],
      bottomTxtColor: {
        'IN-USE': 'primaryBrand',
        OUTGO: 'secondaryUi',
        'BE-CLOSED': 'red',
      }[usingStatus] as colorsType,
      // 라이브러리가 카운트다운 형식밖에 지원하지 않습니다. usingStatus가 IN-USE일때, elapsedTime = duration - remainingTime이기 때문에 이런식으로 짰습니다.
      duration: {'IN-USE': 100000, OUTGO: 5400, 'BE-CLOSED': 5400}[usingStatus],
      initialRemainingTime: {
        'IN-USE': 100000 - timerTime,
        OUTGO: timerTime,
        'BE-CLOSED': timerTime,
      }[usingStatus],
      trailColor: {
        'IN-USE': '#4686FF',
        OUTGO: '#E1DFDD',
        'BE-CLOSED': '#E1DFDD',
      }[usingStatus],
    };
  };

  const getDisplayTimeString = ({
    usingStatus,
    timerTime,
  }: {
    usingStatus: UsingStatusWithoutNotUsed;
    timerTime: number;
  }) => {
    const hour = Math.floor(timerTime / 3600);
    const minute = pad(Math.floor((timerTime - hour * 3600) / 60));
    const second = pad(timerTime % 60);

    switch (usingStatus) {
      case 'IN-USE':
        return `${!!hour ? `${hour}시간 ` : ``}${minute}분`;
      default: // 1, 2
        return `${!!hour ? `${hour}시간 ` : ``}${
          !hour && !!minute ? `${minute}분 ` : ``
        }${second}초`;
    }
  };

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
              label={usingStatus === 'IN-USE' ? '학습 시간' : '남은 시간'}
              typograph="titleSmall"
            />
            <View style={{paddingTop: 4}}>
              <Txt
                color={'grey190'}
                label={getDisplayTimeString({
                  timerTime:
                    usingStatus === 'IN-USE' ? elapsedTime : remainingTime,
                  usingStatus,
                })}
                typograph={'headlineMedium'}
              />
            </View>
            <View style={{paddingTop: 24}}>
              <Txt
                color={getBottomTxtColor({usingStatus})}
                label={usingStatus === 'IN-USE' ? '이용 중' : '외출 중'}
                typograph={'titleSmall'}
              />
            </View>
          </>
        )}
      </CountdownCircleTimer>
    </>
  );
};

export default LibraryTimer;
