import styled, {css} from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  Pressable,
  Linking,
} from 'react-native';
import OnboardingSlideGuide from '../../screens/account/onboarding/OnboardingSlideGuide';
import AnalyticsService from '../../../../services/analytics';
import {
  DEFAULT_LOG_EVENT_NAME,
  LogEventNameType,
} from '../../../../configs/analytics';

const INIT_DISPLAY_INDEX = 1;

type IndicatorType = 'NONE' | 'TOPRIGHT' | 'BOTTOM';
type CarouselData = {uri: any; link?: string; id?: number};

type CarouselProps = {
  imageWidth: number;
  imageHeight: number;
  carouselData: Array<CarouselData>;
  indicator: IndicatorType;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
  logEventName?: Extract<LogEventNameType, 'banner'>;
};

const Carousel = ({
  imageWidth,
  imageHeight,
  carouselData,
  indicator = 'NONE',
  autoPlay = true,
  autoPlayIntervalTime = 3000,
  logEventName,
}: CarouselProps) => {
  const carouselRef = useRef<FlatList>(null);
  const [currentDisplayIndex, setCurrentDisplayIndex] =
    useState(INIT_DISPLAY_INDEX);
  const [isMomentum, setIsMomentum] = useState(false);

  const carouselDataLength = carouselData.length;

  const setIndex = useCallback((index: number) => {
    carouselRef.current?.scrollToIndex({
      animated: true,
      index,
    });
  }, []);

  const onMomentumScrollBegin = () => {
    setIsMomentum(true);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentContentOffset = e.nativeEvent.contentOffset.x;
    const carouselWidth = e.nativeEvent.layoutMeasurement.width;
    setCurrentDisplayIndex(
      Math.floor(currentContentOffset / carouselWidth) + 1,
    );
    setIsMomentum(false);
    if (!isMomentum) return;
    if (currentDisplayIndex === carouselDataLength) setIndex(0);
  };

  useEffect(() => {
    if (!autoPlay || isMomentum) return () => null;

    const carouselInterval = setInterval(() => {
      if (currentDisplayIndex === carouselDataLength) {
        setIndex(0);
        setCurrentDisplayIndex(1);
        return;
      }
      setIndex(currentDisplayIndex);
      setCurrentDisplayIndex(prev => prev + 1);
    }, autoPlayIntervalTime);
    return () => clearInterval(carouselInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDisplayIndex, setIndex]);

  return (
    <S.CarouselContainer indicator={indicator}>
      {indicator === 'TOPRIGHT' && (
        <S.CarouselOrderMarker>
          <Txt
            label={`${currentDisplayIndex} / ${carouselDataLength}`}
            color="white"
            typograph="labelSmall"
          />
        </S.CarouselOrderMarker>
      )}
      <S.CarouselWrapper
        ref={carouselRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        data={carouselData}
        renderItem={({item}) => {
          const {uri, link, id} = item as CarouselData;
          const handleOnPressCarousel = async () => {
            if (!link) return;
            Promise.all([
              await Linking.openURL(link),
              await AnalyticsService.logAnalyticsEvent(
                logEventName ?? DEFAULT_LOG_EVENT_NAME,
                {
                  bannerId: id ?? DEFAULT_LOG_EVENT_NAME,
                  bannerLinkUrl: link,
                },
              ),
            ]);
          };
          return (
            <Pressable onPress={handleOnPressCarousel}>
              <S.CarouselImage
                style={{width: imageWidth, height: imageHeight}}
                source={uri}
              />
            </Pressable>
          );
        }}
        onScrollToIndexFailed={() => {}}
      />
      {indicator === 'BOTTOM' && (
        <OnboardingSlideGuide
          carouselDataLength={carouselDataLength}
          currentImageLocation={currentDisplayIndex - 1}
        />
      )}
    </S.CarouselContainer>
  );
};

export default Carousel;

const S = {
  CarouselContainer: styled.View<Pick<CarouselProps, 'indicator'>>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${({indicator}) =>
      indicator === 'BOTTOM' &&
      css`
        gap: 16px;
      `}
    box-sizing: border-box;
  `,
  CarouselWrapper: styled.FlatList`
    position: relative;
    border-radius: 20px;
  `,
  CarouselImage: styled.Image`
    object-fit: fill;
  `,
  CarouselOrderMarker: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 11px;
    right: 12px;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.2);
    z-index: 3;
    padding: 4px 8px;
  `,
};
