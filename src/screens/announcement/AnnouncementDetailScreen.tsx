import styled from '@emotion/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/molecules/common/header/Header';
import {AnnouncementDetailScreenProps} from '../../navigators/AnnouncementStackNavigator';
import {ArticleDetailType} from '../../types/announcement.type';
import {announcementFullName} from '../../configs/announcement';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import AnnouncementDetailScreenContent from '../../components/molecules/screens/announcement/detail/AnnouncementDetailScreenContent';
import Spinner from '../../components/atoms/spinner/Spinner';
import LoadingFailed from '../../components/molecules/screens/announcement/LoadingFailed/LoadingFailed';

const AnnouncementDetailScreen = ({
  route: {
    params: {id, origin},
  },
}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<ArticleDetailType>();
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const loadArticle = useCallback(async () => {
    setIsLoading(true);

    try {
      const loadedArticle = await AnnouncementAPI.getAnnouncementById({id});

      setArticle(loadedArticle);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (!article) loadArticle();
  }, [loadArticle, article]);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onRefresh = () => {
    setIsError(false);
    loadArticle();
  };

  if (isError) {
    return (
      <S.Root style={{paddingTop: insets.top}}>
        <Header
          label={announcementFullName[origin]}
          onPressBackButton={handleGoBack}
        />
        <LoadingFailed onRefresh={onRefresh} />
      </S.Root>
    );
  }

  if (isLoading || !article) {
    return (
      <S.Root style={{paddingTop: insets.top}}>
        <Header
          label={announcementFullName[origin]}
          onPressBackButton={handleGoBack}
        />
        <Spinner />
      </S.Root>
    );
  }

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header
        label={announcementFullName[origin]}
        onPressBackButton={handleGoBack}
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        scrollIndicatorInsets={{right: 1}}>
        <AnnouncementDetailScreenContent {...article} />
      </ScrollView>
    </S.Root>
  );
};

export default AnnouncementDetailScreen;

const S = {
  Root: styled.View`
    width: 100%;
    height: 100%;
  `,
};
