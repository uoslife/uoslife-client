import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import Card from '../../components/card/Card';
import CafeteriaCard from '../../components/molecules/cafeteria/card/CafeteriaCard';
import {Icon, Txt} from '@uoslife/design-system';
import {Pressable} from 'react-native';
import DatePaginationBar from '../../components/molecules/cafeteria/pagination/DatePaginationBar';
import { UtilAPI } from '../../api/services';

export type Api={
    "name": string,
    "corner"?:string,
    "menu": string,
    "sideMenus"?: string,
    "openTime": string,
    "closeTime": string,
    "price":string,
    "extraPrice"?:string,
    "mealTime": string
};

const CafeteriaScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeIcon, setActiveIcon] = useState('lunch');
  const [today, setToday]=useState(new Date());
  const [datePaginationItems, setDatePaginationItmes]=useState([]);
  const [date, setDate]=useState("");

  const getCafeteriaAPI = useCallback(async (date: string) => {
    const response = await UtilAPI.getCafeteriasWithDate({date});
  }, []);


  // api example
  const response: Api[] = [
    {
      "name": "학생회관",
      "corner": '코너A',
      "menu": "라면",
      "sideMenus": "치즈 / 떡 / 만두 / 공기밥",
      "price": "2,000원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": '코너A',
      "menu": "오징어해장라면",
      "price": "2,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": '코너A',
      "menu": "삶은 계란",
      "price": "400원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": '코너B',
      "menu": "참치마요덮밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": '코너B',
      "menu": "햄마요덮밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": '코너B',
      "menu": "치킨마요덮밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": "코너C",
      "menu": "소고기 된장찌개",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": "코너C",
      "menu": "김치 치즈 비빔밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": "코너E",
      "menu": "설렁탕",
      "sideMenus": "메밀전병 / 무생채무침",
      "price": "5,000원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "본관8층",
      "menu": "오징어불고기볶음",
      "sideMenus": "배추된장국 / 두부구이 / 해파리냉채 / 동부묵김가루무침",
      "price": "6,000원",
      "openTime": "2023-09-12T11:30:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "자연과학관",
      "menu": "오징어불고기볶음",
      "sideMenus": "배추된장국 / 두부구이 / 해파리냉채 / 동부묵김가루무침",
      "price": "6,000원",
      "openTime": "2023-09-12T11:30:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "LUNCH"
    },
    {
      "name": "학생회관",
      "corner": '코너A',
      "menu": "라면",
      "sideMenus": "치즈 / 떡 / 만두 / 공기밥",
      "price": "2,000원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": '코너A',
      "menu": "오징어해장라면",
      "price": "2,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": '코너A',
      "menu": "삶은 계란",
      "price": "400원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": '코너B',
      "menu": "참치마요덮밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": '코너B',
      "menu": "햄마요덮밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": '코너B',
      "menu": "치킨마요덮밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": "코너C",
      "menu": "소고기 된장찌개",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": "코너C",
      "menu": "김치 치즈 비빔밥",
      "price": "3,800원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "학생회관",
      "corner": "코너E",
      "menu": "차슈덮밥",
      "sideMenus": "어묵국 / 타꼬야끼",
      "price": "5,000원",
      "openTime": "2023-09-12T11:00:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "본관8층",
      "menu": "순살시래기찜닭",
      "sideMenus": "미역오이냉국 / 숙주무침 / 단호박호두조림 / 상추겉절이",
      "price": "6,000원",
      "openTime": "2023-09-12T11:30:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
    {
      "name": "자연과학관",
      "menu": "순살시래기찜닭",
      "sideMenus": "미역오이냉국 / 숙주무침 / 단호박호두조림 / 상추겉절이",
      "price": "6,000원",
      "openTime": "2023-09-12T11:30:00.007Z",
      "closeTime": "2023-09-12T14:00:00.007Z",
      "mealTime": "DINNER"
    },
  ]

  const lunchData=response.filter(items => items["mealTime"]==="LUNCH");
  const dinnerData=response.filter(items => items["mealTime"]==="DINNER");

  const studentUnionLunch = lunchData.filter(items => items["name"]==="학생회관");
  const naturalScienceBuildingLunch = lunchData.filter(items => items["name"]==="자연과학관");
  const mainBuildingLunch = lunchData.filter(items => items["name"]==="본관8층");

  const studentUnionDinner = dinnerData.filter(items => items["name"]==="학생회관");
  const naturalScienceBuildingDinner = dinnerData.filter(items => items["name"]==="자연과학관");
  const mainBuildingDinner = dinnerData.filter(items => items["name"]==="본관8층");

const dayString = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

useEffect(()=>{
  setToday(new Date());
}, [today.getDate()])


// 일주일치의 날짜를 생성
useEffect(()=>{
  if(today.getDay()===1){
    setDatePaginationItmes([]);
    for (let i = 0; i < 7; i++) {
      const year = today.getFullYear(); // 년도
      const month = ('0' + (today.getMonth() + 1)).slice(-2); // 달
      const day = ('0' + today.getDate()).slice(-2); // 일
      const dayOfWeek = dayString[today.getDay()]; // 요일 (일요일 0 ~ 토요일 6)
    
      const dateStr = `${year}.${month}.${day}(${dayOfWeek})`;
      // setDate(year + '-' + month  + '-' + day);
    
      setDatePaginationItmes(datePaginationItems=>[...datePaginationItems, dateStr]);
  
      today.setDate(today.getDate() + 1); // 다음 날짜로 이동
  };
};
},[today.getDay, date])


  useEffect(() => {
    getCafeteriaAPI(date);
  }, [date]);


  const handleIconPress = useCallback((icon: string) => {
    if (activeIcon !== icon) {
      setActiveIcon(icon);
    }},[activeIcon])

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label={'학식'} />
      <ScrollView>
        <S.bodyContainer>
          <S.selectorWrapper>
            <DatePaginationBar
              totalPages={7}
              datePaginationItems={datePaginationItems}
            />
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
          {activeIcon==="lunch"&&<S.menuContainer>
            <Card
              title="학생회관"
              caption="11:00 ~ 14:00"
              children={<CafeteriaCard cafeteriaItems={studentUnionLunch} />}
            />
            <Card
              title="자연과학관"
              caption="11:30 ~ 14:00"
              children={<CafeteriaCard cafeteriaItems={naturalScienceBuildingLunch} />}
            />
            <Card
              title="본관8층"
              caption="11:30 ~ 14:00"
              children={<CafeteriaCard cafeteriaItems={mainBuildingLunch} />}
            />
          </S.menuContainer>}
          {activeIcon==="dinner"&&<S.menuContainer>
            <Card
              title="학생회관"
              caption="17:00 ~ 18:30"
              children={<CafeteriaCard cafeteriaItems={studentUnionDinner} />}
            />
            <Card
              title="자연과학관"
              caption="17:30 ~ 18:30"
              children={<CafeteriaCard cafeteriaItems={naturalScienceBuildingDinner} />}
            />
            <Card
              title="본관8층"
              caption="17:30 ~ 18:30"
              children={<CafeteriaCard cafeteriaItems={mainBuildingDinner} />}
            />
          </S.menuContainer>}
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
    algin-items: center;
    margin-top: 16px;
  `,
};

export default CafeteriaScreen;
