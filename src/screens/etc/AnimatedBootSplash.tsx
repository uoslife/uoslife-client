import {useAtomValue, useSetAtom} from 'jotai';
import {useCallback, useState} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {css} from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import bootSplashVisibleAtom from '../../store/app/bootSplashVisible';
import syncProgressAtom from '../../store/app/codepush';
import ProgressBar from '../../components/molecules/common/progress_bar/ProgressBar';

const AnimatedBootSplash = () => {
  const setAnimatedBootSplashvisible = useSetAtom(bootSplashVisibleAtom);
  const {isUpdate, syncProgress} = useAtomValue(syncProgressAtom);

  // style
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));

  const {container, logo} = BootSplash.useHideAnimation({
    manifest: require('../../bootsplash/assets/bootsplash_manifest.json'),

    logo: require('../../bootsplash/assets/bootsplash_logo.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      if (isUpdate) return;

      const {height} = Dimensions.get('window');

      Animated.stagger(250, [
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: height,
        }),
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 150,
        delay: 350,
      }).start(() => {
        setAnimatedBootSplashvisible(false);
      });
    },
  });

  const calculateReceivedRate = useCallback(
    (recieved: number, total: number) => Math.floor((recieved / total) * 100),
    [],
  );

  return (
    <Animated.View {...container} style={[container.style, {opacity}]}>
      <Animated.Image
        {...logo}
        style={[logo.style, {transform: [{translateY}]}]}
      />
      {isUpdate && syncProgress && (
        <View
          style={css`
            width: 100%;
            padding: 42px 16px 0;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          `}>
          <Txt
            label="안정적인 사용을 위해 앱을 업데이트 중이에요."
            color="black"
            typograph="labelLarge"
          />
          <ProgressBar
            useRate={calculateReceivedRate(
              syncProgress.receivedBytes,
              syncProgress.totalBytes,
            )}
          />
        </View>
      )}
    </Animated.View>
  );
};
export default AnimatedBootSplash;
