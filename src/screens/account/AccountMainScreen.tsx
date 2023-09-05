import React, {useState} from 'react';

import {Button} from '@uoslife/design-system';

import {useSetAtom} from 'jotai';
import {accountFlowStatusAtom} from '../../atoms/account';
import styled from '@emotion/native';
import OnboardingSlideGuide from '../../components/molecules/account/onboarding/OnboardingSlideGuide';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeSyntheticEvent, NativeScrollEvent, View} from 'react-native';
import {CoreAPI} from '../../api/services';
import setTokenWhenLogin from '../../utils/setTokenWhenLogin';

const ONBOARDING_IMAGE_WIDTH = 328;

const AccountMainScreen = () => {
  const insets = useSafeAreaInsets();
  const setAccountStatus = useSetAtom(accountFlowStatusAtom);
  const handleClickAccountButton = async () => {
    // 임시 코드
    const loginRes = await CoreAPI.login({phone: '01012345678'});
    console.log(loginRes);
    if (loginRes.statusCode === 201) {
      setTokenWhenLogin(loginRes.accessToken, loginRes.refreshToken);
    }
    setAccountStatus(prev => {
      return {...prev, baseStatus: 'ONPROGRESS'};
    });
  };

  // image scrolling
  const [currentIndex, setCurrentIndex] = useState(0);
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentContentOffset = e.nativeEvent.contentOffset.x;
    setCurrentIndex(currentContentOffset / ONBOARDING_IMAGE_WIDTH);
  };
  return (
    <S.Container style={{marginTop: insets.top}}>
      <S.TopWrapper>
        <View style={{width: ONBOARDING_IMAGE_WIDTH}}>
          <S.OnboardingImageWrapper
            horizontal
            pagingEnabled
            onMomentumScrollEnd={onMomentumScrollEnd}
            showsHorizontalScrollIndicator={false}>
            <S.OnboardingImage
              source={require('../../assets/images/banner_sample_img.png')}
            />
            <S.OnboardingImage
              source={require('../../assets/images/banner_sample_img.png')}
            />
            <S.OnboardingImage
              source={require('../../assets/images/banner_sample_img.png')}
            />
          </S.OnboardingImageWrapper>
        </View>
        <OnboardingSlideGuide currentImageLocation={currentIndex} />
      </S.TopWrapper>
      <S.BottomWrapper>
        <Button
          label={'로그인'}
          isFullWidth
          onPress={handleClickAccountButton}
        />
        <Button
          label={'회원가입'}
          isFullWidth
          variant="outline"
          onPress={handleClickAccountButton}
        />
      </S.BottomWrapper>
    </S.Container>
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
