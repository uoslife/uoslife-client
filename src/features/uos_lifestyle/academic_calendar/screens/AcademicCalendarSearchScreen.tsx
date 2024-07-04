import {useNavigation} from '@react-navigation/native';
import {View, ScrollView} from 'react-native';
import {useState, ComponentProps, useRef, useEffect} from 'react';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useQuery} from '@tanstack/react-query';
import {Txt} from '@uoslife/design-system';
import Header from '../../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';
import SearchInput from '../../../../components/molecules/common/forms/searchInput/SearchInput';
import {ScheduleItemType} from '../types/ScheduleItemType';
import CalendarAPI from '../api';
import ScheduleItem from '../components/ScheduleItem';

const AcademicCalendarSearchScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const [searchWord, setSearchWord] = useState<string>('');
  const [isSearchWordEntering, setSearchWordEntering] =
    useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  const searchInputProps: ComponentProps<typeof SearchInput> = {
    inputRef,
    placeholder: '일정을 검색하세요.',
    onFocus: () => {
      setSearchWordEntering(true);
      inputRef.current?.focus();
    },
    onChangeText: text => {
      setSearchWord(text);
    },
    onSubmitEditing: () => {
      setTriggerSearch(true);
    },
    onPressClear: () => {
      setSearchWord('');
      setSearchWordEntering(true);
      inputRef.current?.focus();
    },
    value: searchWord,
  };

  const {data: getMyscheduleItem, isSuccess} = useQuery<ScheduleItemType[]>({
    queryKey: ['SearchResults', searchWord],
    queryFn: async () =>
      await CalendarAPI.getSearchedSchedule({keyword: searchWord}),
    enabled: triggerSearch && !!searchWord,
  });
  useEffect(() => {
    if (isSuccess) {
      setTriggerSearch(false);
    }
  }, [isSuccess]);

  return (
    <View style={{paddingBottom: inset.bottom}}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label=""
        onPressBackButton={() => navigation.goBack()}>
        <SearchInput {...searchInputProps} />
      </Header>
      <S.Container>
        {isSuccess && getMyscheduleItem && triggerSearch && (
          <ScrollView
            contentContainerStyle={{
              padding: 16,
              paddingBottom: inset.top + 150,
            }}>
            {getMyscheduleItem.length === 0 ? (
              <S.TxtContainer>
                <Txt
                  label="검색결과가 없어요."
                  color="grey130"
                  typograph="labelLarge"
                />
              </S.TxtContainer>
            ) : (
              getMyscheduleItem.map((item, index) => (
                <S.ItemContainer>
                  <ScheduleItem
                    schedule={item}
                    editable={false}
                    checkedIdx={index}
                    isChecked={false}
                    onCheckboxChange={(id, isChecked) => {
                      console.log(
                        `Checkbox 상태 변경: ID=${id}, isChecked=${isChecked}`,
                      );
                    }}
                  />
                </S.ItemContainer>
              ))
            )}
          </ScrollView>
        )}
      </S.Container>
    </View>
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
