import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import ModalMenuButton, {ModalMenuButtonProps} from '../atoms/ModalMenuButton';

type ModalMenuContentProps = {
  title: string;
  supportingText?: string;
  menuBtnPropsList: ModalMenuButtonProps[];
};

const ModalMenuContent = ({
  title,
  supportingText,
  menuBtnPropsList,
}: ModalMenuContentProps) => {
  return (
    <S.Container>
      <S.Descriptions>
        <Txt label={title} color={'grey190'} typograph={'titleMedium'} />
        {supportingText && (
          <Txt
            label={supportingText}
            color={'grey130'}
            typograph={'bodySmall'}
          />
        )}
      </S.Descriptions>
      <S.Buttons>
        {menuBtnPropsList.map((menuBtnProps, i) => (
          <ModalMenuButton key={i} {...menuBtnProps} />
        ))}
      </S.Buttons>
    </S.Container>
  );
};

export default ModalMenuContent;

const S = {
  Container: styled.View`
    width: 100%;
  `,
  Descriptions: styled.View`
    padding: 20px 16px 12px 16px;

    gap: 8px;
  `,
  Buttons: styled.View``,
};
