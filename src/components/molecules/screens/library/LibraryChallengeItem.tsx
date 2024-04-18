import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

type Props = {
  label: string;
  finish: boolean;
};

const LibraryChallengeItem = ({label, finish}: Props) => {
  return (
    <S.Container finish={finish}>
      <Txt label={label} color="black" typograph="bodyMedium" />
    </S.Container>
  );
};

export default LibraryChallengeItem;

const S = {
  Container: styled.View<{finish: boolean}>`
    width: 80px;
    height: 80px;
    background-color: ${({finish}) =>
      finish ? colors.secondaryLight : colors.grey10};
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
