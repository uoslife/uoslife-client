import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';

export type InformationBoxObject = {key: string; value: string}[];

type ModalInformationBoxProps = {
  informationBoxObject: InformationBoxObject;
};

const ModalInformationBox = ({
  informationBoxObject,
}: ModalInformationBoxProps) => {
  return (
    <S.Box>
      {informationBoxObject.map(({key, value}, i) => (
        <S.Item key={i}>
          <S.KeyTxtContainer>
            <Txt label={key} color={'primaryBrand'} typograph={'labelMedium'} />
          </S.KeyTxtContainer>
          <S.ValueTxtContainer>
            <Txt label={value} color={'grey190'} typograph={'bodySmall'} />
          </S.ValueTxtContainer>
        </S.Item>
      ))}
    </S.Box>
  );
};

export default ModalInformationBox;

const S = {
  Box: styled.View`
    background-color: ${colors.grey20};

    width: 100%;
    padding: 12px 16px;

    gap: 4px;
  `,
  Item: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  // fixed width 부여가 목적
  KeyTxtContainer: styled.View`
    width: 36px;
  `,
  ValueTxtContainer: styled.View``,
};
