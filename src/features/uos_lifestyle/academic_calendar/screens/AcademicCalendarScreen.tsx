import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {useCallback, useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AcademicCalendarNavigationProp} from '../types/AcademicCalendar';
import Header from '../../../../components/molecules/common/header/Header';
import {ScheduleTabEnum} from '../constants';
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
import FilterButtonGroup from '../components/FilterButtonGroup';
import MonthlyFilter from '../components/MonthlyFilter';
import useModal from '../../../../hooks/useModal';
import AnalyticsService from '../../../../services/analytics';
import useUserState from '../../../../hooks/useUserState';

const AcademicCalendarScreen = () => {
  const queryClient = useQueryClient();
  const {user} = useUserState();
  const navigation = useNavigation<AcademicCalendarNavigationProp>();
  const date = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedTab, setSelectedTab] = useState(ScheduleTabEnum.ALL);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const currentDate: Date = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const year: number = currentDate.getFullYear();

  const [openModal, closeModal, Modal] = useModal('MODAL');

  const handlePreviousMonth = () => {
    setMonth(month === 1 ? 12 : month - 1);
  };
  const handleNextMonth = () => {
    setMonth(month === 12 ? 1 : month + 1);
  };

  const handleFilterPress = (filterName: string) => {
    setSelectedFilter(filterName);
  };

  const [editable, setEditable] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<number[]>([]);

  const checkboxHandler = (id: number) => {
    let result: number[] = [...checkedList];
    const idx = result.findIndex(item => item === id);
    if (idx === -1) result.push(id);
    else result = result.filter(item => item !== id);
    setCheckedList(result);
  };

  const {data: allScheduleItemData, isFetching: isFetchingAll} = useQuery<
    ISchedule[]
  >({
    queryKey: ['allScheduleItems', month],
    queryFn: () => {
      return CalendarAPI.getMonthlySchedule({month});
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
    mutationFn: (params: SetNotificationParams) => {
      return CalendarAPI.setNotification(params);
    },
    onSuccess: async () => {
      await AnalyticsService.logAnalyticsEvent('notification_success', {
        userId: user?.id as number,
      });
      await queryClient.invalidateQueries({
        queryKey: ['myScheduleItems'],
      });
    },
  });

  const delNotificationMutation = useMutation({
    mutationKey: ['myScheduleItems'],
    mutationFn: (params: DeleteNotificationParams) => {
      return CalendarAPI.deleteNotification(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['myScheduleItems'],
      });
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const bookmarkMutation = useMutation({
    mutationKey: ['myScheduleItems', 'allScheduleItems'],
    mutationFn: (params: SetBookmarkParams) => CalendarAPI.setBookmark(params),
    onSuccess: async (data, variables) => {
      const {isBookmarked} = variables;
      if (isBookmarked) {
        await AnalyticsService.logAnalyticsEvent('bookmark_success', {
          userId: user?.id as number,
        });
      }
      await queryClient.invalidateQueries({
        queryKey: ['myScheduleItems'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['allScheduleItems'],
      });
    },
    onError(error, variables, context) {
      console.log(error);
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
      const [oneday, twoday] = getNotiTime(startDate);
      setNotificationMutation.mutate({scheduleId: id, notifyAt: oneday});
      setNotificationMutation.mutate({scheduleId: id, notifyAt: twoday});
    },
    [setNotificationMutation],
  );
  const delNotificationHandler = useCallback(
    (id: number[]) => {
      delNotificationMutation.mutate({notificationIds: id});
    },
    [delNotificationMutation],
  );

  useEffect(() => {
    if (selectedFilter === undefined) return;
    queryClient.invalidateQueries({
      queryKey: ['myScheduleItems'],
    });
  }, [selectedFilter]);

  useEffect(() => {
    if (!selectedTab) return;
    setEditable(false);
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

  useEffect(() => {
    setCheckedList([]);
  }, [editable]);

  // eslint-disable-next-line consistent-return
  const filteredScheduleItem = (filterType: string, item: ISchedule) => {
    if (filterType === 'ALL') {
      return item;
    }
    if (filterType === 'NOTIFICATION') {
      if (item.setNotification === true) return item;
    }
    if (filterType === 'IN_PROGRESS') {
      const formattedStartDate = item.startDate.split('.').join('-');
      const formattedEndDate = item.endDate.split('.').join('-');
      const startDate = new Date(formattedStartDate);
      const endDate = new Date(formattedEndDate);
      const today = new Date();
      if (startDate <= today && today <= endDate) return item;
    }
  };

  const messageOnFilter = (filterType: string, item: ISchedule[]) => {
    if (filterType === 'ALL') {
      if (item.length === 0) return '담은 학사일정을 확인할 수 있어요.';
    }
    if (filterType === 'NOTIFICATION') {
      if (item.filter(items => items.setNotification === true).length === 0)
        return '알림을 설정한 학사일정이 없어요.';
    }
    if (filterType === 'IN_PROGRESS') {
      const result = item.filter(items => {
        const formattedStartDate = items.startDate.split('.').join('-');
        const formattedEndDate = items.endDate.split('.').join('-');
        const startDate = new Date(formattedStartDate);
        const endDate = new Date(formattedEndDate);
        const today = new Date();
        if (startDate <= today && today <= endDate) return item;
        return false;
      });
      if (result.length === 0) return '진행 중인 학사 일정이 없어요';
    }
    return '';
  };

  return (
    <>
      <Modal>
        <S.ModalContainer>
          <S.ModalHeader>
            <Txt
              label="일정을 삭제하시겠습니까?"
              typograph="titleMedium"
              color="grey190"
              style={{textAlign: 'center'}}
            />
            <Txt
              label="일정을 삭제하면 내 일정에서 해당 일정이 사라져요."
              typograph="bodySmall"
              color="grey130"
              style={{textAlign: 'center'}}
            />
          </S.ModalHeader>
          <Pressable
            onPress={() => {
              const alarmResultArray: ISchedule[] = [];
              if (myScheduleItemData === undefined) return;
              myScheduleItemData.forEach((item: ISchedule) => {
                if (checkedList.includes(item.scheduleId))
                  alarmResultArray.push(item);
              });
              alarmResultArray.forEach((item: ISchedule) => {
                if (item.notificationIds === undefined) return;
                if (item.notificationIds.length !== 0) {
                  delNotificationHandler(item.notificationIds);
                }
              });
              checkedList.forEach(item => {
                bookmarkHandler(item, true);
              });
              setEditable(false);
              closeModal();
            }}>
            <S.ModalDelete>
              <Txt
                label="삭제하기"
                typograph="bodyMedium"
                color="primaryBrand"
                style={{textAlign: 'center'}}
              />
            </S.ModalDelete>
          </Pressable>
          <Pressable
            onPress={() => {
              closeModal();
            }}>
            <S.ModalCancel>
              <Txt
                label="취소"
                typograph="bodyMedium"
                color="grey90"
                style={{textAlign: 'center'}}
              />
            </S.ModalCancel>
          </Pressable>
        </S.ModalContainer>
      </Modal>
      <SafeAreaView style={{flex: 1, zIndex: -999}}>
        <Header
          style={{marginBottom: 8}}
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
            {selectedTab === ScheduleTabEnum.ALL && (
              <S.IconWrapper
                onPress={() => navigation.navigate('academic_calendar_search')}>
                <Icon name="search" width={24} height={24} />
              </S.IconWrapper>
            )}
          </S.TabContainer>
          {selectedTab === ScheduleTabEnum.MY_SCHEDULE && (
            <S.FilterWrapper>
              <FilterButtonGroup
                selectedFilter={selectedFilter}
                handleFilterPress={handleFilterPress}
              />
              <S.EditableArea>
                {(() => {
                  if (!editable) {
                    return (
                      <Pressable
                        onPress={() => {
                          setEditable(true);
                        }}>
                        <Txt
                          label="편집"
                          color="grey190"
                          typograph="labelLarge"
                        />
                      </Pressable>
                    );
                  }
                  return (
                    <>
                      <Pressable
                        onPress={async () => {
                          setEditable(false);
                          setCheckedList([]);
                        }}>
                        <Txt
                          label="취소"
                          color="grey190"
                          typograph="labelLarge"
                        />
                      </Pressable>
                      <Pressable
                        disabled={checkedList.length === 0}
                        onPress={async () => {
                          // 알림 해제
                          openModal();
                        }}>
                        <Txt
                          label="삭제"
                          color={
                            checkedList.length > 0 ? 'primaryBrand' : 'grey40'
                          }
                          typograph="labelLarge"
                        />
                      </Pressable>
                    </>
                  );
                })()}
              </S.EditableArea>
            </S.FilterWrapper>
          )}
          {selectedTab === ScheduleTabEnum.ALL && (
            <S.MonthlyFilter>
              <MonthlyFilter
                month={month}
                year={year}
                onPrevious={handlePreviousMonth}
                onNext={handleNextMonth}
              />
            </S.MonthlyFilter>
          )}
        </S.Container>

        <S.ScheduleContainer contentContainerStyle={{rowGap: 10}}>
          {selectedTab === ScheduleTabEnum.ALL
            ? allScheduleItemData?.map((scheduleItem, idx: number) => {
                return (
                  <ScheduleItem
                    schedule={scheduleItem}
                    editable={editable}
                    checkedIdx={idx}
                    isChecked={false}
                    onCheckboxChange={checkboxHandler}
                    tabType={selectedTab}
                    bookmarkHandler={bookmarkHandler}
                  />
                );
              })
            : myScheduleItemData
                ?.filter(item => {
                  return filteredScheduleItem(selectedFilter, item);
                })
                .map((scheduleItem, idx: number) => {
                  return (
                    <ScheduleItem
                      schedule={scheduleItem}
                      editable={editable}
                      checkedIdx={idx}
                      isChecked={false}
                      onCheckboxChange={checkboxHandler}
                      tabType={selectedTab}
                      notificationHandler={notificationHandler}
                      delNotificationHandler={delNotificationHandler}
                    />
                  );
                })}
          {myScheduleItemData && selectedFilter && (
            <S.TxtContainer>
              <Txt
                label={messageOnFilter(selectedFilter, myScheduleItemData)}
                color="grey130"
                typograph="labelLarge"
              />
            </S.TxtContainer>
          )}

          {(isFetchingAll || isFetchingMy) && <Skeleton variant="card" />}
        </S.ScheduleContainer>
      </SafeAreaView>
    </>
  );
};

export default AcademicCalendarScreen;

const S = {
  Container: styled.View`
    display: flex;
    gap: 10px;
  `,
  TxtContainer: styled.View`
    display: flex;
    width: 360px;
    padding: 48px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  ScheduleContainer: styled.ScrollView`
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
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
  FilterWrapper: styled.View`
    display: flex;
    flex-direction: row;
    padding: 6px 16px 16px 16px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  `,
  MonthlyFilter: styled.View`
    padding: 16px 20px;
  `,
  EditableArea: styled.View`
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,
  ModalContainer: styled.View`
    display: flex;
    padding-top: 24px;
  `,
  ModalHeader: styled.View`
    display: flex;
    gap: 8px;
    padding: 0px 16px 16px 16px;
  `,
  ModalDelete: styled.View`
    padding: 10px 16px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${colors.grey40};
  `,
  ModalCancel: styled.View`
    padding: 10px 16px 10px 16px;
  `,
};
