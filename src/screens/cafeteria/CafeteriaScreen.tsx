import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import Card from '../../components/card/Card';
import CafeteriaCard from '../../components/molecules/cafeteria/card/CafeteriaCard';
import {Icon, Txt} from '@uoslife/design-system';
import {Pressable} from 'react-native';
import DatePaginationBar from '../../components/molecules/cafeteria/pagination/DatePaginationBar';
import {UtilAPI} from '../../api/services';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import response from './mockResponse';

export type CafeteriaItem = {
  name: string;
  corner?: string;
  menu: string;
  sideMenus?: string;
  openTime: string;
  closeTime: string;
  price: string;
  extraPrice?: string;
  mealTime: string;
};

const CafeteriaScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeIcon, setActiveIcon] = useState('lunch');
  const [today, setToday] = useState(new Date());
  const [datePaginationItems, setDatePaginationItems] = useState<string[]>([]);
  const [date, setDate] = useState('');

  const getCafeteriaAPI = useCallback(async (date: string) => {
    const response = await UtilAPI.getCafeteriasWithDate({date});
  }, []);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const lunchData = response.filter(items => items.mealTime === 'LUNCH');
  const dinnerData = response.filter(items => items.mealTime === 'DINNER');

  const studentUnionLunch = lunchData.filter(
    items => items.name === '학생회관',
  );
  const naturalScienceBuildingLunch = lunchData.filter(
    items => items.name === '자연과학관',
  );
  const mainBuildingLunch = lunchData.filter(items => items.name === '본관8층');

  const studentUnionDinner = dinnerData.filter(
    items => items.name === '학생회관',
  );
  const naturalScienceBuildingDinner = dinnerData.filter(
    items => items.name === '자연과학관',
  );
  const mainBuildingDinner = dinnerData.filter(
    items => items.name === '본관8층',
  );

  const dayString = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  useEffect(() => {
    setToday(new Date());
  }, [today.getDate()]);

  // 일주일치의 날짜를 생성
  useEffect(() => {
    setDatePaginationItems(() => {
      return [
        '2023.09.25 (월)',
        '2023.09.26 (화)',
        '2023.09.27 (수)',
        '2023.09.28 (목)',
        '2023.09.29 (금)',
        '2023.09.30 (토)',
        '2023.10.01 (일)',
      ];
    }); // TODO: 날짜 표시용 임시 코드
    if (today.getDay() === 1) {
      setDatePaginationItems([]);
      for (let i = 0; i < 7; i++) {
        const year = today.getFullYear(); // 년도
        const month = ('0' + (today.getMonth() + 1)).slice(-2); // 달
        const day = ('0' + today.getDate()).slice(-2); // 일
        const dayOfWeek = dayString[today.getDay()]; // 요일 (일요일 0 ~ 토요일 6)

        const dateStr = `${year}.${month}.${day}(${dayOfWeek})`;
        setDate(year + '-' + month + '-' + day);

        setDatePaginationItems(datePaginationItems => [
          ...datePaginationItems,
          dateStr,
        ]);

        today.setDate(today.getDate() + 1); // 다음 날짜로 이동
      }
    }
  }, [today.getDay, date]);

  // useEffect(() => {
  //   getCafeteriaAPI(date);
  // }, [date]);

  const handleIconPress = useCallback(
    (icon: string) => {
      if (activeIcon !== icon) {
        setActiveIcon(icon);
      }
    },
    [activeIcon],
  );

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label={'학식'} onPressBackButton={handleGoBack} />
      <ScrollView bounces={false}>
        <S.bodyContainer>
          <S.selectorWrapper>
            <DatePaginationBar datePaginationItems={datePaginationItems} />
            <S.iconWrapper>
              <Pressable onPress={() => handleIconPress('lunch')}>
                <S.iconContainer>
                  <Icon
                    name={'lunch'}
                    color={activeIcon === 'lunch' ? 'primaryBrand' : 'grey90'}
                    width={24}
                    height={24}
                  />
                  <Txt
                    label={'중식'}
                    color={activeIcon === 'lunch' ? 'primaryBrand' : 'grey90'}
                    typograph={'labelLarge'}
                  />
                </S.iconContainer>
              </Pressable>
              <Pressable onPress={() => handleIconPress('dinner')}>
                <S.iconContainer>
                  <Icon
                    name={'dinner'}
                    color={activeIcon === 'dinner' ? 'primaryBrand' : 'grey90'}
                    width={24}
                    height={24}
                  />
                  <Txt
                    label={'석식'}
                    color={activeIcon === 'dinner' ? 'primaryBrand' : 'grey90'}
                    typograph={'labelLarge'}
                  />
                </S.iconContainer>
              </Pressable>
            </S.iconWrapper>
          </S.selectorWrapper>
          {activeIcon === 'lunch' && (
            <S.menuContainer>
              <Card
                title="학생회관"
                caption="11:00 ~ 14:00"
                children={<CafeteriaCard cafeteriaItems={studentUnionLunch} />}
              />
              <Card
                title="자연과학관"
                caption="11:30 ~ 14:00"
                children={
                  <CafeteriaCard cafeteriaItems={naturalScienceBuildingLunch} />
                }
              />
              <Card
                title="본관8층"
                caption="11:30 ~ 14:00"
                children={<CafeteriaCard cafeteriaItems={mainBuildingLunch} />}
              />
            </S.menuContainer>
          )}
          {activeIcon === 'dinner' && (
            <S.menuContainer>
              <Card
                title="학생회관"
                caption="17:00 ~ 18:30"
                children={<CafeteriaCard cafeteriaItems={studentUnionDinner} />}
              />
              <Card
                title="자연과학관"
                caption="17:30 ~ 18:30"
                children={
                  <CafeteriaCard
                    cafeteriaItems={naturalScienceBuildingDinner}
                  />
                }
              />
              <Card
                title="본관8층"
                caption="17:30 ~ 18:30"
                children={<CafeteriaCard cafeteriaItems={mainBuildingDinner} />}
              />
            </S.menuContainer>
          )}
        </S.bodyContainer>
      </ScrollView>
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
    background-color: #ffffff;
  `,
  bodyContainer: styled.View`
    gap: 24px;
  `,
  menuContainer: styled.View`
    justify-content: center;
    padding: 0px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  `,
  iconContainer: styled.View`
    width: 56px;
    height: 56px;
    padding: 6px 0px 4px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
  `,
  iconWrapper: styled.View`
    flex-direction: row;
    gap: 16px;
  `,
  selectorWrapper: styled.View`
    align-items: center;
    gap: 8px;
  `,
  cafeteriaPaginationBarWrapper: styled.View`
    align-items: center;
    margin-top: 16px;
  `,
};

export default CafeteriaScreen;
