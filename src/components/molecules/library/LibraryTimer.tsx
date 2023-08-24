import {View, Text} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

type LibraryTimerProps = {
  state: '이용 중' | '외출 중' | '비이용';
  timerTime?: number; // 초 단위로
};

// 시간줄어드는거 구현 필요
// 리팩토링 예정
const LibraryTimer = ({state, timerTime}: LibraryTimerProps) => {
  if (state === '비이용' || !timerTime)
    return (
      <S.containerCircle style={{borderColor: colors.grey40}}>
        <Txt
          color={'grey130'}
          label={'이용 중인 좌석이 없어요.'}
          typograph="titleSmall"
        />
      </S.containerCircle>
    );

  // 문자열 처리 로직 수정 필요
  const hour = Math.floor(timerTime / 3600);
  const minute = Math.floor((timerTime - hour * 3600) / 60);
  const second = timerTime % 60;

  const processedRemainingTimeString =
    `${hour}시간 ${minute}분` +
    (state === '외출 중' && !!hour ? ` ${second}초` : ``);

  switch (state) {
    case '이용 중':
      return (
        <S.containerCircle style={{borderColor: colors.primaryBrand}}>
          <Txt color={'grey130'} label={'남은 시간'} typograph="titleSmall" />
          <View style={{paddingTop: 4}}>
            <Txt
              color={'grey190'}
              label={processedRemainingTimeString}
              typograph="headlineMedium"
            />
          </View>
          <View style={{paddingTop: 24}}>
            <Txt color={'primaryBrand'} label={'시간'} typograph="titleSmall" />
          </View>
        </S.containerCircle>
      );
    case '외출 중':
      const borderColor = timerTime > 1800 ? colors.secondaryUi : colors.red;
      const txtColor = timerTime > 1800 ? 'secondaryUi' : 'red';

      return (
        <S.containerCircle style={{borderColor}}>
          <Txt color={'grey130'} label={'남은 시간'} typograph="titleSmall" />
          <View style={{paddingTop: 4}}>
            <Txt
              color={'grey190'}
              label={processedRemainingTimeString}
              typograph="headlineMedium"
            />
          </View>
          <View style={{paddingTop: 24}}>
            <Txt color={txtColor} label={'시간'} typograph="titleSmall" />
          </View>
        </S.containerCircle>
      );
  }
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