import React from 'react';
import {DevSettings, View} from 'react-native';

import {Button} from '@uoslife/design-system';

import {useSetAtom} from 'jotai';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Carousel from '../../components/molecules/carousel/Carousel';
import {accountFlowStatusAtom} from '../../atoms/account';

import {DEV_ACCESS_TOKEN, DEV_REFRESH_TOKEN} from '@env';
import storeToken from '../../utils/storeToken';
import {DeviceService} from '../../services/device';
import {storage} from '../../storage';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigators/RootStackNavigator';

const ONBOARDING_IMAGE_WIDTH = 328;
const ONBOARDING_IMAGE_HEIGHT = 493;
const ONBOARDING_CAROUSEL_AUTO_PLAY_INTERVAL_TIME = 4 * 1000;

const AccountMainScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const setAccountFlowStatus = useSetAtom(accountFlowStatusAtom);

  const handleTemporaryLoginButtonClick = async () => {
    storeToken(DEV_ACCESS_TOKEN, DEV_REFRESH_TOKEN);
    await DeviceService.setDeviceInfo();
    storage.set('user.isLoggedIn', true);
    navigation.navigate('Main');
    DevSettings.reload();
  };

  const handleClickAccountButton = async () => {
    setAccountFlowStatus(prev => {
      return {...prev, baseStatus: 'ONPROGRESS'};
    });
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
              indicator={'BOTTOM'}
              autoPlayIntervalTime={ONBOARDING_CAROUSEL_AUTO_PLAY_INTERVAL_TIME}
            />
          </View>
        </S.TopWrapper>
        <S.BottomWrapper>
          <Button
            label={'로그인(임시)'}
            isFullWidth
            onPress={handleTemporaryLoginButtonClick}
          />
          <Button
            label={'시작하기'}
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
