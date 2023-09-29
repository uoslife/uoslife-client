import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import ModalMenuButton, {ModalMenuButtonProps} from '../atoms/ModalMenuButton';

type ModalMenuContentProps = {
  title: string;
  supportingText?: string;
  menuBtnProps: ModalMenuButtonProps[];
};

// {
//   /* TODO: text-align: center적용 필요 */
// }
// {
//   /* 인라인 스타일로 적용시 다른 Txt 스타일이 깨지는 문제 -> 다른 방법 찾기 */
// }
// <Txt
//   label={supportingText}
//   color={'grey130'}
//   typograph={'bodySmall'}
// />;

const ModalMenuContent = ({
  title,
  supportingText,
  menuBtnProps,
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
      {menuBtnProps.map((menuBtnProp, i) => (
        <ModalMenuButton key={i} {...menuBtnProp} />
      ))}
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
};
