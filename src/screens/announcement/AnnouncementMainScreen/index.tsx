import React, {useState, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import ArticleList from '../../../components/article/ArticleList';
import CategoryTab from '../../../components/category-tab/CategoryTab';
import {Icon, Txt} from '@uoslife/design-system';
import {AnnouncementNavigationProps} from '../../../navigators/AnnouncementStackNavigator';
import {useNavigation} from '@react-navigation/native';

export type ArticleCategoryName =
  | '일반공지'
  | '학사공지'
  | '채용공고'
  | '창업공지';
export type ArticleCategoryTapState = {
  list: ArticleCategoryName[];
  selected: ArticleCategoryName;
};
export type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  category: ArticleCategoryName;
  body: string;
  department: string; // XX과
  uploadTime: Date;
  id: string;
  attachments?: string[]; // 첨부파일
};

export const ANNOUNCEMENT_ARTICLE_DUMMY_DATA: Article[] = new Array(15)
  .fill(null)
  .map((_, i) => ({
    bookmarkCnt: i % 5,
    department: `category${i}`,
    title: `titletitletitletitletitletitletitletitletitletitleletitletitletitle${i}`,
    uploadTime: new Date(),
    bookmarkByMe: !!(i % 5) && !!(i % 2),
    body: 'bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody',
    id: `id${i}`,
    category:
      i % 4 === 0
        ? '일반공지'
        : i % 4 === 1
        ? '학사공지'
        : i % 4 === 2
        ? '채용공고'
        : '창업공지',
  }));

const AnnouncementMainScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleCategoryTapProps, setArticleCategoryTapProps] =
    useState<ArticleCategoryTapState>({
      list: ['일반공지', '학사공지', '채용공고', '창업공지'],
      selected: '일반공지',
    });

  const selectCategory = (categoryName: ArticleCategoryName) => {
    setArticleCategoryTapProps({
      ...articleCategoryTapProps,
      selected: categoryName,
    });
  };

  const navigation = useNavigation<AnnouncementNavigationProps>();

  useEffect(() => {
    console.log(ANNOUNCEMENT_ARTICLE_DUMMY_DATA);
    try {
      // 선택한 메뉴에 해당되는 글만
      setArticles(
        ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(
          article => article.category === articleCategoryTapProps.selected,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }, [articleCategoryTapProps]);

  return (
    <S.screenWrapper>
      <Header label="공지사항" />
      {/* 헤더 완성시 검색, 북마크, 알림 아이콘 넣기 */}
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('AnnouncementBookmark');
          }}>
          <Icon name={'bookmark'} color={'grey150'} height={32} width={32} />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('AnnouncementSearchWindow', {});
          }}>
          <Icon name={'search'} color={'grey150'} height={32} width={32} />
        </Pressable>
        <Pressable>
          <Icon
            name={'notification'}
            color={'grey150'}
            height={32}
            width={32}
          />
        </Pressable>
      </View>
      <S.categoryTapAndContents>
        <CategoryTab
          categoryTabProps={articleCategoryTapProps}
          selectCategory={selectCategory}
        />
        <ArticleList articles={articles} />
      </S.categoryTapAndContents>
    </S.screenWrapper>
  );
};

export default AnnouncementMainScreen;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  categoryTapAndContents: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
};
