import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {Dimensions} from 'react-native';
import styled from '@emotion/native';
import {TabScreenItemType} from '../../../../navigators/RootBottomTapNavigator';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';
import boxShadowStyle from '../../../../styles/boxShadow';

const tabWidth = Dimensions.get('window').width - 80;

const BottomTabBar = ({
  tabs,
  state,
  navigation,
}: {tabs: TabScreenItemType[]} & BottomTabBarProps) => {
  return (
    <BottomTabWrapper
      style={{
        ...boxShadowStyle.bottomTapShadow,
        width: tabWidth,
      }}>
      {state.routes.map((route, index) => {
        const {label, icon} = tabs[index];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatePress
            key={label}
            onPress={onPress}
            variant="scale_up"
            style={{alignItems: 'center', width: 54, gap: 2}}>
            <Icon
              color={isFocused ? 'primaryBrand' : 'grey90'}
              name={icon}
              width={24}
              height={24}
            />
            <Txt
              label={label}
              color={isFocused ? 'primaryBrand' : 'grey90'}
              typograph="labelMedium"
            />
          </AnimatePress>
        );
      })}
    </BottomTabWrapper>
  );
};
export default BottomTabBar;

const BottomTabWrapper = styled.View`
  position: absolute;
  bottom: 0;
  height: 60px;
  border-radius: 60px;
  padding: 10px 50px;
  margin: 0 40px 40px;
  flex-direction: row;
  background-color: ${colors.white};
  justify-content: space-between;
  align-items: center;
`;
