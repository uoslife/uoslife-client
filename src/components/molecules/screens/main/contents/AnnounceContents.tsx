import {useCallback} from 'react';
import {Linking, Alert, View} from 'react-native';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/core';
import {useAtom, useAtomValue} from 'jotai';
import {Button, Txt, colors} from '@uoslife/design-system';

import URLS from '../../../../../configs/urls';

import CardLayout from '../../../common/cardLayout/CardLayout';
import CategoryTab from '../../announcement/tab/CategoryTab';
import {RootNavigationProps} from '../../../../../navigators/RootStackNavigator';
import Skeleton from '../../../common/skeleton/Skeleton';
import AnimatePress from '../../../../animations/pressable_icon/AnimatePress';
import announcementCurrentOriginAtom from '../../../../../store/announcement/announcementCurrentOrigin';
import getAnnouncement from '../../../../../store/announcement/getAnnouncement';
import customShowToast from '../../../../../configs/toast';

const AnnounceContentsSkeleton = () => {
  return (
    <View style={{gap: 16, paddingTop: 8, paddingBottom: 8}}>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </View>
  );
};

const AnnounceContents = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const currentOrigin = useAtomValue(announcementCurrentOriginAtom);
  const [{data}] = useAtom(getAnnouncement);

  const handlePressLinkButton = useCallback(async () => {
    const supported = await Linking.canOpenURL(URLS.UOSTORY);

    if (supported) {
      await Linking.openURL(URLS.UOSTORY);
    } else {
      customShowToast('cannotOpenUrlError');
    }
  }, []);
  return (
    <CardLayout>
      <S.Container>
        <CategoryTab />
        <S.AnnounceTextWrapper>
          {data ? (
            data.pages[0].content.slice(0, 3).map(item => (
              <AnimatePress
                key={item.id}
                onPress={() =>
                  navigation.navigate('Announcement', {
                    screen: 'AnnouncementDetail',
                    params: {id: item.id, origin: currentOrigin},
                  })
                }
                variant="scale_down">
                <Txt
                  label={item.title}
                  color="grey190"
                  typograph="bodyMedium"
                  style={{padding: 8}}
                />
              </AnimatePress>
            ))
          ) : (
            <AnnounceContentsSkeleton />
          )}
        </S.AnnounceTextWrapper>
        <S.Divider />
        <S.LinkButtonWrapper>
          <Button
            label="UOStory 바로가기"
            variant="text"
            iconName="openInNew"
            isFullWidth
            size="small"
            onPress={handlePressLinkButton}
          />
        </S.LinkButtonWrapper>
      </S.Container>
    </CardLayout>
  );
};

export default AnnounceContents;

const S = {
  Container: styled.View`
    padding: 20px 16px 0;
  `,
  AnnounceTextWrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 0;
  `,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
  LinkButtonWrapper: styled.Pressable`
    padding: 8px 0;
  `,
};
