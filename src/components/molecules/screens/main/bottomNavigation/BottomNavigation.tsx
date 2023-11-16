import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconWithText from '../../../common/iconWithText/IconWithText';
import {RootNavigationProps} from '../../../../../navigators/RootStackNavigator';

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();
  const {navigate} = useNavigation<RootNavigationProps>();
  return (
    <S.BottomNavigationWrapper bottomInsets={insets.bottom}>
      <IconWithText iconName="menu" text="시대생활" isClick />
      <IconWithText iconName="studentId" text="학생증" isClick={false} />
      <IconWithText iconName="person" text="채팅" isClick={false} />
    </S.BottomNavigationWrapper>
  );
};

export default BottomNavigation;

const S = {
  BottomNavigationWrapper: styled.View<{bottomInsets: number}>`
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    bottom: ${({bottomInsets}) => `${bottomInsets + 12}px`};
    width: 300px;
    height: 60px;
    padding: 10px 40px;
    gap: 16px;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
    background: #fff;
    /* box-shadow: 0px 4px 16px 0px rgba(89, 89, 89, 0.26); */
  `,
  NavigationButton: styled.Pressable`
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  `,
};
