import React, {useEffect, useState} from 'react';
import {Linking, View} from 'react-native';
import styled from '@emotion/native/dist/emotion-native.cjs';
import {Button, Txt} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import ToggleSwitch from '../../../../components/atoms/toggleSwitch/ToggleSwitch';
import Header from '../../../../components/molecules/common/header/Header';
import useTopicState from '../../../../hooks/useTopicState';
import NotificationService from '../../../../services/notification';
import DeviceService from '../../../../services/device';

const MypageAppSettingScreen = () => {
  const insets = useSafeAreaInsets();
  const {topicList, setTopic, deleteTopic} = useTopicState();

  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    (async () => {
      const [isAuthorizedStatus] = await Promise.all([
        NotificationService.checkPermissionIsAuthorizedStatus(),
        NotificationService.handleFirebasePushToken(),
      ]);
      setIsAuthorized(isAuthorizedStatus);
      if (isAuthorizedStatus) await DeviceService.updateDeviceInfo();
    })();
  }, []);

  const handlePressRedirectNotificationSetting = () => {
    Linking.openSettings();
  };

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label="알림 설정" onPressBackButton={handleGoBack} />
      {isAuthorized ? (
        <S.mypageAppSettingContainer>
          <View style={{gap: 12}}>
            <Txt label="시대생 알림" color="grey150" typograph="labelLarge" />
            {topicList.map(item =>
              item.type === 'NOTIFICATION' ? (
                <S.notificationSettingContainer key={item.name}>
                  <Txt
                    label={item.title}
                    color="grey190"
                    typograph="bodyLarge"
                  />
                  <ToggleSwitch
                    isOn={item.isToggleOn}
                    onToggle={() =>
                      item.isToggleOn
                        ? deleteTopic(item.name)
                        : setTopic(item.name)
                    }
                  />
                </S.notificationSettingContainer>
              ) : null,
            )}
          </View>
          <View style={{gap: 12}}>
            <Txt label="공지사항 알림" color="grey150" typograph="labelLarge" />
            {topicList.map(item =>
              item.type === 'ANNOUNCEMENT' ? (
                <S.notificationSettingContainer key={item.name}>
                  <Txt
                    label={item.title}
                    color="grey190"
                    typograph="bodyLarge"
                  />
                  <ToggleSwitch
                    isOn={item.isToggleOn}
                    onToggle={() =>
                      item.isToggleOn
                        ? deleteTopic(item.name)
                        : setTopic(item.name)
                    }
                  />
                </S.notificationSettingContainer>
              ) : null,
            )}
          </View>
        </S.mypageAppSettingContainer>
      ) : (
        <S.NotIsAuthorizedContainer>
          <View style={{gap: 8}}>
            <Txt
              label="앱 알림 권한이 없습니다."
              color="black"
              typograph="headlineMedium"
            />
            <Txt
              label="시대생 앱 알림을 받기 위해 디바이스의 알림 설정을 켜주세요.`"
              color="black"
              typograph="bodyMedium"
            />
          </View>
          <Button
            label="시스템 알림 설정으로 이동"
            variant="outline"
            isFullWidth
            onPress={handlePressRedirectNotificationSetting}
          />
        </S.NotIsAuthorizedContainer>
      )}
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
  NotIsAuthorizedContainer: styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px 16px;
  `,
};
