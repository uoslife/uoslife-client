import {View} from 'react-native';
import React from 'react';
import {Txt, colorsType} from '@uoslife/design-system';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {pad} from '../../../../utils/handle-date';
import {UsingStatusType, UsingStatusExcludeNotUsing} from './LibraryUserInfo';

type LibraryUsingStatus = {
  libraryUsingStatus?: UsingStatusType;
  timerTime?: number; // 초 단위로
};

// 시간줄어드는거 구현 필요
const LibraryTimer = ({libraryUsingStatus, timerTime}: LibraryUsingStatus) => {
  if (!libraryUsingStatus || timerTime === -1) return <></>;
  if (libraryUsingStatus === 'NOT_USING')
    return (
      <CountdownCircleTimer
        colors={['#F9B000', '#E5212A', '#E5212A']}
        duration={0}
        trailColor="#E1DFDD"
        colorsTime={[1000, 1000]}
        size={240}
        strokeWidth={2}>
        {({}) => (
          <Txt
            color="grey130"
            label={`이용 중인 좌석이\n없어요.`}
            typograph="titleLarge"
            style={{textAlign: 'center'}}
          />
        )}
      </CountdownCircleTimer>
    );

  const getBottomTxtColor = ({
    libraryUsingStatus,
  }: {
    libraryUsingStatus: UsingStatusExcludeNotUsing;
  }): colorsType => {
    return {
      USING: 'primaryBrand',
      OUTING_DEFAULT: 'secondaryUi',
      OUTING_NO_TIME: 'red',
    }[libraryUsingStatus] as colorsType;
  };

  const getTimerDesigns = ({
    libraryUsingStatus,
    timerTime,
  }: {
    libraryUsingStatus: UsingStatusExcludeNotUsing;
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
        USING: '#4686FF',
        OUTING_DEFAULT: ['#F9B000', '#E5212A'],
        OUTING_NO_TIME: ['#F9B000', '#E5212A'],
      }[libraryUsingStatus],
      bottomTxtColor: {
        USING: 'primaryBrand',
        OUTING_DEFAULT: 'secondaryUi',
        OUTING_NO_TIME: 'red',
      }[libraryUsingStatus] as colorsType,
      // 라이브러리가 카운트다운 형식밖에 지원하지 않습니다. libraryUsingStatus가 USING일때, elapsedTime = duration - remainingTime이기 때문에 이런식으로 짰습니다.
      duration: {USING: 100000, OUTING_DEFAULT: 5400, OUTING_NO_TIME: 5400}[
        libraryUsingStatus
      ],
      initialRemainingTime: {
        USING: 100000 - timerTime,
        OUTING_DEFAULT: timerTime,
        OUTING_NO_TIME: timerTime,
      }[libraryUsingStatus],
      trailColor: {
        USING: '#4686FF',
        OUTING_DEFAULT: '#E1DFDD',
        OUTING_NO_TIME: '#E1DFDD',
      }[libraryUsingStatus],
    };
  };

  const getDisplayTimeString = ({
    libraryUsingStatus,
    timerTime,
  }: {
    libraryUsingStatus: UsingStatusExcludeNotUsing;
    timerTime: number;
  }) => {
    const hour = Math.floor(timerTime / 3600);
    const minute = pad(Math.floor((timerTime - hour * 3600) / 60));
    const second = pad(timerTime % 60);

    switch (libraryUsingStatus) {
      case 'USING':
        return `${hour ? `${hour}시간 ` : ``}${minute}분`;
      default: // 1, 2
        return `${hour ? `${hour}시간 ` : ``}${
          !hour && !!minute ? `${minute}분 ` : ``
        }${second}초`;
    }
  };

  const {timerColors, duration, initialRemainingTime, trailColor} =
    getTimerDesigns({
      timerTime,
      libraryUsingStatus,
    });

  return (
    <CountdownCircleTimer
      isPlaying
      size={240}
      rotation="counterclockwise"
      duration={duration}
      initialRemainingTime={initialRemainingTime}
      colors={timerColors}
      colorsTime={[5400, 1800, 0]} // libraryUsingStatus === 1 || libraryUsingStatus === 2일 때
      trailColor={trailColor}
      strokeWidth={2}
      isSmoothColorTransition={false}>
      {({remainingTime, elapsedTime}) => (
        <>
          <Txt
            color="grey130"
            label={libraryUsingStatus === 'USING' ? '학습 시간' : '남은 시간'}
            typograph="titleSmall"
          />
          <View style={{paddingTop: 4}}>
            <Txt
              color="grey190"
              label={getDisplayTimeString({
                timerTime:
                  libraryUsingStatus === 'USING' ? elapsedTime : remainingTime,
                libraryUsingStatus,
              })}
              typograph="headlineMedium"
            />
          </View>
          <View style={{paddingTop: 24}}>
            <Txt
              color={getBottomTxtColor({libraryUsingStatus})}
              label={libraryUsingStatus === 'USING' ? '이용 중' : '외출 중'}
              typograph="titleSmall"
            />
          </View>
        </>
      )}
    </CountdownCircleTimer>
  );
};

export default LibraryTimer;
