import React, {useState, useEffect, useRef} from 'react';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import ArticleList from '../../components/molecules/announcement/article/ArticleList';
import CategoryTab from '../../components/category-tab/CategoryTab';
import {Icon, IconsNameType} from '@uoslife/design-system';
import {AnnouncementNavigationProps} from '../../navigators/AnnouncementStackNavigator';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackHandler, Alert, Keyboard} from 'react-native';
import SearchInput from '../../components/forms/searchInput/SearchInput';
import {TextInput} from 'react-native-gesture-handler';
import SearchWordEnteringView from '../../components/molecules/announcement/search/SearchWordEnteringView';
import {
  AnnouncementCategoryState,
  Article,
  ArticleCategoryName,
} from '../../types/announcement.type';
import {ANNOUNCEMENT_LIST_MOCK_DATA} from '../../mock/announcement.mock';

const initialArticleCategoryTabProps: AnnouncementCategoryState = [
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
];

const AnnouncementMainScreen = () => {
  const insets = useSafeAreaInsets();

  const [articles, setArticles] = useState<Article[]>([]);
  const [articleCategoryTabProps, setArticleCategoryTabProps] =
    useState<AnnouncementCategoryState>(initialArticleCategoryTabProps);
  const [searchWordEntering, setSearchWordEntering] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  const navigation = useNavigation<AnnouncementNavigationProps>();

  const inputRef = useRef<TextInput>(null);

  const selectCategory = (categoryName: ArticleCategoryName) => {
    setArticleCategoryTabProps(
      articleCategoryTabProps.map(item => ({
        ...item,
        isSelected: item.name === categoryName,
      })),
    );
  };

  // TODO: 실 API 호출로 변경
  useEffect(() => {
    try {
      setArticles(
        ANNOUNCEMENT_LIST_MOCK_DATA.filter(
          item =>
            item.category ===
            articleCategoryTabProps.find(item => item.isSelected)?.name,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }, [articleCategoryTabProps]);

  // 이게 최선?
  const icons: {iconName: IconsNameType; onPress: () => void}[] = [
    {
      iconName: 'search',
      onPress: () => {
        setSearchWordEntering(true);
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

  const navigateToNewSearchScreen = (searchWord: string) => {
    navigation.push('AnnouncementSearch', {
      initialSearchWord: searchWord,
    });
    setTimeout(() => {
      setSearchWordEntering(false);
    }, 300);
  };

  const searchInputProps: React.ComponentProps<typeof SearchInput> = {
    inputRef,
    placeholder: '검색어를 입력해주세요.',
    onFocus: () => {
      setSearchWordEntering(true);
      inputRef.current?.focus();
    },
    onChangeText: text => {
      setSearchWord(text);
    },
    onSubmitEditing: () => {
      navigateToNewSearchScreen(searchWord);
    },
    onPressClear: () => {
      setSearchWord('');
      setSearchWordEntering(true);
      inputRef.current?.focus();
    },
    value: searchWord,
  };

  const onPressBackButton = () => {
    if (searchWordEntering) {
      setSearchWordEntering(false);
      inputRef.current?.blur();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const keyboardDidHideListener = () => {
      inputRef.current?.blur();
    };
    Keyboard.addListener('keyboardDidHide', keyboardDidHideListener);

    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  // 안드로이드에서 뒤로가기 버튼을 눌렀을 때의 동작 지정
  // REF: https://reactnavigation.org/docs/custom-android-back-button-handling/
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        onPressBackButton();

        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [onPressBackButton]),
  );

  return (
    <S.ScreenContainer style={{paddingTop: insets.top}}>
      {searchWordEntering ? (
        <>
          <Header onPressBackButton={onPressBackButton}>
            <SearchInput {...searchInputProps} />
          </Header>
          <SearchWordEnteringView
            navigateToNewSearchScreen={navigateToNewSearchScreen}
          />
        </>
      ) : (
        <>
          <Header label={'공지사항'} onPressBackButton={onPressBackButton}>
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
        </>
      )}
    </S.ScreenContainer>
  );
};

export default AnnouncementMainScreen;

const S = {
  ScreenContainer: styled.View`
    width: 100%;
    height: 100%;
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
