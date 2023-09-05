import React, {useEffect} from 'react';
import ToggleSwitchProps from './ToggleSwitch.type';
import {Animated, StyleSheet, Pressable, Easing, Platform, View} from 'react-native';
import styled from '@emotion/native';

const ToggleSwitch = ({isOn, onToggle}: ToggleSwitchProps) => {
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const animatedValue = new Animated.Value(isOn ? 0 : 1);

  const switchTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  });

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainerWrapper style={styles.toggleContainer}>
        <ToggleContainer style={{
            backgroundColor: isOn ? '#3A88F5' : '#B2B2B2',
          }}>      
          <ToggleWheel
            style={[
              styles.toggleWheel,
              {transform: [{translateX: switchTranslateX}]},
            ]}
          />  
        </ToggleContainer>
        </ToggleContainerWrapper>
      </Pressable>
    </Wrap>
  );
};

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToggleContainer = styled.View`
  width: 28px;
  height: 12px;
  border-radius: 35px;
  justify-content: center;
`;

const ToggleContainerWrapper=styled.View`
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
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
      },
      android: {
        elevation: 1,
      },
    }),
  },
});

export default ToggleSwitch;
