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

  const hour = Math.floor(timerTime / 3600);
  const minute = pad(Math.floor((timerTime - hour * 3600) / 60));
  const second = pad(timerTime % 60);

  const processedTimeString = (function () {
    switch (usingStatus) {
      case 0:
        return `${!!hour ? `${hour}시간 ` : ``}${minute}분`;
      default: // 1, 2
        return `${!!hour ? `${hour}시간 ` : ``}${
          !hour && !!minute ? `${minute}분 ` : ``
        }${second}초`;
    }
  })();

  const borderColors: string[] = [
    colors.primaryBrand,
    colors.secondaryUi,
    colors.red,
  ];
  const txtColors: colorsType[] = ['primaryBrand', 'secondaryUi', 'red'];

  return (
    <S.containerCircle style={{borderColor: borderColors[usingStatus]}}>
      <Txt
        color={'grey130'}
        label={usingStatus === 0 ? '학슴 시간' : '남은 시간'}
        typograph="titleSmall"
      />
      <View style={{paddingTop: 4}}>
        <Txt
          color={'grey190'}
          label={processedTimeString}
          typograph="headlineMedium"
        />
      </View>
      <View style={{paddingTop: 24}}>
        <Txt
          color={txtColors[usingStatus]}
          label={usingStatus === 0 ? '이용 중' : '외출 중'}
          typograph="titleSmall"
        />
      </View>
    </S.containerCircle>
  );
};

export default LibraryTimer;

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
