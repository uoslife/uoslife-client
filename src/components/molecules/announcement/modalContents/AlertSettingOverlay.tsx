import styled from '@emotion/native';
import {Button, Txt} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Linking, View} from 'react-native';
import {useEffect, useState} from 'react';
import NotificationService from '../../../../services/notification';
import BottomSheetToggleItem from '../../../overlays/items/BottomSheetToggleItem';

const AlertSettingOverlay = () => {
  const insets = useSafeAreaInsets();
  const [isNotificationAgree, setIsNotificationAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsNotificationAgree(
        await NotificationService.getNotificationAgreement(),
      );
      setIsLoading(false);
    })();
  }, []);

  const handlePressRedirectNotificationSetting = () => {
    Linking.openSettings();
  };

  return (
    <S.Container style={{paddingBottom: insets.bottom + 12}}>
      {isLoading ? (
        <View style={{height: 300}} />
      ) : (
        <>
          <S.Description>
            <Txt
              label={
                isNotificationAgree
                  ? '알림을 받아보시려면 설정을 변경해주세요'
                  : `공지사항 알림 서비스를 이용하기 위해서\n‘시대생 알림’을 허용해야 합니다.`
              }
              color="grey190"
              typograph="titleMedium"
            />
            {isNotificationAgree && (
              <Txt
                label="알림 설정은 MY Page > [알림 설정]에서 변경 가능합니다."
                color="grey190"
                typograph="bodyMedium"
              />
            )}
          </S.Description>
          <BottomSheetToggleItem
            isOn={false}
            description="일반공지"
            onPress={() => {}}
          />
          <BottomSheetToggleItem
            isOn={false}
            description="학사공지"
            onPress={() => {}}
          />
          <BottomSheetToggleItem
            isOn={false}
            description="직원채용"
            onPress={() => {}}
          />
          <BottomSheetToggleItem
            isOn={false}
            description="창업공지"
            onPress={() => {}}
          />
          {!isNotificationAgree && (
            <Button
              label="알림 설정으로 이동"
              variant="outline"
              isFullWidth
              onPress={handlePressRedirectNotificationSetting}
            />
          )}
        </>
      )}
    </S.Container>
  );
};

export default AlertSettingOverlay;

const S = {
  Container: styled.View`
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  Description: styled.View`
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};
