import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {MyPageAccountStackParamList} from '../../../navigators/MyPageStackNavigator';
import NavigationList from '../../../components/navigations/navigationList/NavigationList';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import useModal from '../../../hooks/useModal';
import {colors, Icon, Txt} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/core';
import usePhoto from '../../../hooks/usePhoto';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type MyAccountNavigatorItem = {
  name: string;
  handleOnPress: () => void;
  hasArrowButton?: boolean;
  navigationButton?: any;
  children?: any;
};

type PortalAccountInformationListProps = {
  name: string;
  value: string;
};

const PORTAL_ACCOUNT_DUMMY_DATA = [
  {
    이름: '한유민',
    학과: '경제학부',
    학번: '2022280085',
    학적: '재학',
    생일: '2003년 3월 11일',
  },
];

const portalAccountInformationKeyArray: string[] = Object.keys(
  PORTAL_ACCOUNT_DUMMY_DATA[0],
);

const PortalAccountInformationList = ({
  name,
  value,
}: PortalAccountInformationListProps) => {
  return (
    <S.portalAccountInformation>
      <Txt label={name} typograph={'labelLarge'} color={'grey130'} />
      <Txt label={value} typograph={'bodyMedium'} color={'grey130'} />
    </S.portalAccountInformation>
  );
};

const MypageProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MyPageAccountStackParamList>();
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(true);
  const [selectedPhotoUri, openPhotoSelectionAlert] = usePhoto('');
  const {openModal, closeModal, renderModal, setModalContent} = useModal();

  const handleUpdateProfileImage = async () => {
    openPhotoSelectionAlert();
  };
  const handlePortalAccountPress = () => {
    if (isPortalAuthenticated) {
      setModalContent(
        <S.modalWrapper>
          <Txt
            label={'포털 계정 연동을 해지하시겠습니까?'}
            color="grey190"
            typograph="titleMedium"
          />
          <Txt
            label={'연동 해지 시 일부 서비스가 제한될 수 있습니다.'}
            color="grey130"
            typograph="bodySmall"
          />
          <S.separator />
          <TouchableOpacity
            onPress={() => {
              setIsPortalAuthenticated(false);
              closeModal();
            }}>
            <Txt label={'연동 해지'} color="red" typograph="bodyMedium" />
          </TouchableOpacity>
          <S.separator />
          <TouchableOpacity onPress={closeModal}>
            <Txt label={'취소'} color="grey90" typograph="bodyMedium" />
          </TouchableOpacity>
        </S.modalWrapper>,
      );
      openModal();
    } else {
      setIsPortalAuthenticated(true);
      navigation.navigate('Mypage_profile', {
        screen: 'Mypage_portalAuthentication',
      });
    }
  };
  const handleAccountCancellation = () => {
    setModalContent(
      <S.accountCancellationModalWrapper>
        <Txt
          label={'시대생 회원을 탈퇴하시겠습니까?'}
          color="grey190"
          typograph="titleMedium"
        />
        <S.separator />
        <TouchableOpacity
          onPress={() => {
            // 회원 탈퇴 페이지
          }}>
          <Txt label={'회원탈퇴'} color="red" typograph="bodyMedium" />
        </TouchableOpacity>
        <S.separator />
        <TouchableOpacity onPress={closeModal}>
          <Txt label={'취소'} color="grey90" typograph="bodyMedium" />
        </TouchableOpacity>
      </S.accountCancellationModalWrapper>,
    );
    openModal();
  };

  const myAccountNavigatorItems: MyAccountNavigatorItem[] = [
    {
      name: '닉네임 변경',
      handleOnPress: () =>
        navigation.navigate('Mypage_changeNickname', {
          isMyPage: true,
        }),
      hasArrowButton: false,
      navigationButton: (
        <S.navigationButton>
          <Txt
            label={'한유민짱짱'}
            color={'grey130'}
            typograph={'bodyMedium'}
          />
          <Icon
            name={'forwardArrow'}
            width={24}
            height={24}
            color={'grey130'}
          />
        </S.navigationButton>
      ),
    },
    {
      name: '포털 계정 연동',
      handleOnPress: handlePortalAccountPress,
      hasArrowButton: false,
      navigationButton: isPortalAuthenticated ? (
        <Txt
          label={'연동 해지하기'}
          color={'grey60'}
          typograph={'bodyMedium'}
        />
      ) : (
        <Txt
          label={'연동하기'}
          color={'primaryBrand'}
          typograph={'bodyMedium'}
        />
      ),
      children: isPortalAuthenticated && (
        <S.portalAccountInformationWrapper>
          {portalAccountInformationKeyArray.map((key, index) => {
            return (
              <PortalAccountInformationList
                key={index}
                name={key}
                value={PORTAL_ACCOUNT_DUMMY_DATA[0][key]}
              />
            );
          })}
        </S.portalAccountInformationWrapper>
      ),
    },
    {
      name: '전화번호 변경',
      handleOnPress: () =>
        navigation.navigate('Mypage_profile', {
          screen: 'Mypage_changeNumber',
        }),
    },
    {
      name: '회원탈퇴',
      handleOnPress: handleAccountCancellation,
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{paddingTop: insets.top}}>
      <S.screenContainer>
        <Header label={'마이페이지'} onPressBackButton={handleGoBack} />
        <S.myProfileContainer>
          <S.myProfileBox>
            <Pressable
              // onPress={handleUpdateProfileImage}
              style={{paddingBottom: 64}}>
              <S.userCircleImageWrapper>
                {/*<S.userImage*/}
                {/*  source={*/}
                {/*    selectedPhotoUri*/}
                {/*      ? {uri: selectedPhotoUri}*/}
                {/*      : require('../../../assets/images/user.png')*/}
                {/*    // TODO: 디자인 시스템으로 유저 아이콘 이전하기*/}
                {/*  }*/}
                {/*  selectedPhotoUri={!!selectedPhotoUri}*/}
                {/*/>*/}
                <S.userImage
                  source={require('../../../assets/images/iroomae_character.png')}
                  selectedPhotoUri={!!selectedPhotoUri}
                />
              </S.userCircleImageWrapper>
              {/*<S.cameraCircleImageWrapper style={styles.cameraImage}>*/}
              {/*  <Icon*/}
              {/*    name={'camera'}*/}
              {/*    width={24}*/}
              {/*    height={24}*/}
              {/*    color={'grey190'}*/}
              {/*  />*/}
              {/*</S.cameraCircleImageWrapper>*/}
            </Pressable>
            {myAccountNavigatorItems.map((value, index) => {
              return (
                <NavigationList
                  key={index}
                  label={value.name}
                  onPress={value.handleOnPress}
                  navigationButton={value.navigationButton}
                  children={value.children}
                />
              );
            })}
          </S.myProfileBox>
        </S.myProfileContainer>
      </S.screenContainer>
      {renderModal()}
      {renderModal()}
    </View>
  );
};

const S = {
  modalWrapper: styled.View`
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 153px;
  `,
  accountCancellationModalWrapper: styled.View`
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 144px;
  `,
  separator: styled.View`
    width: 100%;
    height: 1px;
    background-color: #e1dfdd;
    margin: 10px 0;
  `,
  portalAccountInformationWrapper: styled.View`
    gap: 10px;
  `,
  portalAccountInformation: styled.View`
    flex-direction: row;
    margin-left: 20px;
    gap: 30px;
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
    padding: 48px 24px;
  `,
  myProfileBox: styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
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
