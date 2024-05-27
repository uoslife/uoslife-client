import styled from '@emotion/native';
import {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../../components/molecules/common/header/Header';
import {ArticleDetailType} from '../../types/announcement.type';
import {AnnouncementFullNameEnum} from '../../constants/announcement';
import AnnouncementAPI from '../../../../api/services/util/announcement/announcementAPI';
import AnnouncementDetailScreenContent from '../detail/AnnouncementDetailScreenContent';
import Spinner from '../../../../components/atoms/spinner/Spinner';
import LoadingFailed from '../LoadingFailed/LoadingFailed';
import {AnnouncementDetailScreenProps} from '../../../../navigators/types/rootStack';

const AnnouncementDetailScreen = ({
  route: {
    params: {id, origin},
  },
}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<ArticleDetailType>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          label={AnnouncementFullNameEnum[origin]}
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
          label={AnnouncementFullNameEnum[origin]}
          onPressBackButton={handleGoBack}
        />
        <Spinner />
      </S.Root>
    );
  }

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header
        label={AnnouncementFullNameEnum[origin]}
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
