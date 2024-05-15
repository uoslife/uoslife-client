import styled from '@emotion/native';
import {colors, Icon, Txt} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RootNavigationProps} from '../../navigators/RootStackNavigator';
import useUserState from '../../hooks/useUserState';
import useModal from '../../hooks/useModal';

const RedirectUoslifeMeetingScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(false);
  const [openModal, closeModal, Modal] = useModal('MODAL');
  const {user} = useUserState();

  useEffect(() => {
    const {isVerified} = user || {};
    setIsPortalAuthenticated(isVerified ?? false);
  }, [user]);

  const handleRedirectUoslifeMeeting = () => {
    if (isPortalAuthenticated) navigation.navigate('UoslifeMeeting');
    else openModal();
  };

  return (
    <>
      <S.screenContainer>
        <S.uoslifeBrandLogo
          source={require('../../assets/images/uoslifeBrandLogo_pink.png')}
        />
        <S.titleContainer>
          <S.confettiImage
            source={require('../../assets/images/confetti.png')}
          />
          <Txt
            label="시대팅4가 출시되었어요"
            color="grey190"
            typograph="headlineMedium"
          />
          <S.confettiImage
            source={require('../../assets/images/confetti.png')}
          />
        </S.titleContainer>
        <S.roundButton onPress={handleRedirectUoslifeMeeting}>
          <Txt
            label="참여하기"
            color="primaryBrand"
            typograph="headlineMedium"
          />
        </S.roundButton>
      </S.screenContainer>
      <Modal>
        <S.ModalContainer>
          <S.ModalClearButton onPress={closeModal}>
            <Icon name="clear" width={24} height={24} />
          </S.ModalClearButton>
          <View style={{gap: 8, alignItems: 'center'}}>
            <Txt
              label="등록된 모바일학생증이 없습니다."
              color="grey190"
              typograph="titleLarge"
            />
            <View style={{alignItems: 'center'}}>
              <Txt
                label="포털 연동 후, 시대팅을 이용해보세요."
                color="grey190"
                typograph="bodyLarge"
              />
            </View>
            <S.ModalRoundButton
              onPress={() =>
                navigation.navigate('StudentId_PortalAuthentication')
              }>
              <Txt
                label="포털 연동하러가기"
                color="white"
                typograph="titleSmall"
              />
            </S.ModalRoundButton>
          </View>
        </S.ModalContainer>
      </Modal>
    </>
  );
};

export default RedirectUoslifeMeetingScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 30px;
  `,
  roundButton: styled.Pressable`
    padding: 12px 24px;
    border: 1px solid ${colors.primaryBrand};
    border-radius: 100px;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
  `,
  uoslifeBrandLogo: styled.Image`
    width: 90%;
    height: 16%;
  `,
  titleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  `,
  confettiImage: styled.Image`
    width: 24px;
    height: 24px;
  `,
  ModalContainer: styled.View`
    padding: 70px 20px 40px 20px;
  `,
  ModalClearButton: styled.TouchableOpacity`
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 6px;
  `,
  ModalRoundButton: styled.Pressable`
    margin-top: 20px;
    padding: 14px 16px;
    background-color: ${colors.primaryBrand};
    border-radius: 100px;
    flex-direction: row;
    width: 80%;
    align-items: center;
    justify-content: center;
  `,
};
