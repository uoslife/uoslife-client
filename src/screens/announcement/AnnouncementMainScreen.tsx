import React, {useState, useEffect, useRef, useCallback} from 'react';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import ArticleList from '../../components/molecules/announcement/article/ArticleList';
import CategoryTab from '../../components/molecules/announcement/category-tab/CategoryTab';
import {Icon, IconsNameType} from '@uoslife/design-system';
import {AnnouncementNavigationProps} from '../../navigators/AnnouncementStackNavigator';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackHandler, Keyboard, Text} from 'react-native';
import SearchInput from '../../components/forms/searchInput/SearchInput';
import {TextInput} from 'react-native-gesture-handler';
import SearchWordEnteringView from '../../components/molecules/announcement/search/SearchWordEnteringView';
import {useAtomValue} from 'jotai';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import {
  AnnouncementCategoryStatusType,
  AnnouncmentCategoryOriginType,
  categoryStatusAtom,
} from '../../atoms/announcement';
import {AnnouncementOriginNameType} from '../../api/services/util/announcement/announcementAPI.type';
import {ArticleItemType} from '../../types/announcement.type';

type ArticlesType = {
  origin: AnnouncmentCategoryOriginType;
  content: ArticleItemType[];
};

// 페이지네이션 설정
const ELEMENTS_PER_PAGE = 10;

const getOriginFromCategoryState = (
  categoryState: AnnouncementCategoryStatusType,
) => {
  const selectedState = categoryState.find(item => item.isSelected === true);
  return selectedState!.origin;
};

const AnnouncementMainScreen = () => {
  const insets = useSafeAreaInsets();
  const categoryState = useAtomValue(categoryStatusAtom);

  const [articles, setArticles] = useState<ArticlesType>();
  const [currentOrigin, setCurrentOrigin] =
    useState<AnnouncmentCategoryOriginType>(
      getOriginFromCategoryState(categoryState),
    );

  const [isSearchWordEntering, setSearchWordEntering] =
    useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const navigation = useNavigation<AnnouncementNavigationProps>();
  const inputRef = useRef<TextInput>(null);

  const getArticles = async (origin: AnnouncementOriginNameType) => {
    const page = articles ? articles.content.length : 0;

    try {
      const res = await AnnouncementAPI.getAnnouncements({
        origin,
        page,
        size: ELEMENTS_PER_PAGE,
      });
      const newArticles = res.content;

      console.log({newArticles});

      if (articles && origin !== articles!.origin)
        setArticles({origin, content: newArticles});

      setArticles(prev =>
        prev
          ? {origin, content: [...prev.content, ...newArticles]}
          : {origin, content: newArticles},
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getArticles(currentOrigin);
    })();
  }, [currentOrigin]);

  useEffect(() => {
    const origin = getOriginFromCategoryState(categoryState);
    setCurrentOrigin(origin);
  }, [categoryState]);

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
    await getArticles(currentOrigin);
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
            {!articles ? (
              <Text>로딩중</Text>
            ) : (
              <ArticleList
                articles={articles.content}
                onEndReached={articleListReachEndHandler}
              />
            )}
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
