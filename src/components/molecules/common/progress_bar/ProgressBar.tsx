import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';

type Props = {useRate: number};

const ProgressBar = ({useRate}: Props) => {
  return (
    <S.ProgressBarTrail>
      <S.ProgressBarInner useRate={useRate} />
    </S.ProgressBarTrail>
  );
};

export default ProgressBar;

const S = {
  ProgressBarTrail: styled.View`
    height: 4px;
    background-color: ${colors.grey20};
    width: 100%;
  `,
  ProgressBarInner: styled.View<{
    useRate: number;
  }>`
    background-color: ${colors.primaryBrand};

    height: 4px;
    width: ${({useRate}) => `${useRate}%`};
    border-radius: 100px 0 0 100px;
  `,
};
