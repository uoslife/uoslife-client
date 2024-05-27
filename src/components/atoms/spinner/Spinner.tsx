import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';

type SpinnerProps = {
  size?: 'large' | 'small' | number;
};

const Spinner = ({size = 'large'}: SpinnerProps) => {
  return <S.activityIndicator size={size} color={colors.primaryBrand} />;
};

export default Spinner;

const S = {
  activityIndicator: styled.ActivityIndicator`
    flex: 1;
    position: absolute;
    top: 45%;
    left: 45%;
  `,
};
