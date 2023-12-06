import {atom, useAtom} from 'jotai';
import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/molecules/common/header/Header';
import {AnnouncementDetailScreenProps} from '../../navigators/AnnouncementStackNavigator';
import {ArticleDetailType} from '../../types/announcement.type';
import {announcementFullName} from '../../configs/announcement';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import AnnouncementDetailScreenContent from '../../components/molecules/screens/announcement/announcement-detail/AnnouncementContent';
import Spinner from '../../components/atoms/spinner/Spinner';
import {
  BookmarkKeyValueMap,
  bookmarksAtom,
} from '../../store/announcement/bookmark';
import BookmarkAPI from '../../api/services/util/bookmark/bookmarkAPI';

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

        setArticle({
          ...loadedArticle,
          isBookmarkedByMe: false,
        });
      } catch (error) {}
      setIsPending(false);
    })();
  }, []);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

  useEffect(() => {
    if (Object.keys(bookmarks).length !== 0) return;

    (async () => {
      const converted: BookmarkKeyValueMap = {};

      converted[id] = atom(false);

      const loadedFromServer = (await BookmarkAPI.getBookmarkedArticles({}))
        .bookmarkInformation;

      if (!loadedFromServer) {
        setBookmarks({});
        return;
      }

      loadedFromServer.forEach(item => {
        converted[item] = atom(true);
      });

      setBookmarks(converted);
    })();
  }, []);

  useEffect(() => {
    if (bookmarks[id] === undefined)
      setBookmarks(prev => ({...prev, [id]: atom(false)}));
  }, []);

  const bookmarkAtom = bookmarks[id];

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header
        label={announcementFullName[origin]}
        onPressBackButton={handleGoBack}
      />
      {isPending ? (
        <Spinner />
      ) : (
        article &&
        bookmarkAtom && (
          <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            <AnnouncementDetailScreenContent
              {...article}
              bookmarkAtom={bookmarkAtom}
            />
          </ScrollView>
        )
      )}
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
