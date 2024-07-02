import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {ApiResponse} from '../types';
import {SUBJECT_BUTTON_LABEL} from '../configs/constants';
import {GraduateCreditNavigationProp} from '../navigators/types/graduateCredit';

type SubjectProps = {
  label: keyof typeof SUBJECT_BUTTON_LABEL | string;
  // 학과 태그 / 과목 태그
  type: 'major' | 'subject';
  data?: ApiResponse;
  handlePress?: () => void;
};

const SubjectDetailButton = ({label, type, data}: SubjectProps) => {
  const navigation = useNavigation<GraduateCreditNavigationProp>();

  const handlePressButton = () => {
    navigation.navigate('graduate_credit_detail', {
      Props: data as ApiResponse,
      type: SUBJECT_BUTTON_LABEL[label as keyof typeof SUBJECT_BUTTON_LABEL],
    });
  };
  return (
    <S.SubjectButton
      type={type}
      disabled={type === 'major'}
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
    margin
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
