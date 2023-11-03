import styled, {css} from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {useCallback, useEffect, useRef, useState} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent, FlatList} from 'react-native';
import OnboardingSlideGuide from '../account/onboarding/OnboardingSlideGuide';

type indicatorType = 'NONE' | 'TOPRIGHT' | 'BOTTOM';

type CarouselProps = {
  imageWidth: number;
  imageHeight: number;
  imageUrls: Array<{uri: string}>;
  indicator: indicatorType;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
};

const Carousel = ({
  imageWidth,
  imageHeight,
  imageUrls,
  indicator = 'NONE',
  autoPlay = true,
  autoPlayIntervalTime = 3000,
}: CarouselProps) => {
  const carouselRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const imageUrlsLength = imageUrls.length;

  const setIndex = useCallback((index: number) => {
    carouselRef.current?.scrollToIndex({
      animated: true,
      index,
    });
  }, []);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentContentOffset = e.nativeEvent.contentOffset.x;
    const imageWidth = e.nativeEvent.layoutMeasurement.width;

    setCurrentIndex(Math.floor(currentContentOffset / imageWidth + 1));
    if (currentIndex === imageUrlsLength) setIndex(0);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const carouselInterval = setInterval(() => {
      if (currentIndex === imageUrlsLength) {
        setIndex(0);
        return;
      }
      setIndex(currentIndex);
    }, autoPlayIntervalTime);
    return () => clearInterval(carouselInterval);
  }, [currentIndex]);

  return (
    <S.CarouselContainer indicator={indicator}>
      {indicator === 'TOPRIGHT' && (
        <S.CarouselOrderMarker>
          <Txt
            label={`${currentIndex} / ${imageUrlsLength}`}
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
        onMomentumScrollEnd={onMomentumScrollEnd}
        data={Array.from({length: imageUrlsLength})}
        renderItem={({item}) => {
          return (
            <S.CarouselImage
              style={{width: imageWidth, height: imageHeight}}
              source={require('../../../assets/images/banner_sample_img.png')}
            />
          );
        }}
      />
      {indicator === 'BOTTOM' && (
        <OnboardingSlideGuide currentImageLocation={currentIndex - 1} />
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
