import {useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import styled from '@emotion/native';
import {Button, Txt, colors} from '@uoslife/design-system';

import Header from '../../../components/molecules/common/header/Header';
import customShowToast from '../../../configs/toast';
import UserService from '../../../services/user';
import useUserState from '../../../hooks/useUserState';
import useModal from '../../../hooks/useModal';
import {AccountAPI} from '../../../api/services/account';

const PortalAuthenticationManagementScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {setUserInfo} = useUserState();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [openModal, closeModal, Modal] = useModal('MODAL');

  // handle query
  const [selectedId, setId] = useState('');
  const {data} = useQuery({
    queryKey: ['getPortalVerification'],
    queryFn: () => AccountAPI.getIdentities(),
  });
  const selectIdentitymutation = useMutation({
    mutationKey: ['representativePortalVerification'],
    mutationFn: () =>
      AccountAPI.selectIdentity({
        identityId: selectedId,
      }),
    onSuccess: async () => {
      await UserService.updateUserInfo(setUserInfo);
      customShowToast('portalVerificationSuccess');
      navigation.goBack();
    },
    onError: () => {
      customShowToast('portalVerificationError');
      navigation.goBack();
    },
  });
  const deletePortalmutation = useMutation({
    mutationKey: ['deletePortalVerification'],
    mutationFn: () => AccountAPI.deletePortalAccount(),
    onSuccess: async () => {
      await UserService.updateUserInfo(setUserInfo);
      customShowToast('deletePortalVerificationSuccess');
      navigation.goBack();
    },
    onError: () => {
      customShowToast('deletePortalVerificationError');
      navigation.goBack();
    },
  });

  const handlePressSelectIdentity = () => {
    if (!selectedId) return;
    // eslint-disable-next-line consistent-return
    return selectIdentitymutation.mutate();
  };
  const handlePressDeletePortal = () => openModal();

  return (
    <>
      <S.Container
        style={{paddingTop: insets.top, paddingBottom: insets.bottom + 16}}>
        <Header label="포털 연동 관리" onPressBackButton={handleGoBack} />
        <S.InnerContainer>
          <S.TopWrapper>
            <View style={{gap: 8}}>
              <Txt
                label="대표 학적과 학번을 선택해주세요."
                color="grey190"
                typograph="headlineMedium"
              />
              <Txt
                label="다수의 학적이 있다면 2개 이상이 떠요."
                color="grey190"
                typograph="bodyMedium"
              />
            </View>
            {data?.map(item => {
              return (
                <S.ButtonSelected
                  isSelected={item.id === selectedId}
                  onPress={() => setId(item.id)}
                  key={item.id}>
                  <Txt
                    label={`${item.status}, ${item.idNumber}`}
                    color="grey190"
                    typograph="titleMedium"
                  />
                </S.ButtonSelected>
              );
            })}
          </S.TopWrapper>
          <S.BottomButtonWrapper>
            <Button
              label="포털 연동 변경하기"
              variant="filled"
              isFullWidth
              onPress={handlePressSelectIdentity}
              isEnabled={!!selectedId}
            />
            <Button
              label="포털 연동 해지하기"
              variant="outline"
              isFullWidth
              onPress={handlePressDeletePortal}
            />
          </S.BottomButtonWrapper>
        </S.InnerContainer>
      </S.Container>
      <Modal>
        <S.ModalWrapper>
          <Txt
            label="포털 연동을 해지하시겠습니까?"
            color="grey190"
            typograph="titleMedium"
            style={{
              padding: 16,
              paddingTop: 24,
              paddingBottom: 0,
              textAlign: 'center',
            }}
          />
          <Txt
            label={`포털 연동을 해지하면 시대생에서 제공하는\n여러 서비스를 사용하지 못해요.`}
            color="grey190"
            typograph="bodySmall"
            style={{padding: 16, textAlign: 'center'}}
          />
          <S.Divider />
          <Button
            label="연동 해지"
            // labelColor="red"
            size="medium"
            variant="text"
            isFullWidth
            onPress={deletePortalmutation.mutate}
          />
          <S.Divider />
          <Button
            label="취소"
            size="medium"
            variant="text"
            isFullWidth
            onPress={closeModal}
          />
        </S.ModalWrapper>
      </Modal>
    </>
  );
};

export default PortalAuthenticationManagementScreen;

function getBorderColor(isSelected: boolean) {
  return isSelected ? colors.primaryBrand : colors.grey40;
}

const S = {
  Container: styled.View`
    flex: 1;
  `,
  InnerContainer: styled.View`
    flex: 1;
    padding: 28px 16px 0;
    justify-content: space-between;
  `,
  TopWrapper: styled.View`
    gap: 28px;
  `,
  ButtonSelected: styled.Pressable<{isSelected: boolean}>`
    border-radius: 10px;
    margin-bottom: 16px;
    padding: 16px;
    border: 2px solid ${({isSelected}) => getBorderColor(isSelected)};
  `,
  BottomButtonWrapper: styled.View`
    gap: 8px;
  `,
  ModalWrapper: styled.View``,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: #e1dfdd;
  `,
};
