import {useEffect, useMemo} from 'react';
import {Animated, StyleSheet, Pressable, Easing, Platform} from 'react-native';
import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import ToggleSwitchProps from './ToggleSwitch.type';

const ToggleSwitch = ({isOn, onToggle, disable}: ToggleSwitchProps) => {
  const animatedValue = useMemo(() => new Animated.Value(isOn ? 0 : 1), [isOn]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, isOn]);

  const switchTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  });

  return (
    <Pressable onPress={onToggle}>
      <Wrap>
        <ToggleContainerWrapper style={styles.toggleContainer}>
          <ToggleContainer
            style={{
              // eslint-disable-next-line no-nested-ternary
              backgroundColor: disable
                ? colors.grey40
                : isOn
                ? colors.primaryBrand
                : colors.grey60,
            }}>
            <ToggleWheel
              style={[
                styles.toggleWheel,
                {transform: [{translateX: switchTranslateX}]},
              ]}
            />
          </ToggleContainer>
        </ToggleContainerWrapper>
      </Wrap>
    </Pressable>
  );
};

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
  width: 36px;
  height: 36px;
`;

const ToggleContainer = styled.View`
  width: 28px;
  height: 12px;
  border-radius: 35px;
  justify-content: center;
`;

const ToggleContainerWrapper = styled.View`
  width: 28px;
  height: 12px;
  border-radius: 35px;
  justify-content: center;
`;

const ToggleWheel = styled(Animated.View)`
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 23px;
`;

const styles = StyleSheet.create({
  toggleWheel: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        backgroundColor: colors.white,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  toggleContainer: {
    width: 28,
    height: 12,
    borderRadius: 35,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 2,
        backgroundColor: colors.white,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});

export default ToggleSwitch;
