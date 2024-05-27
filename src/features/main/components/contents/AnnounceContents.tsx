import {useCallback} from 'react';
import {Linking, View} from 'react-native';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/core';
import {useAtom, useAtomValue} from 'jotai';
import {Button, Txt, colors} from '@uoslife/design-system';

import URLS from '../../../../configs/urls';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';
import CardLayout from '../../../../components/molecules/common/cardLayout/CardLayout';
import customShowToast from '../../../../configs/toast';
import CategoryTab from '../../../announcement/components/tab/CategoryTab';
import announcementCurrentOriginAtom from '../../../announcement/store/announcementCurrentOrigin';
import getAnnouncement from '../../../announcement/store/getAnnouncement';
import Skeleton from '../../../../components/molecules/common/skeleton/Skeleton';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';

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
  const [{data, isFetching}] = useAtom(getAnnouncement);

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
          {isFetching ? (
            <AnnounceContentsSkeleton />
          ) : (
            data?.pages[0].content.slice(0, 3).map(item => (
              <AnimatePress
                key={item.id}
                onPress={() =>
                  navigation.navigate('announcement_detail', {
                    id: item.id,
                    origin: currentOrigin,
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
