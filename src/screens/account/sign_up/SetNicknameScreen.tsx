/* eslint-disable consistent-return */
import {useState} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import {Button, Txt} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useThrottle} from '@uoslife/react';

import Header from '../../../components/molecules/common/header/Header';
import Input from '../../../components/molecules/common/forms/input/Input';
import ServiceAgreementOverlay from '../../../components/molecules/screens/account/modalContents/ServiceAgreementOverlay';
import AdvertisingAgreementResult from '../../../components/molecules/screens/account/modalContents/AdvertisingAgreementResult';

import InputProps from '../../../components/molecules/common/forms/input/Input.type';
import useModal from '../../../hooks/useModal';
import UserService from '../../../services/user';
import useAccountFlow from '../../../hooks/useAccountFlow';
import customShowToast from '../../../configs/toast';
import useUserState from '../../../hooks/useUserState';
import useIsCurrentScreen from '../../../hooks/useIsCurrentScreen';
import NotificationService from '../../../services/notification';
import {ErrorResponseType} from '../../../api/services/type';
import {AccountAPI} from '../../../api/services/account';
import TopicService from '../../../services/topic';

const NICKNAME_MAX_LENGTH = 8;

type NicknameStatusMessageType =
  | 'BEFORE_CHECK'
  | 'CAN_USE'
  | 'CANNOT_USE'
  | 'DUPLICATED';

const SetNicknameScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const {changeAccountFlow} = useAccountFlow();
  const {setUserInfo} = useUserState();

  const [isMypage] = useIsCurrentScreen('Mypage_changeNickname');

  const [inputValue, setInputValue] = useState('');
  const [statusMessage, setStatusMessage] =
    useState<NicknameStatusMessageType>('BEFORE_CHECK');

  const [openBottomSheet, closeBottomSheet, BottomSheet] =
    useModal('BOTTOM_SHEET');
  const [openModal, , Modal] = useModal('MODAL');

  const handlePressSetNicknameButton = async () => {
    if (!isMypage) {
      openBottomSheet();
      return;
    }

    try {
      const updatedUserInfo = await AccountAPI.patchUserInfo({
        nickname: inputValue,
      });
      setUserInfo(updatedUserInfo);
      customShowToast('changeNickname');
      navigation.goBack();
    } catch (error) {
      customShowToast('changeNicknameError');
    }
  };

  const [isAdvertismentAgree, setIsAdvertismentAgree] = useState(false);
  const handleClickSubmitBottomSheetButton = useThrottle(
    async (isAdvertismentAgreeChecked: boolean) => {
      const isAuthorized =
        await NotificationService.checkPermissionIsAuthorizedStatus();
      setIsAdvertismentAgree(isAdvertismentAgreeChecked);
      try {
        const signUpRes = await AccountAPI.signUp({
          nickname: inputValue,
        });
        setStatusMessage('CAN_USE');
        await UserService.onRegister({
          accessToken: signUpRes.accessToken,
          refreshToken: signUpRes.refreshToken,
          setUserInfo,
          setNotLoggedIn: true,
        });
        // topic 구독
        if (!isAuthorized) return;
        await TopicService.setTopicWhenSignUp(isAdvertismentAgreeChecked);
        openModal();
      } catch (err) {
        const error = err as ErrorResponseType;
        switch (error.message) {
          case 'DUPLICATED_NICKNAME': {
            setStatusMessage('DUPLICATED');
            closeBottomSheet();
            return;
          }
          default:
            customShowToast('signUpError');
        }
      }
    },
  );

  const handleClickSubmitModalButton = () => {
    changeAccountFlow('PORTAL_ACCOUNT');
  };

  const onChangeText = (text: string) => {
    setInputValue(text);
    setStatusMessage('BEFORE_CHECK');
  };
  const onPressInputDelete = () => {
    setInputValue('');
  };

  const handleInputStatusMessage = (status: NicknameStatusMessageType) => {
    switch (status) {
      case 'BEFORE_CHECK':
        return '';
      case 'CANNOT_USE':
        return '사용할 수 없는 닉네임입니다.';
      case 'CAN_USE':
        return '사용 가능한 닉네임입니다.';
      case 'DUPLICATED':
        return '중복되는 닉네임입니다.';
    }
  };
  const handleInputStatus = (
    status: NicknameStatusMessageType,
  ): InputProps['status'] => {
    switch (status) {
      case 'BEFORE_CHECK':
        return 'default';
      case 'CANNOT_USE':
      case 'DUPLICATED':
        return 'error';
      case 'CAN_USE':
        return 'success';
    }
  };

  return (
    <>
      <S.screenContainer
        style={{paddingTop: insets.top, paddingBottom: insets.bottom + 8}}>
        <Header
          label={isMypage ? '닉네임 변경' : '닉네임 설정'}
          onPressBackButton={() => {
            if (isMypage) return navigation.goBack();
            changeAccountFlow('SMS_AUTHENTICATION');
          }}
        />
        <S.setNicknameContainer>
          <View style={{gap: 32}}>
            <View style={{gap: 8}}>
              <Txt
                label={
                  isMypage
                    ? '변경하실 닉네임을 입력해주세요.'
                    : '사용하실 닉네임을 입력해주세요.'
                }
                color="grey190"
                typograph="headlineMedium"
              />
              <Txt
                label={
                  '닉네임은 최대 8자로 설정 가능합니다.\n한글, 영문, 숫자, 특수기호를 이용해주세요.'
                }
                color="grey190"
                typograph="bodyMedium"
              />
            </View>
            <Input
              onChangeText={onChangeText}
              maxLength={NICKNAME_MAX_LENGTH}
              onPress={onPressInputDelete}
              value={inputValue}
              label="닉네임"
              statusMessage={handleInputStatusMessage(statusMessage)}
              status={handleInputStatus(statusMessage)}
              placeholder="여기에 입력하세요."
            />
          </View>
          <Button
            label="설정하기"
            onPress={handlePressSetNicknameButton}
            isEnabled={!!inputValue}
            isFullWidth
          />
        </S.setNicknameContainer>
      </S.screenContainer>
      <BottomSheet>
        <ServiceAgreementOverlay
          handleClickSubmitBottomSheetButton={
            handleClickSubmitBottomSheetButton
          }
        />
      </BottomSheet>
      <Modal>
        <AdvertisingAgreementResult
          isAgree={isAdvertismentAgree}
          handleClickSubmitModalButton={handleClickSubmitModalButton}
        />
      </Modal>
    </>
  );
};

export default SetNicknameScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
  setNicknameContainer: styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 28px 16px 0;
  `,
};
