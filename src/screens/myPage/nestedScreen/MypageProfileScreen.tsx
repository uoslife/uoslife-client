import React, {useState} from 'react';
import {Pressable, Text} from 'react-native';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageNestedStackParamList} from '../../../navigators/MyPageStackNavigator';
import NavigationList from '../../../components/navigations/navigationList/NavigationList';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import useModal from '../../../hooks/useModal';
import {Txt} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/core';

type MyAccountNavigatorItem = {
  name: string;
  handleOnPress: () => void;
  hasBorder: boolean;
  hasArrowButton?: boolean;
  navigationButton?: any;
  children?: any;
};

type PortalAccountInformationListProps = {
  name: string;
  value: string;
};

// portal account information API fetching
const portalAccountInformation = [
  {
    이름: '한유민',
    학과: '경제학부',
    학번: '2022280085',
    학적: '재학',
    생일: '2003년 3월 11일',
  },
];

const portalAccountInformationKeyArray: string[] = Object.keys(
  portalAccountInformation[0],
);

const addProfileImage = () => {
  // add profile image
};

const PortalAccountInformationList = ({
  name,
  value,
}: PortalAccountInformationListProps) => {
  return (
    <S.portalAccountInformationWrapper>
      <S.portalAccountInformation>
        <Text>{name}</Text>
        <Text>{value}</Text>
      </S.portalAccountInformation>
    </S.portalAccountInformationWrapper>
  );
};

const MypageProfileScreen = () => {
  const navigation = useNavigation<MyPageNestedStackParamList>();
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(true);
  const {openModal, closeModal, renderModal, setModalContent} = useModal();
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
      hasBorder: true,
      hasArrowButton: false,
      navigationButton: (
        <S.navigationButton>
          <Text style={{marginRight: 10}}>한유민짱짱</Text>
          <S.arrowButtonImage
            source={require('../../../assets/images/backButton.png')}
          />
        </S.navigationButton>
      ),
    },
    {
      name: '포털 계정 연동',
      handleOnPress: handlePortalAccountPress,
      hasBorder: true,
      hasArrowButton: false,
      navigationButton: isPortalAuthenticated ? (
        <Text>연동 해지하기</Text>
      ) : (
        <Text>연동하기</Text>
      ),
      children:
        isPortalAuthenticated &&
        portalAccountInformationKeyArray.map((key, index) => {
          return (
            <PortalAccountInformationList
              key={index}
              name={key}
              value={portalAccountInformation[0][key]}
            />
          );
        }),
    },
    {
      name: '전화번호 변경',
      handleOnPress: () =>
        navigation.navigate('Mypage_profile', {
          screen: 'Mypage_changeNumber',
        }),
      hasBorder: true,
    },
    {
      name: '회원탈퇴',
      handleOnPress: handleAccountCancellation,
      hasBorder: false,
    },
  ];

  return (
    <View>
      <S.screenContainer>
        <Header label={'MY Page'} />
        <S.myProfileContainer>
          <S.myProfileBox>
            <Pressable onPress={addProfileImage} style={{paddingBottom: 64}}>
              <S.userCircleImageWrapper>
                <S.userImage
                  source={require('../../../assets/images/user.png')}
                />
              </S.userCircleImageWrapper>
              <S.cameraCircleImageWrapper style={styles.cameraImage}>
                <S.cameraImage
                  source={require('../../../assets/images/camera.png')}
                />
              </S.cameraCircleImageWrapper>
            </Pressable>
            {myAccountNavigatorItems.map((value, index) => {
              return (
                <NavigationList
                  key={index}
                  label={value.name}
                  hasBorder={value.hasBorder}
                  onPress={value.handleOnPress}
                  navigationButton={value.navigationButton}
                  children={value.children}
                />
              );
            })}
          </S.myProfileBox>
          <S.logout>로그아웃</S.logout>
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
    padding: 52px 54px 39px 54px;
  `,
  myProfileBox: styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
  `,
  userCircleImageWrapper: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border: 1px solid #a6a6a6;
    border-radius: 80px;
    position: relative;
  `,
  cameraCircleImageWrapper: styled.View`
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    position: absolute;
    top: 120px;
    left: 120px;
  `,
  userImage: styled.Image`
    width: 60px;
    height: 60px;
  `,
  cameraImage: styled.Image`
    width: 13px;
    height: 10.56px;
  `,
  logout: styled.Text`
    text-align: center;
    color: #7b7b7b;
    text-decoration-line: underline;
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
