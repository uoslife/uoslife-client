import {useEffect, useState} from 'react';
import Background from '../components/molecules/overlay/Background';

const useBackground = () => {
  const [bgZIndex, setBgZIndex] = useState<number>(3);
  const [bgDark, setBgDark] = useState<boolean>(true); // 어두운 배경이 기본값
  const [bgActivated, setBgActivated] = useState<boolean>(false);
  const [bgOnPress, setBgOnPress] = useState<() => void>(() => {});

  return {
    Background: () =>
      bgActivated && (
        <Background bgDark={bgDark} onPress={bgOnPress} zIndex={bgZIndex} />
      ),
    setBgOnPress,
    setBgZIndex,
    setBgDark,
    activateBg: () => {
      setBgActivated(true);
    },
    deactivateBg: () => {
      setBgActivated(false);
    },
  };
};

export default useBackground;
