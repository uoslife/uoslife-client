import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Icon, IconsNameType, Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {TabScreenItemType} from '../../../../navigators/RootBottomTapNavigator';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';

const {width} = Dimensions.get('screen');

const BottomTabBar = ({
  tabs,
  state,
  navigation,
}: {tabs: TabScreenItemType[]} & BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  return (
    <BottomTabWrapper
      style={{paddingBottom: insets.bottom + 8, paddingHorizontal: width / 20}}>
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

        const switchIcon = (icon: IconsNameType) => {
          switch (icon) {
            case 'tab_student_id':
              return (
                <Icon
                  color={isFocused ? 'primaryBrand' : 'grey90'}
                  name={icon}
                  width={20}
                  height={16}
                />
              );
            case 'tab_mypage':
              return (
                <Icon
                  color={isFocused ? 'primaryBrand' : 'grey90'}
                  name={icon}
                  width={16.3}
                  height={17.5}
                />
              );
            default:
              return (
                <Icon
                  color={isFocused ? 'primaryBrand' : 'grey90'}
                  name={icon}
                  width={18}
                  height={18}
                />
              );
          }
        };

        return (
          <AnimatePress
            key={label}
            onPress={onPress}
            variant="scale_up_2"
            style={{
              alignItems: 'center',
              width: 60,
              gap: 2,
            }}>
            {switchIcon(icon)}
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
  padding-top: 10px;
  flex-direction: row;
  background-color: ${colors.white};
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border-color: ${colors.grey40};
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
`;
