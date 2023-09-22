import React, {useState, useEffect} from 'react';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import ArticleList from '../../../components/molecules/announcement/article/ArticleList';
import CategoryTab from '../../../components/category-tab/CategoryTab';
import {Icon, IconsNameType, Txt} from '@uoslife/design-system';
import {AnnouncementNavigationProps} from '../../../navigators/AnnouncementStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
        // 바텀시트 열기
      },
    },
  ];
  
  const handleGoBack=()=>{
    navigation.goBack();
  }

  return (
    <S.screenWrapper style={{paddingTop: insets.top}}>
      <Header label="공지사항" onPressBackButton={handleGoBack}>
        <S.headerIcons>
          {icons.map((item, i) => (
            <S.iconWrapper key={i} onPress={item.onPress}>
              <Icon
                name={item.iconName}
                color={'grey150'}
                height={24}
                width={24}
              />
            </S.iconWrapper>
          ))}
        </S.headerIcons>
      </Header>
      {/* 헤더 완성시 검색, 북마크, 알림 아이콘 넣기 */}
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
  headerIcons: styled.View`
    // 헤더에서 backArrow, Label 외 영역 전부 사용
    flex: 1;

    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,

  iconWrapper: styled.Pressable`
    padding: 4px;
  `,
};
