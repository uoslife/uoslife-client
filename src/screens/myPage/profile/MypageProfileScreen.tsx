import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import styled from '@emotion/native';
import {Button, colors, Txt} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../../components/molecules/common/header/Header';
import {MypageProfileNavigationProp} from '../../../navigators/MypageStackNavigator';
import NavigationList from '../../../components/molecules/common/navigationList/NavigationList';
import useModal from '../../../hooks/useModal';
import usePhoto from '../../../hooks/usePhoto';
import UserService from '../../../services/user';
import useUserState from '../../../hooks/useUserState';
import {UserInfoType} from '../../../api/services/core/user/userAPI.type';

const getPortalAccountInfoList = (user: UserInfoType) => {
  return [
    {name: '이름', value: user.name},
    {name: '학과', value: user.identities[0]?.department},
    {name: '학번', value: user.identities[0]?.studentId},
    {name: '학적', value: user.identities[0]?.status},
    {name: '생일', value: user.birthday},
  ];
};

const MypageProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MypageProfileNavigationProp>();
  const [selectedPhotoUri, openPhotoSelectionAlert] = usePhoto('');
  const [openModal, closeModal, Modal] = useModal('MODAL');

  const {user, deleteUserInfo} = useUserState();

  const isVerified = user?.isVerified;
  const nickname = user?.nickname;

  // const handleUpdateProfileImage = async () => {
  //   openPhotoSelectionAlert();
  // };
  // const handlePortalAccountPress = () => {
  //   if (isVerified) {
  //       <S.modalWrapper>
  //         <Txt
  //           label={'포털 계정 연동을 해지하시겠습니까?'}
  //           color="grey190"
  //           typograph="titleMedium"
  //         />
  //         <Txt
  //           label={'연동 해지 시 일부 서비스가 제한될 수 있습니다.'}
  //           color="grey130"
  //           typograph="bodySmall"
  //         />
  //         <S.Devider />
  //         <TouchableOpacity
  //           onPress={() => {
  //             setIsPortalAuthenticated(false);
  //             closeModal();
  //           }}>
  //           <Txt label={'연동 해지'} color="red" typograph="bodyMedium" />
  //         </TouchableOpacity>
  //         <S.Devider />
  //         <TouchableOpacity onPress={closeModal}>
  //           <Txt label={'취소'} color="grey90" typograph="bodyMedium" />
  //         </TouchableOpacity>
  //       </S.modalWrapper>,
  //     openModal();
  //   } else {
  //     setIsPortalAuthenticated(true);
  //     navigation.navigate('Mypage_profile', {
  //       screen: 'Mypage_portalAuthentication',
  //     });
  //   }
  // };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={{paddingTop: insets.top}}>
        <S.screenContainer bounces={false}>
          <Header label="마이페이지" onPressBackButton={handleGoBack} />
          <S.myProfileContainer>
            <S.myProfileBox>
              <Pressable
                // onPress={handleUpdateProfileImage}
                style={{padding: 48}}>
                <S.userCircleImageWrapper>
                  {/* <S.userImage */}
                  {/*  source={ */}
                  {/*    selectedPhotoUri */}
                  {/*      ? {uri: selectedPhotoUri} */}
                  {/*      : require('../../../assets/images/user.png') */}
                  {/*  } */}
                  {/*  selectedPhotoUri={!!selectedPhotoUri} */}
                  {/* /> */}
                  {/* TODO: 프로필 사진 변경 작업시, 해당 주석 코드 사용 */}
                  <S.userImage
                    source={require('../../../assets/images/iroomae_character.png')}
                    selectedPhotoUri={!!selectedPhotoUri}
                  />
                </S.userCircleImageWrapper>
                {/* <S.cameraCircleImageWrapper style={styles.cameraImage}> */}
                {/*  <Icon */}
                {/*    name={'camera'} */}
                {/*    width={24} */}
                {/*    height={24} */}
                {/*    color={'grey190'} */}
                {/*  /> */}
                {/* </S.cameraCircleImageWrapper> */}
                {/* TODO: 프로필 사진 변경 작업시, 해당 주석 코드 사용 */}
              </Pressable>
              <NavigationList
                label="닉네임 변경"
                onPress={() =>
                  navigation.navigate('Mypage_changeNickname', {
                    isMyPage: true,
                  })
                }
                pressLabel={nickname}
              />
              <NavigationList
                label="포털 계정 연동"
                onPress={
                  !isVerified
                    ? () => navigation.navigate('Mypage_portalAuthentication')
                    : undefined
                }
                pressLabel={isVerified ? '연동되었습니다.' : '연동하기'}
                pressLabelColor={isVerified ? 'grey130' : 'primaryBrand'}
                isPressIconShown={!isVerified}
              />
              {isVerified && (
                <S.portalAccountInformationWrapper>
                  {getPortalAccountInfoList(user).map(item => {
                    return (
                      <S.portalAccountInformation key={item.name}>
                        <Txt
                          label={item.name}
                          typograph="labelLarge"
                          color="grey130"
                        />
                        <Txt
                          label={item.value ?? ''}
                          typograph="bodyMedium"
                          color="grey130"
                        />
                      </S.portalAccountInformation>
                    );
                  })}
                </S.portalAccountInformationWrapper>
              )}
              <NavigationList
                label="전화번호 변경"
                onPress={() => navigation.navigate('Mypage_changeNumber')}
              />
              <NavigationList label="회원탈퇴" onPress={() => openModal()} />
            </S.myProfileBox>
          </S.myProfileContainer>
        </S.screenContainer>
      </View>
      <Modal>
        <S.UnregisterModalWrapper>
          <Txt
            label="시대생 회원을 탈퇴하시겠습니까?"
            color="grey190"
            typograph="titleMedium"
            style={{padding: 16, paddingTop: 24, textAlign: 'center'}}
          />
          <S.Devider />
          <Button
            label="회원탈퇴"
            // labelColor="red"
            size="medium"
            variant="text"
            isFullWidth
            onPress={async () => {
              await UserService.unregister(deleteUserInfo);
            }}
          />
          <S.Devider />
          <Button
            label="취소"
            size="medium"
            variant="text"
            isFullWidth
            onPress={closeModal}
          />
        </S.UnregisterModalWrapper>
      </Modal>
    </>
  );
};

