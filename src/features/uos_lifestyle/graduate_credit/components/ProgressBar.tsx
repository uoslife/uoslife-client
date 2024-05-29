import {Image, Text} from 'react-native';
import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';

const PROGRESS_IMAGE = {
  dashed_primary: require('../assets/dashed_border_primary.png'),
  dashed_grey: require('../assets/dashed_border_grey.png'),
  speech_bubble: require('../assets/speech_bubble.png'),
};

// 퍼센트 계산 로직
const calculatePercentage = (
  currentNum: number,
  totalNum: number,
  adjustNum?: number,
) => `${(currentNum / totalNum - (adjustNum ?? 0)) * 100}`;

type ProgressBarProps = {
  type: 'main' | 'sub';
  maxNum: number;
  currentCredit: number;
  minGraduateCredit?: number;
};
const ProgressBar = ({
  type,
  maxNum,
  currentCredit,
  minGraduateCredit = 0,
}: ProgressBarProps) => {
  // 현재 이수학점 비율
  const currentCreditPercentage = calculatePercentage(currentCredit, maxNum);

  // 최소이수학점 비율
  const minGraduateCreditPercentage = calculatePercentage(
    minGraduateCredit,
    maxNum,
  );

  return (
    <S.TotalProgressBar type={type}>
      <S.CurrenProgressBar type={type} sidePosition={currentCreditPercentage} />
      {type === 'main' && (
        <S.CurrentCreditDescription sidePosition={currentCreditPercentage}>
          <Text>{Math.floor(+currentCreditPercentage)}%</Text>
          <Image source={PROGRESS_IMAGE.dashed_primary} />
        </S.CurrentCreditDescription>
      )}
      {type === 'sub' && (
        <S.MinCreditDescription sidePosition={minGraduateCreditPercentage}>
          <S.SpeechBubbleContainer sidePosition={minGraduateCreditPercentage}>
            <Image source={PROGRESS_IMAGE.speech_bubble} />
            <S.SpeechBubbleText>최소이수학점</S.SpeechBubbleText>
          </S.SpeechBubbleContainer>
          <Image source={PROGRESS_IMAGE.dashed_grey} />
        </S.MinCreditDescription>
      )}
    </S.TotalProgressBar>
  );
};

export default ProgressBar;

const S = {
  // 전체 프로그래스바
  TotalProgressBar: styled.View<{type: string}>`
    position: relative;
    height: ${({type}) => `${type === 'main' ? 28 : 20}px`};
    width: 100%;
    border-radius: 8px;
    background-color: ${colors.grey20};
  `,
  // 현재 프로그래스바
  CurrenProgressBar: styled.View<{
    type: string;
    sidePosition: string;
  }>`
    position: absolute;
    left: 0;
    top: 0;
    height: ${({type}) => `${type === 'main' ? 28 : 20}px`};
    width: ${({sidePosition}) => `${sidePosition}%`};
    min-width: 0;
    max-width: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: ${colors.primaryBrand};
  `,
  // 현재 이수학점 태그
  CurrentCreditDescription: styled.View<{
    sidePosition: string;
  }>`
    position: absolute;
    left: ${({sidePosition}) => `${sidePosition}%`};
    top: -30px;
  `,
  // 최소이수학점 태그
  MinCreditDescription: styled.View<{
    sidePosition: string;
  }>`
    position: absolute;
    left: ${({sidePosition}) => `${sidePosition}%`};
    top: 0;
  `,
  // 말풍선
  SpeechBubbleContainer: styled.View<{
    sidePosition: string;
  }>`
    position: absolute;
    left: ${({sidePosition}) => `${+sidePosition - 1700}%`};
    top: -32px;
  `,
  SpeechBubbleText: styled.Text`
    position: absolute;
    top: 4px;
    left: 8px;
    font-family: 'Pretendard-SemiBold';
    color: ${colors.white};
    font-size: 10px;
    font-weight: 600;
  `,
};
