import React from 'react';
import {useState} from 'react';
import ToggleSwitchProps from './ToggleSwitch.type';
import {Animated, StyleSheet, Pressable, Easing} from 'react-native';
import styled from '@emotion/native';

const ToggleSwitch = ({isOn, size, onToggle}: ToggleSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(isOn);
  const animatedValue = new Animated.Value(isEnabled ? 1 : 0);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const switchTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 14],
  });

  return (
    <Wrap size={size}>
      <Pressable onPress={onToggle}>
        <Pressable onPress={toggleSwitch}>
          <ToggleContainer
            style={{
              backgroundColor: isEnabled ? '#3A88F5' : '#B2B2B2',
            }}>
            <ToggleWheel
              style={[
                styles.toggleWheel,
                {transform: [{translateX: switchTranslateX}]},
              ]}
            />
          </ToggleContainer>
        </Pressable>
      </Pressable>
    </Wrap>
  );
};

export default ToggleSwitch;

const Wrap = styled.View<ToggleSwitchProps>`
  transform: ${props => (props.size === 'small' ? 'scale(1)' : 'scale(1.4)')};
  flex-direction: row;
  align-items: center;
`;

const ToggleContainer = styled.View`
  width: 31px;
  height: 16px;
  padding-left: 2px;
  border-radius: 15px;
  justify-content: center;
`;

const ToggleWheel = styled(Animated.View)`
  width: 13px;
  height: 13px;
  background-color: #ffffff;
  border-radius: 12.5px;
`;

const styles = StyleSheet.create({
  toggleWheel: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
