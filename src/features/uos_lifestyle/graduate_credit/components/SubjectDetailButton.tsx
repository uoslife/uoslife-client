import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {ApiResponse} from '../types';
import {SUBJECT_BUTTON_LABEL} from '../configs/constants';
import {GraduateCreditNavigationProp} from '../navigators/types/graduateCredit';
import {SubjectCreditListRes} from '../../../../api/services/core/graduateCredit/graduateCreditAPI.type';
type SubjectProps = {
  label: keyof typeof SUBJECT_BUTTON_LABEL | string;
  // 학과 | 과목 | 교양 세부
  type: 'major' | 'subject' | 'elective';
  allCreditData?: ApiResponse;
  generalDetailData?: SubjectCreditListRes;
};

const SubjectDetailButton = ({
  label,
  type,
  allCreditData,
  generalDetailData,
}: SubjectProps) => {
  const navigation = useNavigation<GraduateCreditNavigationProp>();

  const handlePressButton = () => {
    navigation.navigate('graduate_credit_detail', {
      allCreditInfo: allCreditData as ApiResponse,
      type: SUBJECT_BUTTON_LABEL[label as keyof typeof SUBJECT_BUTTON_LABEL],
      generalCreditInfo: generalDetailData as SubjectCreditListRes,
    });
  };
  return (
    <S.SubjectButton
      type={type}
      disabled={type === 'major' || type == 'elective'}
      onPress={handlePressButton}>
      <S.ButtonText type={type}>{label}</S.ButtonText>
    </S.SubjectButton>
  );
};

export default SubjectDetailButton;
const S = {
  SubjectButton: styled.TouchableOpacity<{type: string}>`
    display: flex;
    height: 24px;
    border-radius: 8px;
    align-items: center;
    background-color: ${({type}) =>
      type === 'major'
        ? `${colors.primaryLighterAlt}`
        : `${colors.secondaryLight}`};
    padding: 3px 6px;
    align-self: flex-start;
  `,
  ButtonText: styled.Text<{type: string}>`
    margin: 0;
    height: 20px;
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: ${({type}) =>
      type === 'major' ? `${colors.primaryBrand}` : `${colors.grey190}`};
    line-height: 20px;
    white-space: nowrap;
  `,
};
