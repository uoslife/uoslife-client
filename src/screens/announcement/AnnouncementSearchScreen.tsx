import React, {useState, useRef, useEffect} from 'react';
import styled from '@emotion/native';
import {TextInput} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BackHandler, Keyboard} from 'react-native';
import {
  AnnouncementNavigationProps,
  AnnouncementSearchScreenProps,
} from '../../navigators/AnnouncementStackNavigator';
import SearchWordEnteringView, {
  HISTORIES_KEY,
} from '../../components/molecules/screens/announcement/search/SearchWordEnteringView';
import SearchInput from '../../components/molecules/common/forms/searchInput/SearchInput';
import Header from '../../components/molecules/common/header/Header';
import SearchResultView from '../../components/molecules/screens/announcement/search/SearchResultView';
import storage from '../../storage';

// 검색어 입력(isSearchWordEntering === true) / 검색 결과 두 상태로 구분(isSearchWordEntering === false)
const AnnouncementSearchScreen = ({
  route: {
    params: {initialSearchWord},
  },
}: AnnouncementSearchScreenProps) => {
  const [isSearchWordEntering, setSearchWordEntering] =
    useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>(initialSearchWord);

  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AnnouncementNavigationProps>();

  const navigateToNewSearchScreen = (searchWord: string) => {
    // 1. 입력된 검색어로 새로운 검색 결과 screen stack 생성
    navigation.push('AnnouncementSearch', {
      initialSearchWord: searchWord,
    });
    // 2. 새로운 screen stack에서 뒤로가기를 눌렀을 때, 이전의 검색결과 페이지로 복귀
    setTimeout(() => {
      setSearchWord(initialSearchWord);
      setSearchWordEntering(false);
    }, 300);

    // 2에서 delay를 주는 이유: 이전 페이지의 isSearchWordEntering state 변경이 UI에 노출되지 않기 하기 위해
    // 순차실행 보장에 흔히 쓰이는 Promise도 써 보았지만, '애니메이션 시작'을 push 함수의 동작 종료로 판정함으로 인하여 여전히 중첩되는 문제가 발생 -> setTimeout으로 확실히 감추기로 결정
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
      storage.set(
        HISTORIES_KEY,
        JSON.stringify([
          searchWord,
          ...JSON.parse(storage.getString(HISTORIES_KEY) ?? '[]'),
        ]),
      );
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

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header onPressBackButton={onHeaderBackPress}>
        <SearchInput {...searchInputProps} />
      </Header>
      {isSearchWordEntering ? (
        <SearchWordEnteringView
          navigateToNewSearchScreen={navigateToNewSearchScreen}
        />
      ) : (
        <SearchResultView searchWord={initialSearchWord} />
      )}
    </S.Root>
  );
};

export default AnnouncementSearchScreen;

const S = {
  Root: styled.View`
    width: 100%;
    height: 100%;
  `,
};
