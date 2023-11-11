import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/molecules/common/header/Header';
import Card from '../../components/molecules/common/card/Card';
import CafeteriaCard from '../../components/molecules/screens/cafeteria/card/CafeteriaCard';
import DatePaginationBar from '../../components/molecules/screens/cafeteria/pagination/DatePaginationBar';
import {UtilAPI} from '../../api/services';
import {
  GetCafeteriasResponse,
  MealTimeType,
} from '../../api/services/util/cafeteria/cafeteriaAPI.type';
import IconWithText from '../../components/molecules/common/iconWithText/IconWithText';
import DateUtils from '../../utils/date';

type CafeteriaItemType = {
  isCurrent: boolean;
  commonDate: string;
  displayDate: string;
  mealTime: MealTimeType;
  items?: GetCafeteriasResponse;
};

type CafeteriasType = Array<CafeteriaItemType>;

const DEFAULT_MEALTIME = 'LUNCH' as MealTimeType;

const CafeteriaScreen = () => {
  const insets = useSafeAreaInsets();
  const date = new DateUtils(new Date());

  const [cafeterias, setCafeterias] = useState<CafeteriasType>();
  const [currentCafeteriaItem, setCurrentCafeteriaItem] =
    useState<CafeteriaItemType>();

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getCafeteriaItemByParams = async (
    params: Pick<CafeteriaItemType, 'commonDate' | 'displayDate' | 'mealTime'>,
  ): Promise<CafeteriaItemType> => {
    const {commonDate, displayDate, mealTime} = params;
    try {
      const res = await UtilAPI.getCafeterias({
        mealTime,
        openDate: commonDate,
      });
      return {
        isCurrent: true,
        commonDate,
        mealTime,
        displayDate,
        items: res,
      };
    } catch (err) {
      return {
        isCurrent: true,
        commonDate,
        mealTime,
        displayDate,
      };
    }
  };

  const handleClickMealTimeButton = async (mealTime: MealTimeType) => {
    const currentCommonDate = currentCafeteriaItem!.commonDate;
    const currentDisplayDate = currentCafeteriaItem!.displayDate;
    const currentMealTime = currentCafeteriaItem!.mealTime;

    if (currentMealTime === mealTime) return;

    if (
      cafeterias?.some(
        item =>
          item.commonDate === currentCommonDate && item.mealTime === mealTime,
      )
    ) {
      setCafeterias(prev => {
        if (!prev) return prev;
        return [
          ...prev.map(item =>
            item.mealTime === mealTime && item.commonDate === currentCommonDate
              ? {...item, isCurrent: true}
              : {...item, isCurrent: false},
          ),
        ];
      });
      return;
    }

    const cafeteriaItem = await getCafeteriaItemByParams({
      mealTime,
      commonDate: currentCommonDate,
      displayDate: currentDisplayDate,
    });
    setCafeterias(prev => {
      if (!prev) return prev;
      return [
        ...prev.map(item => {
          return {...item, isCurrent: false};
        }),
        cafeteriaItem,
      ];
    });
  };

  const changeCafeteriaByDate = async (
    commonDate: string,
    displayDate: string,
  ) => {
    if (
      cafeterias?.some(
        item =>
          item.mealTime === DEFAULT_MEALTIME && item.commonDate === commonDate,
      )
    ) {
      setCafeterias(prev => {
        if (!prev) return prev;
        return [
          ...prev.map(item =>
            item.mealTime === DEFAULT_MEALTIME && item.commonDate === commonDate
              ? {...item, isCurrent: true}
              : {...item, isCurrent: false},
          ),
        ];
      });
      return;
    }

    const cafeteriaItem = await getCafeteriaItemByParams({
      mealTime: DEFAULT_MEALTIME,
      commonDate,
      displayDate,
    });
    setCafeterias(prev => {
      if (!prev) return prev;
      return [
        ...prev.map(item => {
          return {...item, isCurrent: false};
        }),
        cafeteriaItem,
      ];
    });
  };

  // get first cafeteria item
  useEffect(() => {
    (async () => {
      try {
        const res = await UtilAPI.getCafeterias({
          mealTime: date.currentMealTime,
          openDate: date.commonDate,
        });
        setCafeterias([
          {
            isCurrent: true,
            commonDate: date.commonDate,
            displayDate: date.displayDate,
            items: res,
            mealTime: date.currentMealTime,
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [date.commonDate, date.currentMealTime, date.displayDate]);

  // set current cafeteria item
  useEffect(() => {
    const cafeteriaItem = cafeterias?.find(item => item.isCurrent === true);
    setCurrentCafeteriaItem(cafeteriaItem);
  }, [cafeterias]);

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label="학식" onPressBackButton={handleGoBack} />
      <ScrollView bounces={false}>
        <S.bodyContainer style={{paddingBottom: insets.bottom + 12}}>
          <S.selectorWrapper>
            <DatePaginationBar
              date={date}
              displayDate={currentCafeteriaItem?.displayDate}
              changeCafeteriaByDate={changeCafeteriaByDate}
            />
            <S.iconWrapper>
              <IconWithText
                iconName="breakfast"
                text="조식"
                isClick={currentCafeteriaItem?.mealTime === 'BREAKFAST'}
                onPress={() => handleClickMealTimeButton('BREAKFAST')}
                style={{paddingTop: 6, paddingBottom: 4}}
              />
              <IconWithText
                iconName="lunch"
                text="중식"
                isClick={currentCafeteriaItem?.mealTime === 'LUNCH'}
                onPress={() => handleClickMealTimeButton('LUNCH')}
                style={{paddingTop: 6, paddingBottom: 4}}
              />
              <IconWithText
                iconName="dinner"
                text="석식"
                isClick={currentCafeteriaItem?.mealTime === 'DINNER'}
                onPress={() => handleClickMealTimeButton('DINNER')}
                style={{paddingTop: 6, paddingBottom: 4}}
              />
            </S.iconWrapper>
          </S.selectorWrapper>
          <S.menuContainer>
            {currentCafeteriaItem?.items?.map(item => (
              <Card
                key={item.location}
                title={item.location}
                caption={item.operationTime}>
                <CafeteriaCard cafeteriaItem={item.attributes} />
              </Card>
            ))}
          </S.menuContainer>
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
