import {useState, useEffect, useRef, useCallback, ComponentProps} from 'react';
import styled from '@emotion/native';
import {Icon, IconsNameType} from '@uoslife/design-system';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackHandler, Keyboard} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {useAtomValue} from 'jotai';
import SearchInput from '../../components/molecules/common/forms/searchInput/SearchInput';
import SearchWordEnteringView from '../../components/molecules/screens/announcement/search/SearchWordEnteringView';
import {AnnouncementNavigationProps} from '../../navigators/AnnouncementStackNavigator';
import CategoryTab from '../../components/molecules/screens/announcement/category-tab/CategoryTab';
import ArticleList from '../../components/molecules/screens/announcement/article-list/ArticleList';
import Header from '../../components/molecules/common/header/Header';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import {
  AnnouncementCategoryStatusType,
  categoryStatusAtom,
} from '../../store/announcement';
import {AnnouncementOriginNameType} from '../../api/services/util/announcement/announcementAPI.type';
import useModal from '../../hooks/useModal';
import Spinner from '../../components/atoms/spinner/Spinner';
import {ArticleItemType} from '../../types/announcement.type';
import useBookmarkOnLocal from '../../hooks/useBookmarkOnLocal';
import AlertSettingOverlay from '../../components/molecules/screens/announcement/modalContents/AlertSettingOverlay';

const ELEMENTS_PER_PAGE = 10;

const getOriginFromCategoryState = (
  categoryState: AnnouncementCategoryStatusType,
) => {
  const selectedState = categoryState.find(item => item.isSelected === true);
  return selectedState!.origin;
};

// TODO: 지저분한 Search 관련 코드와 컴포넌트 구조 정리
const AnnouncementMainScreen = () => {
  const insets = useSafeAreaInsets();
  const [isSearchWordEntering, setSearchWordEntering] =
    useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [isPending, setIsPending] = useState(false);
  const navigation = useNavigation<AnnouncementNavigationProps>();
  const inputRef = useRef<TextInput>(null);
  const listRef = useRef<FlatList>(null);

  const {getBookmarkIdList} = useBookmarkOnLocal();

  const [articleListObject, setArticleListObject] = useState<{
    [key in AnnouncementOriginNameType]: ArticleItemType[];
  }>({
    FA1: [],
    FA2: [],
    FA34: [],
    FA35: [],
  });

  const [articlePageObject, setArticlePageObject] = useState<{
    [key in AnnouncementOriginNameType]: number;
  }>({
    FA1: 0,
    FA2: 0,
    FA34: 0,
    FA35: 0,
  });

  const categoryStatus = useAtomValue(categoryStatusAtom);
  const currentOrigin = getOriginFromCategoryState(categoryStatus);
  const currentArticles = articleListObject[currentOrigin];

  useEffect(() => {
    listRef.current?.scrollToOffset({offset: 0});
  }, [currentOrigin, listRef]);

  // 탭 이동시 북마크가 이전 상태로 보이는 UX 이슈 해결을 위한 코드
  // TODO: 첫 의도대로 article 캐싱을 위해 대책 찾기(북마크 상태를 Global Level에서 관리하는 등..)
  useEffect(() => {
    setArticleListObject(prev => ({...prev, [currentOrigin]: []}));
    setArticlePageObject(prev => ({...prev, [currentOrigin]: 0}));
  }, [setArticleListObject, setArticlePageObject, currentOrigin]);

  const loadNewArticlesByOrigin = async (
    origin: AnnouncementOriginNameType,
  ) => {
    setIsPending(true);

    try {
      const params = {
        origin,
        page: articlePageObject[origin],
        size: ELEMENTS_PER_PAGE,
      };

      const res = await AnnouncementAPI.getAnnouncements(params);

      const idList = await getBookmarkIdList();

      const loadedArticles: ArticleItemType[] = res.content.map(item => ({
        ...item,
        isBookmarkedByMe: idList.includes(item.id),
      }));

      setArticleListObject(prev => ({
        ...prev,
        [origin]: [...prev[origin], ...loadedArticles],
      }));
      setArticlePageObject(prev => ({
        ...prev,
        [origin]: prev[origin] + 1,
      }));
    } catch (error) {}

    setIsPending(false);
  };

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
      onPress: () => openBottomSheet(),
    },
  ];

  const navigateToNewSearchScreen = (word: string) => {
    navigation.push('AnnouncementSearch', {
      initialSearchWord: word,
    });
    setTimeout(() => {
      setSearchWordEntering(false);
      setSearchWord('');
    }, 300);
  };

  const searchInputProps: ComponentProps<typeof SearchInput> = {
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

  const onHeaderBackPress = useCallback(() => {
    if (isSearchWordEntering) {
      setSearchWordEntering(false);
      inputRef.current?.blur();
    } else {
      navigation.goBack();
    }
  }, [setSearchWordEntering, navigation, inputRef, isSearchWordEntering]);

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
    useCallback(() => {
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

  const articleListReachEndHandler = () => {
    loadNewArticlesByOrigin(currentOrigin);
  };

  const [openBottomSheet, , BottomSheet] = useModal('BOTTOM_SHEET');

  const isInitiallyPending = isPending && currentArticles.length === 0;

  return (
    <>
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
            <Header label="공지사항" onPressBackButton={onHeaderBackPress}>
              <S.HeaderIcons>
                {icons.map(item => (
                  <S.IconWrapper key={item.iconName} onPress={item.onPress}>
                    <Icon
                      name={item.iconName}
                      color="grey150"
                      height={24}
                      width={24}
                    />
                  </S.IconWrapper>
                ))}
              </S.HeaderIcons>
            </Header>
            <S.CategoryTabAndContents>
              <CategoryTab />
              {isInitiallyPending ? (
                <Spinner />
              ) : (
                <ArticleList
                  ListFooterComponent={isPending ? <Spinner /> : null}
                  ref={listRef}
                  showCategoryName={false}
                  articles={currentArticles}
                  onEndReached={articleListReachEndHandler}
                />
              )}
            </S.CategoryTabAndContents>
          </>
        )}
      </S.ScreenContainer>
      <BottomSheet>
        <AlertSettingOverlay />
      </BottomSheet>
    </>
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

    flex: 1;
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
