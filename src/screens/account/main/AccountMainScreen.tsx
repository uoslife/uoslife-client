import React from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import {Button} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import {DEV_ACCESS_TOKEN, DEV_REFRESH_TOKEN} from '@env';

import Carousel from '../../../components/molecules/common/carousel/Carousel';

import useAccountFlow from '../../../hooks/useAccountFlow';

const ONBOARDING_IMAGE_WIDTH = 328;
const ONBOARDING_IMAGE_HEIGHT = 493;
const ONBOARDING_CAROUSEL_AUTO_PLAY_INTERVAL_TIME = 4 * 1000;

const AccountMainScreen = () => {
  const insets = useSafeAreaInsets();
  const {changeAccountFlow} = useAccountFlow();

  const handleClickAccountButton = async () => {
    changeAccountFlow({commonFlowName: 'SIGNIN'});
  };

  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <S.Container>
        <S.TopWrapper>
          <View style={{width: ONBOARDING_IMAGE_WIDTH}}>
            <Carousel
              imageWidth={ONBOARDING_IMAGE_WIDTH}
              imageHeight={ONBOARDING_IMAGE_HEIGHT}
              imageUrls={[{uri: ''}, {uri: ''}, {uri: ''}]}
              indicator="BOTTOM"
              autoPlayIntervalTime={ONBOARDING_CAROUSEL_AUTO_PLAY_INTERVAL_TIME}
            />
          </View>
        </S.TopWrapper>
        <S.BottomWrapper>
          <Button
            label="시작하기"
            isFullWidth
            variant="outline"
            onPress={handleClickAccountButton}
          />
        </S.BottomWrapper>
      </S.Container>
    </View>
  );
};

export default AccountMainScreen;

const S = {
  Container: styled.View`
    padding: 16px 16px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  TopWrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  `,
  BottomWrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  OnboardingImageWrapper: styled.ScrollView`
    display: flex;
    flex-direction: row;
  `,
  OnboardingImage: styled.Image`
    border-radius: 20px;
    object-fit: cover;
  `,
};
