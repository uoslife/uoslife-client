import React from 'react';
import {useState} from 'react';
import ToggleSwitchProps from './ToggleSwitch.type';
import {Animated, StyleSheet, Pressable} from 'react-native';
import styled from '@emotion/native';

const ToggleSwitch = ({size}: ToggleSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const animatedValue = new Animated.Value(isEnabled ? 1 : 0);

  const onToggle = () => {
    setIsEnabled(!isEnabled);
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const switchTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <Wrap size={size}>
      <Pressable onPress={onToggle}>
        <ToggleContainer
          style={{
            backgroundColor: isEnabled ? 'green' : 'gray',
          }}>
          <ToggleWheel
            style={[
              styles.toggleWheel,
              {transform: [{translateX: switchTranslateX}]},
            ]}
          />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default ToggleSwitch;

const Wrap = styled.View`
  transform: ${props => (props.size === 'small' ? 'scale(1)' : 'scale(2)')};
  flex-direction: row;
  align-items: center;
`;

const ToggleContainer = styled.View`
  width: 50px;
  height: 30px;
  padding-left: 2px;
  border-radius: 15px;
  justify-content: center;
`;

const ToggleWheel = styled(Animated.View)`
  width: 25px;
  height: 25px;
  background-color: white;
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
