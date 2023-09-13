import styled from '@emotion/native';
import {Text} from 'react-native';
const UoslifeMeetingScreen = () => {
  return (
    <S.screenContainer>
      <Text>uoslife-meeting</Text>
    </S.screenContainer>
  );
};

export default UoslifeMeetingScreen;

const S = {
  screenContainer: styled.ScrollView`
    flex: 1;
  `,
};
