import {useCallback, useEffect, useState} from 'react';
import {Linking, Alert, View, Pressable} from 'react-native';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/core';
import {useAtomValue} from 'jotai';
import {Button, Txt, colors} from '@uoslife/design-system';

import URLS from '../../../../../configs/urls';
import {categoryStatusAtom} from '../../../../../store/announcement';
import UtilityService from '../../../../../services/utility';
import {AnnouncementOriginNameType} from '../../../../../api/services/util/announcement/announcementAPI.type';

import CardLayout from '../../../common/cardLayout/CardLayout';
import CategoryTab from '../../announcement/tab/CategoryTab';

const DEFAULT_GET_ANNOOUNCEMENT_SIZE = 3;
const DEFAULT_ANNOUNCEMENT_ORIGIN = 'FA1';

type AnnouncementsType = {
  origin: AnnouncementOriginNameType;
  contents: Array<{id: number; text: string}>;
};
type AnnouncementsStateType = Array<AnnouncementsType>;

const findIsOriginExist = (
  announcements: AnnouncementsStateType,
  origin: AnnouncementOriginNameType,
) => {
  return announcements.some(item => item.origin === origin);
};

const AnnounceContents = () => {
  const categoryStatus = useAtomValue(categoryStatusAtom);
  const navigation = useNavigation();

  const [announcements, setAnnouncements] = useState<AnnouncementsStateType>();
  const [currentOrigin, setCurrentOrigin] =
    useState<AnnouncementOriginNameType>(DEFAULT_ANNOUNCEMENT_ORIGIN);
  useEffect(() => {
    (async () => {
      const res = await UtilityService.getAnnouncementsInMainScreen(
        DEFAULT_ANNOUNCEMENT_ORIGIN,
        DEFAULT_GET_ANNOOUNCEMENT_SIZE,
      );
      if (!res) return;
      const contentsArray = res?.content.map(item => {
        return {id: item.id, text: item.title};
      });
      setAnnouncements([
        {origin: DEFAULT_ANNOUNCEMENT_ORIGIN, contents: contentsArray},
      ]);
    })();
  }, []);

  useEffect(() => {
    const origin = categoryStatus.find(item => item.isSelected === true)
      ?.origin as AnnouncementOriginNameType;
    setCurrentOrigin(origin);

    (async () => {
      if (announcements && findIsOriginExist(announcements, origin)) return;
      const res = await UtilityService.getAnnouncementsInMainScreen(
        origin,
        DEFAULT_GET_ANNOOUNCEMENT_SIZE,
      );
      if (!res) return;
      const contentsArray = res.content.map(item => {
        return {id: item.id, text: item.title};
      });
      setAnnouncements(prev =>
        prev ? [...prev, {origin, contents: contentsArray}] : undefined,
      );
    })();
  }, [categoryStatus]);

  const handlePressLinkButton = useCallback(async () => {
    const supported = await Linking.canOpenURL(URLS.UOSTORY);

    if (supported) {
      await Linking.openURL(URLS.UOSTORY);
    } else {
      Alert.alert(`Don't know how to open this URL: ${URLS.UOSTORY}`);
    }
  }, [URLS.UOSTORY]);
  return (
    <CardLayout>
      <S.Container>
        <CategoryTab />
        <S.AnnounceTextWrapper>
          {announcements?.find(item => item.origin === currentOrigin) ? (
            announcements
              ?.find(item => item.origin === currentOrigin)
              ?.contents.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('Announcement', {
                      screen: 'AnnouncementDetail',
                      params: {id: item.id, origin: currentOrigin},
                    })
                  }>
                  <Txt
                    label={item.text}
                    color="grey190"
                    typograph="bodyMedium"
                    style={{padding: 8}}
                  />
                </Pressable>
              ))
          ) : (
            <View style={{height: 200}} />
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
