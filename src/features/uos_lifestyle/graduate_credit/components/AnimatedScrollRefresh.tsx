import {View, PanResponder, StyleSheet} from 'react-native';
import styled from '@emotion/native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {colors, Txt} from '@uoslife/design-system';
import AnimatedPlayer from 'react-native-animated-webp';

type AnimatedScrollRefreshComponentProps = {
  children: React.ReactNode;
  onScroll: () => void;
};

const AnimatedScrollRefreshComponent = ({
  children,
  onScroll,
}: AnimatedScrollRefreshComponentProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);

  useEffect(() => {
    pullDownPosition.value = withTiming(0);
  }, []);

  const onRefresh = (done: () => void) => {
    setIsRefreshing(true);
    onScroll();
    setTimeout(() => {
      setIsRefreshing(false);
      done();
    }, 3000);
  };

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 70 : 0, {
      duration: 180,
    });

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;

      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, {duration: 180});
      };

      onRefresh(onRefreshComplete);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });
  const panResponderRef = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy >= 0,
      onPanResponderMove: (event, gestureState) => {
        const maxDistance = 70;
        pullDownPosition.value = Math.max(
          Math.min(maxDistance, gestureState.dy),
          0,
        );
        if (
          pullDownPosition.value >= maxDistance / 2 &&
          !isReadyToRefresh.value
        ) {
          isReadyToRefresh.value = true;
        }

        if (
          pullDownPosition.value < maxDistance / 2 &&
          isReadyToRefresh.value
        ) {
          isReadyToRefresh.value = false;
        }
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    }),
  );
  const pullDownStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: pullDownPosition.value,
        },
      ],
    };
  });
  const refreshContainerStyles = useAnimatedStyle(() => {
    return {
      height: pullDownPosition.value,
    };
  });

  const refreshIconStyles = useAnimatedStyle(() => {
    const scale = Math.min(1, Math.max(0, pullDownPosition.value / 40));

    return {
      opacity: isRefreshing
        ? withDelay(100, withTiming(0, {duration: 20}))
        : Math.max(0, pullDownPosition.value) / 50,
      transform: [
        {
          scaleX: isRefreshing ? withTiming(0.25, {duration: 120}) : scale,
        },
        {
          scaleY: scale,
        },
      ],
    };
  }, [isRefreshing]);

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      margin: 0,
      padding: 0,
    },
    refreshContainer: {
      position: 'absolute',
      gap: 5,
      top: -8,
      left: 0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.grey20,
    },
    refreshIcon: {
      width: 28,
      height: 28,
      borderRadius: 18,
      objectFit: 'contain',
    },
  });

  return (
    <View style={styles.root} pointerEvents={isRefreshing ? 'none' : 'auto'}>
      <Animated.View style={[styles.refreshContainer, refreshContainerStyles]}>
        {!isRefreshing ? (
          <Animated.Image
            source={require('../assets/scroll_refresh.png')}
            style={[styles.refreshIcon, refreshIconStyles]}
          />
        ) : (
          <AnimatedPlayer
            thumbnailSource={require('../assets/animation/graduate_credit_scroll_refresh.gif')}
            animatedSource={require('../assets/animation/graduate_credit_scroll_refresh.gif')}
            style={{width: 60, height: 60}}
          />
        )}
        <Txt
          label={
            isRefreshing
              ? '최신 정보를 갖고 오고 있습니다'
              : '아래로 당겨서 리프레쉬'
          }
          color="grey130"
          typograph="labelLarge"
        />
      </Animated.View>
      <Animated.View
        style={[{flex: 1}, pullDownStyles]}
        {...panResponderRef.current.panHandlers}>
        <S.GraduateCreditScreen
          onScroll={scrollHandler}
          scrollEventThrottle={16}>
          {children}
        </S.GraduateCreditScreen>
      </Animated.View>
    </View>
  );
};

export default AnimatedScrollRefreshComponent;

const S = {
  GraduateCreditScreen: styled(Animated.ScrollView)`
    gap: 24px;
    padding: 30px 16px 120px 16px;
    flex: 1;
  `,
};
