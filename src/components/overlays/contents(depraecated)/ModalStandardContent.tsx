import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import ModalStandardButton, {
  ModalStandardButtonProps,
} from '../items/ModalStandardButton';
import ModalInformationBox, {
  InformationBoxObject,
} from '../items/ModalInformationBox';

type ModalStandardContentProps = {
  title: string;
  supportingText: string;
  standardBtnPropsList: ModalStandardButtonProps[];
  informationBoxObject?: InformationBoxObject;
};

const ModalStandardContent = ({
  title,
  supportingText,
  standardBtnPropsList,
  informationBoxObject,
}: ModalStandardContentProps) => {
  return (
    <S.Container>
      <S.Descriptions>
        <Txt label={title} color={'grey190'} typograph={'titleMedium'} />
        {informationBoxObject && (
          <ModalInformationBox informationBoxObject={informationBoxObject} />
        )}
        <Txt label={supportingText} color={'grey130'} typograph={'bodySmall'} />
      </S.Descriptions>
      <S.Buttons>
        {standardBtnPropsList.map((standardBtnProps, i) => (
          <ModalStandardButton key={i} {...standardBtnProps} />
        ))}
      </S.Buttons>
    </S.Container>
  );
};

const S = {
  Container: styled.View`
    width: 100%;
  `,
  Descriptions: styled.View`
    padding: 24px 16px 16px 16px;

    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
  Buttons: styled.View``,
};
