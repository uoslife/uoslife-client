import React, {useState, useEffect, useRef, useCallback} from 'react';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import ArticleList from '../../components/molecules/announcement/article/ArticleList';
import CategoryTab from '../../components/molecules/announcement/category-tab/CategoryTab';
import {Icon, IconsNameType} from '@uoslife/design-system';
import {AnnouncementNavigationProps} from '../../navigators/AnnouncementStackNavigator';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackHandler, Keyboard} from 'react-native';
import SearchInput from '../../components/forms/searchInput/SearchInput';
import {TextInput} from 'react-native-gesture-handler';
import SearchWordEnteringView from '../../components/molecules/announcement/search/SearchWordEnteringView';
import {useAtomValue} from 'jotai';
import AnnouncementAPI from '../../api/services/utility/announcement/announcementAPI';
import {selectedCategoryOriginAtom} from '../../atoms/announcement';
import {AnnouncementOriginName} from '../../api/services/utility/announcement/announcementAPI.type';
import {ArticleItemType, ArticleListType} from '../../types/announcement.type';

type ArticlePageNumberState = {
  [key in AnnouncementOriginName]: number;
};

type ArticlesState = {
  [key in AnnouncementOriginName]: ArticleItemType[];
};

const initialArticlePageNumberState: ArticlePageNumberState = {
  FA1: 0,
  FA2: 0,
  FA34: 0,
  FA35: 0,
};

const initialArticlesState: ArticlesState = {
  FA1: [],
  FA2: [],
  FA34: [],
  FA35: [],
};

// 페이지네이션 설정
const ELEMENTS_PER_PAGE = 15;

const AnnouncementMainScreen = () => {
  const insets = useSafeAreaInsets();
  const [articlePageNumber, setArticlePageNumber] =
    useState<ArticlePageNumberState>(initialArticlePageNumberState);
  // SPA UX 개선을 위해 Category별로 각각 state를 가지고 있기로 결정
  const [articles, setArticles] = useState<ArticlesState>(initialArticlesState);

  const [isSearchWordEntering, setSearchWordEntering] =
    useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const navigation = useNavigation<AnnouncementNavigationProps>();
  const inputRef = useRef<TextInput>(null);
  const selectedCategoryOrigin = useAtomValue(selectedCategoryOriginAtom);

  const getNewArticlesAndUpdateState = async ({
    origin,
  }: {
    origin: AnnouncementOriginName;
  }) => {
    // state로부터 몇페이지인지 가져오기
    const page = articlePageNumber[origin];
    console.log('\n\n\n');
    console.log({page});
    console.log('\n\n\n');

    try {
      const res = await AnnouncementAPI.getAnnouncementsForMain({
        origin,
        page,
        size: ELEMENTS_PER_PAGE,
      });

      const newArticles = res.content;

      console.log({newArticles});

      setArticles(prev => {
        return {
          ...prev,
          [origin]: [...prev[origin], ...newArticles],
        };
      });

      setArticlePageNumber(prev => {
        return {
          ...prev,
          [origin]: prev[origin] + 1,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getInitialArticlesForMain = async () => {
      await getNewArticlesAndUpdateState({origin: 'FA1'});
      await getNewArticlesAndUpdateState({origin: 'FA2'});
      await getNewArticlesAndUpdateState({origin: 'FA34'});
      await getNewArticlesAndUpdateState({origin: 'FA35'});
    };

    getInitialArticlesForMain();
  }, []);

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
      setSearchWord('');
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

  const onHeaderBackPress = () => {
    if (isSearchWordEntering) {
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
      const onAndroidBackPress = () => {
        onHeaderBackPress();

        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onAndroidBackPress,
      );

      return () => subscription.remove();
    }, [onHeaderBackPress]),
  );

  const articleListReachEndHandler = async () => {
    await getNewArticlesAndUpdateState({origin: selectedCategoryOrigin});
  };

  return (
    <S.ScreenContainer style={{paddingTop: insets.top}}>
      {isSearchWordEntering ? (
        <>
          <Header onPressBackButton={onHeaderBackPress}>
            <SearchInput {...searchInputProps} />
          </Header>
          <SearchWordEnteringView
            navigateToNewSearchScreen={navigateToNewSearchScreen}
          />
        </>
      ) : (
        <>
          <Header label={'공지사항'} onPressBackButton={onHeaderBackPress}>
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
            <CategoryTab />
            <ArticleList
              onEndReached={articleListReachEndHandler}
              articles={articles[selectedCategoryOrigin]}
            />
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