const S = {
  modalWrapper: styled.View`
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 153px;
  `,
  UnregisterModalWrapper: styled.View``,
  Devider: styled.View`
    width: 100%;
    height: 1px;
    background-color: #e1dfdd;
  `,
  portalAccountInformationWrapper: styled.View`
    width: 100%;
    padding: 4px 0px 12px 32px;
    gap: 8px;
  `,
  portalAccountInformation: styled.View`
    flex-direction: row;
    gap: 24px;
  `,
  arrowButtonImage: styled.Image`
    width: 9px;
    height: 14px;
    transform: rotate(180deg);
  `,
  navigationButton: styled.View`
    flex-direction: row;
    gap: 8px;
    align-items: center;
  `,
  screenContainer: styled.ScrollView`
    height: 100%;
    width: 100%;
  `,
  myProfileContainer: styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 16px;
  `,
  myProfileBox: styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  userCircleImageWrapper: styled.View`
    position: relative;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border: 1px solid ${colors.grey60};
    border-radius: 80px;
    overflow: hidden;
  `,
  cameraCircleImageWrapper: styled.View`
    position: absolute;
    top: 116px;
    left: 116px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
    border: 1px solid ${colors.grey130};
    border-radius: 100px;
  `,
  userImage: styled.Image<{selectedPhotoUri: boolean}>`
    width: 75px;
    height: 100px;
  `,
  cameraImage: styled.Image`
    width: 13px;
    height: 10.56px;
  `,
};

const styles = StyleSheet.create({
  cameraImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});

export default MypageProfileScreen;
