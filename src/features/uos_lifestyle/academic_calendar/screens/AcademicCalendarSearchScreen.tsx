import {useNavigation} from '@react-navigation/native';
import {View, ScrollView} from 'react-native';
import {useState, ComponentProps, useRef, useEffect} from 'react';
import styled from '@emotion/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useQuery} from '@tanstack/react-query';
import {Txt} from '@uoslife/design-system';
import Header from '../../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';
import SearchInput from '../../../../components/molecules/common/forms/searchInput/SearchInput';
import {ScheduleItemType} from '../types/ScheduleItemType';
import CalendarAPI from '../api';
import ScheduleItem from '../components/ScheduleItem';
import Skeleton from '../../../../components/molecules/common/skeleton/Skeleton';
import {ISchedule} from '../api/academicCalendarAPI.type';

const AcademicCalendarSearchScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const [searchWord, setSearchWord] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);
  const [uiItem, setUiItem] = useState<ScheduleItemType[]>([]);

  const searchInputProps: ComponentProps<typeof SearchInput> = {
    inputRef,
    placeholder: '일정을 검색하세요.',
    onFocus: () => {
      inputRef.current?.focus();
    },
    onChangeText: text => {
      setSearchWord(text);
      setTriggerSearch(false);
    },
    onSubmitEditing: () => {
      setTriggerSearch(true);
    },
    onPressClear: () => {
      setSearchWord('');
      inputRef.current?.focus();
    },
    value: searchWord,
  };

  const {
    data: getMyscheduleItem,
    isSuccess,
    isFetching,
  } = useQuery<ISchedule[]>({
    queryKey: ['SearchResults', searchWord],
    queryFn: async () =>
      await CalendarAPI.getSearchedSchedule({keyword: searchWord}),
    enabled: triggerSearch && !!searchWord,
  });
  useEffect(() => {
    if (isSuccess) {
      // backend data => front end data
      const bookmarkOnClick = () => {
        console.log('bookmarked!');
      };
      const ui: ScheduleItemType[] = getMyscheduleItem.map(item => {
        const tmp = {...item, onClick: bookmarkOnClick};
        return tmp;
      });
      setUiItem(ui);
    }
  }, [isSuccess]);

  return (
    <SafeAreaView style={{paddingBottom: inset.bottom, flex: 1}}>
      <Header
        style={{marginBottom: 8}}
        label=""
        onPressBackButton={() => navigation.goBack()}>
        <SearchInput {...searchInputProps} />
      </Header>
      <S.Container>
        {isFetching && (
          <ScrollView
            contentContainerStyle={{
              padding: 16,
            }}>
            <Skeleton variant="card" />
          </ScrollView>
        )}
        {isSuccess && triggerSearch && (
          <ScrollView
            contentContainerStyle={{
              padding: 16,
            }}>
            {uiItem.length === 0 ? (
              <S.TxtContainer>
                <Txt
                  label="검색결과가 없어요."
                  color="grey130"
                  typograph="labelLarge"
                />
              </S.TxtContainer>
            ) : (
              uiItem.map((item, index) => (
                <S.ItemContainer>
                  <ScheduleItem
                    schedule={item}
                    onCheckboxChange={() => {
                      console.log('f');
                    }}
                    isChecked={false}
                    editable={false}
                    checkedIdx={index}
                  />
                </S.ItemContainer>
              ))
            )}
          </ScrollView>
        )}
      </S.Container>
    </SafeAreaView>
  );
};

const S = {
  Container: styled.View`
    height: 100%;
  `,
  ItemContainer: styled.View`
    margin-bottom: 16px;
  `,
  TxtContainer: styled.View`
    display: flex;
    width: 360px;
    padding: 48px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
};

export default AcademicCalendarSearchScreen;
