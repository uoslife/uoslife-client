import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {View, useWindowDimensions, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {AnnouncementDetailScreenProps} from '../../navigators/AnnouncementStackNavigator';
import {ArticleDetailType} from '../../types/announcement.type';
import {announcementFullName} from '../../configs/announcement';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import {ScrollView} from 'react-native-gesture-handler';
import AnnouncementDetailScreenContent from '../../components/molecules/announcement/announcement-detail/AnnouncementContent';
import Spinner from '../../components/spinner/Spinner';

const AnnouncementDetailScreen = ({
  route: {
    params: {id, origin},
  },
}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<ArticleDetailType>();
  // TODO: API 호출 관련 상태관리 로직 - custom hook 추상화 이용
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsPending(true);
      try {
        const loadedArticle = await AnnouncementAPI.getAnnouncementById({id});
        const {description} = loadedArticle;
        setArticle(loadedArticle);
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
    })();
  }, []);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <S.Root style={{paddingTop: insets.top}}>
        <Header
          label={announcementFullName[origin]}
          onPressBackButton={handleGoBack}
        />
        {isPending ? (
          <Spinner />
        ) : (
          article && (
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
              <AnnouncementDetailScreenContent {...article} />
            </ScrollView>
          )
        )}
      </S.Root>
    </>
  );
};

export default AnnouncementDetailScreen;

const S = {
  Root: styled.View`
    width: 100%;
    height: 100%;
  `,
};
