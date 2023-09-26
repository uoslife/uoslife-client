import React, {useState, useEffect} from 'react';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import ArticleList from '../../components/molecules/announcement/article/ArticleList';
import CategoryTab from '../../components/category-tab/CategoryTab';
import {Icon, IconsNameType, Txt} from '@uoslife/design-system';
import {AnnouncementNavigationProps} from '../../navigators/AnnouncementStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type ArticleCategoryName =
  | '일반공지'
  | '학사공지'
  | '채용공고'
  | '창업공지';

export type AnnouncementCategoryState = {
  name: ArticleCategoryName;
  isSelected: boolean;
}[];

export type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  category: ArticleCategoryName;
  body: string;
  department: string; // XX과
  uploadTime: Date;
  id: string;
  attachments: string[]; // 첨부파일
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
    attachments: i % 3 === 0 ? [] : ['첨부파일 1', '첨부파일 2'],
  }));

const AnnouncementMainScreen = () => {
  const insets = useSafeAreaInsets();
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleCategoryTabProps, setArticleCategoryTabProps] =
    useState<AnnouncementCategoryState>([
      {
        name: '일반공지',
        isSelected: true,
      },
      {
        name: '학사공지',
        isSelected: false,
      },
      {
        name: '채용공고',
        isSelected: false,
      },
      {
        name: '창업공지',
        isSelected: false,
      },
    ]);

  const selectCategory = (categoryName: ArticleCategoryName) => {
    setArticleCategoryTabProps(
      articleCategoryTabProps.map(item => ({
        ...item,
        isSelected: item.name === categoryName,
      })),
    );
  };

  const navigation = useNavigation<AnnouncementNavigationProps>();

  useEffect(() => {
    try {
      setArticles(
        ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(
          item =>
            item.category ===
            articleCategoryTabProps.find(item => item.isSelected)?.name,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }, [articleCategoryTabProps]);

  const icons: {iconName: IconsNameType; onPress: () => void}[] = [
    {
      iconName: 'search',
      onPress: () => {
        navigation.navigate('AnnouncementSearch');
      },
    },
    {
      iconName: 'bookmark',
      onPress: () => {
        navigation.navigate('AnnouncementBookmark');
      },
    },
    {
      iconName: 'notification',
      onPress: () => {
        // TODO: 바텀시트 여는 코드 작성
      },
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.ScreenContainer style={{paddingTop: insets.top}}>
      <Header label="공지사항" onPressBackButton={handleGoBack}>
        <S.HeaderIcons>
          {icons.map((item, i) => (
            <S.IconWrapper key={i} onPress={item.onPress}>
              <Icon
                name={item.iconName}
                color={'grey150'}
                height={24}
                width={24}
              />
            </S.IconWrapper>
          ))}
        </S.HeaderIcons>
      </Header>
      <S.CategoryTabAndContents>
        <CategoryTab
          categoryTabProps={articleCategoryTabProps}
          selectCategory={selectCategory}
        />
        <ArticleList articles={articles} />
      </S.CategoryTabAndContents>
    </S.ScreenContainer>
  );
};

export default AnnouncementMainScreen;

const S = {
  ScreenContainer: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  CategoryTabAndContents: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
  HeaderIcons: styled.View`
    // 헤더에서 backArrow, Label 외 영역 전부 사용
    flex: 1;

    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,
  IconWrapper: styled.Pressable`
    padding: 4px;
  `,
};
