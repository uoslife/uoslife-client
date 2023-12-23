import React, {Suspense, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAtom, useSetAtom} from 'jotai';
import {Txt} from '@uoslife/design-system';
import styled from '@emotion/native';

import Card from '../../components/molecules/common/card/Card';
import Header from '../../components/molecules/common/header/Header';
import Skeleton from '../../components/molecules/common/skeleton/Skeleton';
import CardLayout from '../../components/molecules/common/cardLayout/CardLayout';
import IconWithText from '../../components/molecules/common/iconWithText/IconWithText';
import CafeteriaCard from '../../components/molecules/screens/cafeteria/card/CafeteriaCard';
import DatePaginationBar from '../../components/molecules/screens/cafeteria/pagination/DatePaginationBar';

import cachedCafeteriaItemAtom, {
  cafeteriaCommonDateAtom,
  cafeteriaDisplayDateAtom,
  cafeteriaMealTimeAtom,
} from '../../store/cafeteria';
import DateUtils from '../../utils/date';
import {MealTimeType} from '../../api/services/util/cafeteria/cafeteriaAPI.type';

const CafeteriaScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const date = new DateUtils(new Date());

  const [cafeteriaMealTime, setCafeteriaMealTime] = useAtom(
    cafeteriaMealTimeAtom,
  );
  const setCafeteriaCommonDate = useSetAtom(cafeteriaCommonDateAtom);
  const setCafeteriaDisplayDate = useSetAtom(cafeteriaDisplayDateAtom);
  const [{items}] = useAtom(cachedCafeteriaItemAtom);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClickMealTimeButton = (mealTime: MealTimeType) => {
    setCafeteriaMealTime(mealTime);
  };

  // focus out시 현재 date로 초기화합니다.
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) return;
    setCafeteriaMealTime(date.currentMealTime);
    setCafeteriaCommonDate(date.commonDate);
    setCafeteriaDisplayDate(date.displayDate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <S.screenContainer style={{paddingTop: insets.top, right: 1}}>
      <Header label="학식" onPressBackButton={handleGoBack} />
      <ScrollView bounces={false} style={{right: 1}}>
        <S.bodyContainer style={{paddingBottom: insets.bottom + 12}}>
          <S.selectorWrapper>
            <DatePaginationBar date={date} />
            <S.iconWrapper>
              <IconWithText
                iconName="breakfast"
                text="조식"
                isClick={cafeteriaMealTime === 'BREAKFAST'}
                onPress={() => handleClickMealTimeButton('BREAKFAST')}
                style={{paddingTop: 6, paddingBottom: 4}}
              />
              <IconWithText
                iconName="lunch"
                text="중식"
                isClick={cafeteriaMealTime === 'LUNCH'}
                onPress={() => handleClickMealTimeButton('LUNCH')}
                style={{paddingTop: 6, paddingBottom: 4}}
              />
              <IconWithText
                iconName="dinner"
                text="석식"
                isClick={cafeteriaMealTime === 'DINNER'}
                onPress={() => handleClickMealTimeButton('DINNER')}
                style={{paddingTop: 6, paddingBottom: 4}}
              />
            </S.iconWrapper>
          </S.selectorWrapper>
          <S.menuContainer>
            <Suspense fallback={<Skeleton variant="card" />}>
              {items ? (
                items.map(item => (
                  <Card
                    key={item.location}
                    title={item.location}
                    caption={item.operationTime}>
                    <CafeteriaCard cafeteriaItem={item.attributes} />
                  </Card>
                ))
              ) : (
                <CardLayout style={{padding: 24}}>
                  <Txt
                    label="오늘은 운영하지 않아요."
                    color="grey160"
                    typograph="bodyMedium"
                    style={{textAlign: 'center'}}
                  />
                </CardLayout>
              )}
            </Suspense>
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
    gap: 16px;
    width: 100%;
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
    padding-top: 6px;
  `,
  selectorWrapper: styled.View`
    align-items: center;
    gap: 8px;
    padding-top: 18px;
  `,
  cafeteriaPaginationBarWrapper: styled.View`
    align-items: center;
    margin-top: 16px;
  `,
};

export default CafeteriaScreen;
