import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {useState, ComponentProps, useRef, useEffect, useCallback} from 'react';
import styled from '@emotion/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Txt} from '@uoslife/design-system';
import Header from '../../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';
import SearchInput from '../../../../components/molecules/common/forms/searchInput/SearchInput';
import CalendarAPI from '../api';
import ScheduleItem from '../components/ScheduleItem';
import Skeleton from '../../../../components/molecules/common/skeleton/Skeleton';
import {ISchedule, SetBookmarkParams} from '../api/academicCalendarAPI.type';
import {ScheduleTabEnum} from '../constants';

const AcademicCalendarSearchScreen = () => {
  const queryClient = useQueryClient();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const [searchWord, setSearchWord] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

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
    data: searchedScheduleItem,
    isSuccess,
    isFetching,
  } = useQuery<ISchedule[]>({
    queryKey: ['SearchResults', searchWord],
    queryFn: async () =>
      await CalendarAPI.getSearchedSchedule({keyword: searchWord}),
    enabled: triggerSearch && !!searchWord,
  });

  const bookmarkMutation = useMutation({
    mutationKey: ['SearchResults'],
    mutationFn: (params: SetBookmarkParams) => CalendarAPI.setBookmark(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['SearchResults'],
      });
    },
  });

  const bookmarkHandler = useCallback(
    (param: number, flag: boolean) => {
      bookmarkMutation.mutate({
        scheduleId: param,
        isBookmarked: !flag,
      });
    },
    [bookmarkMutation],
  );

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
            {searchedScheduleItem?.length === 0 ? (
              <S.TxtContainer>
                <Txt
                  label="검색결과가 없어요."
                  color="grey130"
                  typograph="labelLarge"
                />
              </S.TxtContainer>
            ) : (
              searchedScheduleItem.map((item, index) => (
                <S.ItemContainer>
                  <ScheduleItem
                    schedule={item}
                    onCheckboxChange={() => {}}
                    isChecked={false}
                    editable={false}
                    checkedIdx={index}
                    tabType={ScheduleTabEnum.ALL}
                    bookmarkHandler={bookmarkHandler}
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
