import React, {useState} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native/dist/emotion-native.cjs';
import {Txt} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import ToggleSwitch from '../../components/atoms/toggleSwitch/ToggleSwitch';
import Header from '../../components/molecules/common/header/Header';

const UOSLIFE_NOTIFICATION_SETTING = [
  {
    title: '시대생 서비스 알림',
    isToggleOn: false,
  },
  {
    title: '광고 및 마케팅 수신 동의 알림',
    isToggleOn: false,
  },
];

const ANNOUNCEMENT_NOTIFICATION_SETTING = [
  {
    title: '일반공지',
    isToggleOn: false,
  },
  {
    title: '학사공지',
    isToggleOn: false,
  },
  {
    title: '창업공지',
    isToggleOn: false,
  },
  {
    title: '직원채용',
    isToggleOn: false,
  },
];

type toggleValueType = {
  title: string;
  isToggleOn: boolean;
};

const MypageAppSettingScreen = () => {
  const insets = useSafeAreaInsets();
  const initialValues = [
    ...UOSLIFE_NOTIFICATION_SETTING,
    ...ANNOUNCEMENT_NOTIFICATION_SETTING,
  ];

  const [toggleValues, setToggleValues] =
    useState<toggleValueType[]>(initialValues);

  const updateIsToggleOnState = (
    state: toggleValueType,
    stateIndex: number,
    targetIndex: number,
  ) => {
    return stateIndex === targetIndex
      ? {...state, isToggleOn: !state.isToggleOn}
      : state;
  };

  const handleOnToggle = (toggleSwitchIndex: number) => {
    setToggleValues(prevToggleValues =>
      prevToggleValues.map((stateValue, stateIndex) =>
        updateIsToggleOnState(stateValue, stateIndex, toggleSwitchIndex),
      ),
    );
  };

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label="알림 설정" onPressBackButton={handleGoBack} />
      <S.mypageAppSettingContainer>
        <View style={{gap: 12}}>
          <Txt label="시대생 알림" color="grey150" typograph="labelLarge" />
          {UOSLIFE_NOTIFICATION_SETTING.map((item, i) => (
            <S.notificationSettingContainer key={i}>
              <Txt label={item.title} color="grey190" typograph="bodyLarge" />
              <ToggleSwitch
                isOn={toggleValues[i].isToggleOn}
                onToggle={() => handleOnToggle(i)}
              />
            </S.notificationSettingContainer>
          ))}
        </View>
        <View style={{gap: 12}}>
          <Txt label="공지사항 알림" color="grey150" typograph="labelLarge" />
          {ANNOUNCEMENT_NOTIFICATION_SETTING.map((item, i) => (
            <S.notificationSettingContainer key={i}>
              <Txt label={item.title} color="grey190" typograph="bodyLarge" />
              <ToggleSwitch
                isOn={
                  toggleValues[i + UOSLIFE_NOTIFICATION_SETTING.length]
                    .isToggleOn
                }
                onToggle={() =>
                  handleOnToggle(i + UOSLIFE_NOTIFICATION_SETTING.length)
                }
              />
            </S.notificationSettingContainer>
          ))}
        </View>
      </S.mypageAppSettingContainer>
    </S.screenContainer>
  );
};

export default MypageAppSettingScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
  mypageAppSettingContainer: styled.View`
    flex: 1;
    padding: 12px 25px;
    gap: 28px;
  `,
  notificationSettingContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
};
