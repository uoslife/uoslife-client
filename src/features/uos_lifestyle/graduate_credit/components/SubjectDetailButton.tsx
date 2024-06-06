import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

type SubjectProps = {
  label: string;
  // 학과 태그 / 과목 태그
  type: 'major' | 'subject';
  handlePress?: () => void;
};

const SubjectDetailButton = ({label, type}: SubjectProps) => {
  // TODO: 라우팅 이후 navigate 작성
  // const naviagtion = useNavigation<>();
  return (
    <S.SubjectButton
      type={type}
      // TODO: api 추가 이후 함수 작성
      // onPress={() => handleButtonPress(label, type)}
      disabled={type === 'major'}>
      <S.ButtonText type={type}>{label}</S.ButtonText>
    </S.SubjectButton>
  );
};

export default SubjectDetailButton;
const S = {
  SubjectButton: styled.TouchableOpacity<{type: string}>`
    display: flex;
    width: ${({type}) => (type === 'major' ? '77px' : '68px')};
    height: 24px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    background-color: ${({type}) =>
      type === 'major'
        ? `${colors.primaryLighterAlt}`
        : `${colors.secondaryLight}`};
    padding: 2px 4px;
    gap: 10px;
  `,
  ButtonText: styled.Text<{type: string}>`
    width: 100%;
    margin: 0;
    height: 20px;
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    font-feature-settings: 'ss10' on;
    color: ${({type}) =>
      type === 'major' ? `${colors.primaryBrand}` : `${colors.grey190}`};
    line-height: 20px;
  `,
};
