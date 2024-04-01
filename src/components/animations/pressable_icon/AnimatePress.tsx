// import {useMemo} from 'react';
import {Pressable, PressableProps} from 'react-native';
// import {
//   MotiPressable,
//   MotiPressableProps,
//   MotiPressableInteractionState,
// } from 'moti/interactions';

type AnimateVariant = 'scale_up' | 'scale_up_2' | 'scale_down';
type Props = {variant: AnimateVariant} & PressableProps;

const AnimatePress = ({children, variant, ...props}: Props) => {
  // const scaleUp = useMemo(
  //   () =>
  //     ({pressed}: MotiPressableInteractionState) => {
  //       'worklet';

  //       return {
  //         scale: pressed ? 1.2 : 1,
  //       };
  //     },
  //   [],
  // );
  // const scaleUp2 = useMemo(
  //   () =>
  //     ({pressed}: MotiPressableInteractionState) => {
  //       'worklet';

  //       return {
  //         scale: pressed ? 1.1 : 1,
  //       };
  //     },
  //   [],
  // );
  // const scaleDown = useMemo(
  //   () =>
  //     ({pressed}: MotiPressableInteractionState) => {
  //       'worklet';

  //       return {
  //         scale: pressed ? 0.96 : 1,
  //       };
  //     },
  //   [],
  // );

  // const switchVariant = () => {
  //   switch (variant) {
  //     case 'scale_up':
  //     return scaleUp;
  //     case 'scale_up_2':
  //       return scaleUp2;
  //     case 'scale_down':
  //       return scaleDown;
  //   }
  // };
  return (
    <Pressable
      {...props}
      //  animate={switchVariant()}
    >
      {children}
    </Pressable>
  );
};

export default AnimatePress;
