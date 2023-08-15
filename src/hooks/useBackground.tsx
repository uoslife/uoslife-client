import {useState} from 'react';
import Background from '../components/background/Background';

const useBackground = () => {
  const [bgActivated, setBgActivated] = useState<boolean>(false);
  const [bgZIndex, setBgZIndex] = useState<number>(8);
  const [bgDark, setBgDark] = useState<boolean>(false);
  const [bgOnPress, setBgOnPress] = useState<() => void>(() => {});

  return {
    Background: bgActivated
      ? () => (
          <Background bgDark={bgDark} onPress={bgOnPress} zIndex={bgZIndex} />
        )
      : () => null,
    activateBg: setBgActivated(true),
    deactivateBg: setBgActivated(false),
    setBgOnPress,
    setBgZIndex,
    setBgDark,
  };
};

export default useBackground;
