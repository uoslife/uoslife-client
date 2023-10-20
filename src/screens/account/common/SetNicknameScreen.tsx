import styled from '@emotion/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useAtom, useAtomValue} from 'jotai';
import {
  accountFlowStatusAtom,
  existedAccountInfoAtom,
} from '../../../atoms/account';
import {Button, Txt} from '@uoslife/design-system';
import Header from '../../../components/header/Header';
import Input from '../../../components/forms/input/Input';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageProfileStackParamList} from '../../../navigators/MyPageStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {CoreAPI} from '../../../api/services';
import InputProps from '../../../components/forms/input/Input.type';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ErrorResponseType} from '../../../api/services/type';
import useModal from '../../../hooks/useModal';
import storeToken from '../../../utils/storeToken';
import ServiceAgreementOverlay from '../../../components/molecules/account/modalContents/ServiceAgreementOverlay';
import AdvertisingAgreementResult from '../../../components/molecules/account/modalContents/AdvertisingAgreementResult';
import {DeviceService} from '../../../services/device';
import {UserService} from '../../../services/user';

export type SetNickNameScreenProps = StackScreenProps<
  MyPageProfileStackParamList,
  'Mypage_changeNickname'
>;

type NicknameStatusMessageType =
  | 'BEFORE_CHECK'
  | 'CAN_USE'
  | 'CANNOT_USE'
  | 'DUPLICATED';

const SetNicknameScreen = ({route}: SetNickNameScreenProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const existedAccountInfo = useAtomValue(existedAccountInfoAtom);
  const [accountStatus, setAccountStatus] = useAtom(accountFlowStatusAtom);

  const isMyPage = route?.params.isMyPage;

  const selectedAccountInfo = existedAccountInfo.find(
    item => item.isSelected === true,
  );
  const [inputValue, setInputValue] = useState(
    selectedAccountInfo?.nickname ?? '',
  );
  const [statusMessage, setStatusMessage] =
    useState<NicknameStatusMessageType>('BEFORE_CHECK');

  const [openBottomSheet, _, BottomSheet] = useModal('BOTTOM_SHEET');
  const [openModal, __, Modal] = useModal('MODAL');

  const handleSetNicknameButton = async () => {
    // TODO: 사용 불가능 닉네임 로직 추가
    // setStatusMessage('CANNOT_USE');

    try {
      const CheckDuplicateUserNicknameRes =
        await CoreAPI.checkDuplicateUserNickname({
          nickname: inputValue,
        });
      if (CheckDuplicateUserNicknameRes.duplicate) {
        setStatusMessage('DUPLICATED');
        return;
      }
      setStatusMessage('CAN_USE');
      if (isMyPage) {
        return;
        // TODO: 닉네임 업데이트 API 연동 필요
      }
      openBottomSheet();
    } catch (err) {
      const error = err as ErrorResponseType;
      console.error(error);
    }
  };

  const [isAdvertismentAgree, setIsAdvertismentAgree] = useState(false);
  const handleClickSubmitBottomSheetButton = async (
    isAdvertismentAgree: boolean,
  ) => {
    setIsAdvertismentAgree(isAdvertismentAgree);
    if (selectedAccountInfo) delete selectedAccountInfo['isSelected'];
    try {
      const signUpRes = await CoreAPI.signUp({
        nickname: inputValue,
        tos: {
          privatePolicy: true,
          termsOfUse: true,
          notification: false,
          marketing: isAdvertismentAgree,
        },
        migrationUserInfo: selectedAccountInfo ?? null,
      });
      console.log(signUpRes); // TODO: require delete
      storeToken(signUpRes.accessToken, signUpRes.refreshToken);
      await DeviceService.setDeviceInfo();
      await UserService.setUserInfo(_);
      openModal();
    } catch (err) {
      console.error(err);
    }
  };
  const handleClickSubmitModalButton = () => {
    setAccountStatus(prev => {
      return {
        ...prev,
        portalStatus: {isPortalStep: true, step: 0},
      };
    });
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
        style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
        <Header
          label={isMyPage ? '닉네임 변경' : '닉네임 설정'}
          onPressBackButton={() => {
            if (isMyPage) return navigation.goBack();
            switch (accountStatus.stepStatus.userType) {
              case 'EXISTED':
                setAccountStatus(prev => {
                  return {
                    ...prev,
                    stepStatus: {
                      userType: 'EXISTED',
                      step: 0,
                    },
                  };
                });
                break;
              case 'NEW':
                setAccountStatus(prev => {
                  return {
                    ...prev,
                    stepStatus: {
                      userType: 'NONE',
                      step: 0,
                    },
                  };
                });
            }
          }}
        />
        <S.setNicknameContainer>
          <View style={{gap: 32}}>
            <View style={{gap: 8}}>
              <Txt
                label={
                  isMyPage
                    ? '변경하실 닉네임을 입력해주세요.'
                    : '사용하실 닉네임을 입력해주세요.'
                }
                color={'grey190'}
                typograph={'headlineMedium'}
              />
              <Txt
                label={
                  '닉네임은 최대 8자로 설정 가능합니다.\n한글, 영문, 숫자, 특수기호를 이용해주세요.'
                }
                color={'grey190'}
                typograph={'bodyMedium'}
              />
            </View>
            <Input
              onChangeText={onChangeText}
              maxLength={8}
              onPress={onPressInputDelete}
              value={inputValue}
              label={'닉네임'}
              statusMessage={handleInputStatusMessage(statusMessage)}
              status={handleInputStatus(statusMessage)}
              placeholder={'여기에 입력하세요.'}
            />
          </View>
          <Button
            label={'설정하기'}
            onPress={handleSetNicknameButton}
            isEnabled={!!inputValue}
            isFullWidth={true}
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
    padding: 28px 16px;
  `,
};
