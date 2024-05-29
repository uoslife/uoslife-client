import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {Button, Txt} from '@uoslife/design-system';
import {TouchableOpacity} from 'react-native';

type SubjectProps = {
  label: string;
  type: 'major' | 'subject';
};

const SubjectDetailButton = ({label, type}: SubjectProps) => {
  // const naviagtion = useNavigation<>();
  const handleButtonPress = ({label}: SubjectProps) => {
    // navigation.navigate(); // 차후 라우팅 후 추가
  };
  return (
    <S.SubjectButton
      type={type}
      onPress={type === 'major' ? undefined : handleButtonPress}
      disabled={type === 'major'}>
      <Txt
        label={label}
        color={type === 'major' ? 'primaryBrand' : 'black'}
        typograph={type === 'major' ? 'bodySmall' : 'bodySmall'}
        style={{fontWeight: 'bold'}}
      />
    </S.SubjectButton>
  );
};

export default SubjectDetailButton;
const S = {
  SubjectButton: styled.TouchableOpacity<{type: string}>`
    width: 65px;
    height: 24px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    background-color: ${({type}) => (type === 'major' ? '#E9F3FF' : '#FAE396')};
  `,
};
