import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Button, Txt} from '@uoslife/design-system';

import {useNavigation} from '@react-navigation/native';
import BottomSheetToggleItem from '../../../overlays/items/BottomSheetToggleItem';
import useTopicState from '../../../../../hooks/useTopicState';

const AlertSettingOverlay = () => {
  const insets = useSafeAreaInsets();
  const [isNotificationAgree, setIsNotificationAgree] = useState(false);
  const {topicList, setTopic, deleteTopic, isLoading} = useTopicState();
  const navigation = useNavigation();

  useEffect(() => {
    const isServiceNotificationToggledOn = topicList.find(
      item => item.name === 'SERVICE_NOTIFICATION',
    )!.isToggleOn;
    setIsNotificationAgree(isServiceNotificationToggledOn);
  }, [topicList]);

  const handlePressRedirectNotificationSetting = () => {
    // @ts-ignore
    navigation.navigate('MyPage', {screen: 'Mypage_appSetting'});
  };

  return (
    <S.Container style={{paddingBottom: insets.bottom + 12}}>
      {isLoading ? (
        <View style={{height: 340}} />
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
            {topicList.map(item =>
              item.type === 'ANNOUNCEMENT' ? (
                <BottomSheetToggleItem
                  key={item.name}
                  isOn={item.isToggleOn}
                  description={item.title}
                  onPress={() =>
                    item.isToggleOn
                      ? deleteTopic(item.name)
                      : setTopic(item.name)
                  }
                  disable={!isNotificationAgree}
                />
              ) : null,
            )}
          </S.Description>
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
    gap: 12px;
  `,
  Description: styled.View`
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};
