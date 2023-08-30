import React, {Dispatch, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
  ArticleCategoryTapState,
} from '../AnnouncementMainScreen';
import ArticleList from '../../../components/article/ArticleList';
import {Input, Txt} from '@uoslife/design-system';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {AnnouncementStackParamList} from '../../../navigators/AnnouncementStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AnnouncementSearchResultProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementSearchResult'
>;

// 내가 북마크한 글만
const AnnouncementSearchResultScreencontainer = ({
  route,
}: AnnouncementSearchResultProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useState<ArticleCategoryTapState>({
    list: ['일반공지', '학사공지', '채용공고', '창업공지'],
    selected: '일반공지',
  });

  // 수정 필요: props든, searchUrl이든 searchWord 자리에 동적으로 검색어가 들어가야함
  const searchWord = route.params.searchWord;

  useEffect(() => {
    try {
      setArticles(
        ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(
          item =>
            item.title.includes(searchWord) || item.body?.includes(searchWord),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 디자인: 확정시 반영 필요
  return (
    <S.screenWrapper>
      <Header label={'검색창'} />
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          zIndex: 100000,
          elevation: 100000,
        }}
        onPress={() => {
          Alert.alert('asfd');
          console.log(12312312);
        }}>
        {/* 해결 필요: Parent의 onPress 씹힘 이슈.. TextInput 등은 잘 됨.. */}
        <Input
          style={{
            backgroundColor: 'red',
            zIndex: -9999999,

            elevation: -9999999,
          }}
          value={searchWord}
        />
      </TouchableOpacity>

      <S.categoryTapAndContents>
        {articles.length === 0 ? (
          <Txt
            color={'black'}
            label={'자신이 북마크한 공지사항을 확인할 수 있어요'}
            typograph={'bodyLarge'}
          />
        ) : (
          <ArticleList articles={articles} showCategory />
        )}
      </S.categoryTapAndContents>
    </S.screenWrapper>
  );
};

export default AnnouncementSearchResultScreencontainer;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;

    z-index: 10;
  `,
  subScreenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;

    background-color: blue;
    z-index: 100;
  `,
  categoryTapAndContents: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
};
