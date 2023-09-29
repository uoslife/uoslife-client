import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import ModalStandardButton, {
  ModalStandardButtonProps,
} from '../atoms/ModalStandardButton';
import ModalInformationBox, {
  InformationBoxObject,
} from '../atoms/ModalInformationBox';

type ModalStandardContentProps = {
  title: string;
  supportingText: string;
  standardBtnPropsList: ModalStandardButtonProps[];
  informationBoxObject?: InformationBoxObject;
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

export default ModalStandardContent;

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
