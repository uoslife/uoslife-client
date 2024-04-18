import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

type Props = {
  label: string;
  isEnabled: boolean;
};

const LibraryChallengeItem = ({label, isEnabled}: Props) => {
  return (
    <S.Container isEnabled={isEnabled}>
      <Txt label={label} color="black" typograph="bodyMedium" />
    </S.Container>
  );
};

export default LibraryChallengeItem;

const S = {
  Container: styled.View<{isEnabled: boolean}>`
    width: 80px;
    height: 80px;
    background-color: ${({isEnabled}) =>
      isEnabled ? colors.secondaryLight : colors.grey10};
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
