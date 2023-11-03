import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';

type Props = {
  label: string;
  item: string;
};

const TextItems = ({label, item}: Props) => {
  return (
    <S.Container>
      <Txt
        style={{width: 56}}
        color="grey90"
        label={label}
        typograph="titleSmall"
      />
      <Txt color="grey190" label={item} typograph="bodyLarge" />
    </S.Container>
  );
};

export default TextItems;

const S = {
  Container: styled.View`
    flex-direction: row;
    gap: 24px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  `,
};
