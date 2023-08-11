import React from 'react';
import {useState} from 'react';
import ToggleSwitchProps from './ToggleSwitch.type';
import {Animated, StyleSheet, Pressable, Easing} from 'react-native';
import styled from '@emotion/native';

const ToggleSwitch = ({
  isOn,
  onColor,
  offColor,
  onToggle,
}: ToggleSwitchProps) => {
  const [aniValue, setAniValue] = useState(new Animated.Value(0));
  const color = isOn ? onColor : offColor;

  const moveSwitchToggle = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  Animated.timing(aniValue, {
    toValue: isOn ? 1 : 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainer style={{backgroundColor: color}}>
          <ToggleWheel
            style={[
              styles.toggleWheel,
              {transform: [{translateX: moveSwitchToggle}]},
            ]}
          />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default ToggleSwitch;

// const getSize = (size: 'string') => {
//   switch (size) {
//     case 'small':
//       return {
//         width: 40,
//         padding: 10,
//         circleWidth: 15,
//         circleHeight: 15,
//         translateX: 22,
//       };
//     case 'large':
//       return {
//         width: 70,
//         padding: 20,
//         circleWidth: 30,
//         circleHeight: 30,
//         translateX: 38,
//       };
//     default:
//       return {
//         width: 46,
//         padding: 12,
//         circleWidth: 18,
//         circleHeight: 18,
//         translateX: 26,
//       };
//   }
// };

const Wrap = styled.View`
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
