import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ComponentProps,
  Suspense,
} from 'react';
import styled from '@emotion/native';
import {Icon, IconsNameType} from '@uoslife/design-system';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackHandler, Keyboard} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import SearchInput from '../../components/molecules/common/forms/searchInput/SearchInput';
import SearchWordEnteringView from '../../components/molecules/screens/announcement/search/SearchWordEnteringView';
import {AnnouncementNavigationProps} from '../../navigators/AnnouncementStackNavigator';
import Header from '../../components/molecules/common/header/Header';
import useModal from '../../hooks/useModal';
import AlertSettingOverlay from '../../components/molecules/screens/announcement/modalContents/AlertSettingOverlay';
// import MainArticleListsControl from '../../components/molecules/screens/announcement/main/MainArticleListsControl';
import AnimatePress from '../../components/animations/pressable_icon/AnimatePress';
import CategoryTab from '../../components/molecules/screens/announcement/tab/CategoryTab';
import MainArticleList from '../../components/molecules/screens/announcement/main/MainArticleList';
import Spinner from '../../components/atoms/spinner/Spinner';

// TODO: 혼재되어있는 검색 관련 로직 분리, 컴포넌트 추상화 수준 맞추기
const AnnouncementMainScreen = () => {
  const insets = useSafeAreaInsets();
  const [isSearchWordEntering, setSearchWordEntering] =
    useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const navigation = useNavigation<AnnouncementNavigationProps>();
  const inputRef = useRef<TextInput>(null);

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

  const [openBottomSheet, , BottomSheet] = useModal('BOTTOM_SHEET');

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
                  <AnimatePress
                    key={item.iconName}
                    variant="scale_up"
                    onPress={item.onPress}
                    style={{padding: 4}}>
                    <Icon
                      name={item.iconName}
                      color="grey150"
                      height={24}
                      width={24}
                    />
                  </AnimatePress>
                ))}
              </S.HeaderIcons>
            </Header>
            <S.CategoryTabAndContents>
              {/* <MainArticleListsControl /> */}
              <CategoryTab />
              <Suspense fallback={<Spinner />}>
                <MainArticleList />
              </Suspense>
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
};
