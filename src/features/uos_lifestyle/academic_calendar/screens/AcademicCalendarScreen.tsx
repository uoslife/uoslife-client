import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {useCallback, useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AcademicCalendarNavigationProp} from '../types/AcademicCalendar';
import Header from '../../../../components/molecules/common/header/Header';
import {ScheduleTabEnum} from '../constants';
import storage from '../../../../storage';
import ScheduleItem from '../components/ScheduleItem';
import CalendarAPI from '../api';
import {
  DeleteNotificationParams,
  ISchedule,
  SetBookmarkParams,
  SetNotificationParams,
} from '../api/academicCalendarAPI.type';
import Skeleton from '../../../../components/molecules/common/skeleton/Skeleton';
import {getNotiTime} from '../utils';

console.log(storage.getString('accessToken'));
const AcademicCalendarScreen = () => {
  const queryClient = useQueryClient();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<AcademicCalendarNavigationProp>();
  const date = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedTab, setSelectedTab] = useState(ScheduleTabEnum.ALL);
  const [editable, setEditable] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<boolean[]>([]);

  const checkboxHandler = (id: number, isChecked: boolean) => {
    const tmp = [...checkedList];
    const Btmp = tmp.slice(id, checkedList.length);
    const Ftmp = tmp.slice(0, id);
    let resultArray: boolean[] = [];
    resultArray = resultArray.concat(Btmp, [isChecked], Ftmp);
    setCheckedList(resultArray);
  };

  const {data: allScheduleItemData, isFetching: isFetchingAll} = useQuery<
    ISchedule[]
  >({
    queryKey: ['allScheduleItems'],
    queryFn: () => {
      return CalendarAPI.getMonthlySchedule({month: 5});
    },
  });

  const {data: myScheduleItemData, isFetching: isFetchingMy} = useQuery<
    ISchedule[]
  >({
    queryKey: ['myScheduleItems'],
    queryFn: () => {
      return CalendarAPI.getMySchedule();
    },
  });

  const setNotificationMutation = useMutation({
    mutationKey: ['myScheduleItems'],
    mutationFn: (params: SetNotificationParams) =>
      CalendarAPI.setNotification(params),
  });

  const delNotificationMutation = useMutation({
    mutationKey: ['myScheduleItems'],
    mutationFn: (params: DeleteNotificationParams) =>
      CalendarAPI.deleteNotification(params),
  });

  const bookmarkMutation = useMutation({
    mutationKey: ['allScheduleItems'],
    mutationFn: (params: SetBookmarkParams) => CalendarAPI.setBookmark(params),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['allScheduleItems'],
      });
    },
    onError(error, variables, context) {
      console.log(`errror : ${error}`);
      console.log(variables);
      console.log(context);
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

  const notificationHandler = useCallback(
    (id: number, startDate: string, isNotification: boolean) => {
      if (isNotification) {
        delNotificationMutation.mutate({notificationId: [id]});
      } else {
        const [oneday, twoday] = getNotiTime(startDate);
        setNotificationMutation.mutate({scheduleId: id, notifyAt: oneday});
        setNotificationMutation.mutate({scheduleId: id, notifyAt: twoday});
      }
    },
    [setNotificationMutation],
  );
  useEffect(() => {
    if (!selectedTab) return;
    if (selectedTab === ScheduleTabEnum.MY_SCHEDULE) {
      queryClient.invalidateQueries({
        queryKey: ['myScheduleItems'],
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ['allScheduleItems'],
      });
    }
  }, [selectedTab]);

  return (
    <View>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="학사일정"
        onPressBackButton={() => navigation.goBack()}
      />
      <S.Container>
        <S.TodayInfoBox>
          <Txt label="오늘" color="grey130" typograph="titleSmall" />
          <Txt
            label={`${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일 (${week[date.getDay()]})`}
            color="grey190"
            typograph="titleLarge"
          />
        </S.TodayInfoBox>
        <S.TabContainer>
          <S.TabWrapper>
            <S.TabButton
              isSelected={selectedTab === ScheduleTabEnum.ALL}
              onPress={() => setSelectedTab(ScheduleTabEnum.ALL)}>
              <Txt
                label={ScheduleTabEnum.ALL}
                color={
                  selectedTab === ScheduleTabEnum.ALL
                    ? 'primaryBrand'
                    : 'grey190'
                }
                typograph="bodyLarge"
              />
            </S.TabButton>
            <S.TabButton
              isSelected={selectedTab === ScheduleTabEnum.MY_SCHEDULE}
              onPress={() => setSelectedTab(ScheduleTabEnum.MY_SCHEDULE)}>
              <Txt
                label={ScheduleTabEnum.MY_SCHEDULE}
                color={
                  selectedTab === ScheduleTabEnum.MY_SCHEDULE
                    ? 'primaryBrand'
                    : 'grey190'
                }
                typograph="bodyLarge"
              />
            </S.TabButton>
          </S.TabWrapper>

          <S.IconWrapper
            onPress={() => navigation.navigate('academic_calendar_search')}>
            <Icon name="search" width={24} height={24} />
          </S.IconWrapper>
        </S.TabContainer>
      </S.Container>
      <S.ScheduleContainer>
        {(isFetchingAll || isFetchingMy) && <Skeleton variant="card" />}
        {selectedTab === ScheduleTabEnum.ALL
          ? allScheduleItemData?.map((scheduleItem, idx: number) => {
              return (
                <ScheduleItem
                  key={scheduleItem.scheduleId}
                  schedule={scheduleItem}
                  editable={editable}
                  checkedIdx={idx}
                  isChecked={checkedList[idx]}
                  onCheckboxChange={checkboxHandler}
                  tabType={selectedTab}
                  bookmarkHandler={bookmarkHandler}
                />
              );
            })
          : myScheduleItemData?.map((scheduleItem, idx: number) => {
              return (
                <ScheduleItem
                  key={scheduleItem.scheduleId}
                  schedule={scheduleItem}
                  editable={editable}
                  checkedIdx={idx}
                  isChecked={checkedList[idx]}
                  onCheckboxChange={checkboxHandler}
                  tabType={selectedTab}
                  notificationHandler={notificationHandler}
                />
              );
            })}
      </S.ScheduleContainer>
    </View>
  );
};

export default AcademicCalendarScreen;

const S = {
  Container: styled.View`
    display: flex;
    gap: 10px;
  `,
  ScheduleContainer: styled.View`
    display: flex;
    gap: 12px;
    padding: 0 16px;
  `,
  TodayInfoBox: styled.View`
    margin-top: 24px;
    padding: 0 16px;
    gap: 4px;
  `,
  TabContainer: styled.View`
    width: 100%;
    padding: 0px 16px;
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey20};
  `,
  TabWrapper: styled.View`
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,
  TabButton: styled.Pressable<{isSelected: boolean}>`
    width: auto;
    padding: 14px 0px;
    margin-bottom: ${({isSelected}) => (isSelected ? '-1px' : '0')};
    border-bottom-width: ${({isSelected}) => (isSelected ? '2px' : '0')};
    border-bottom-color: ${({isSelected}) =>
      isSelected ? colors.primaryBrand : 'transparent'};
  `,
  IconWrapper: styled.Pressable`
    padding: 12px;
  `,
};
