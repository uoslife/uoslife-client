import React, {Suspense} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Txt} from '@uoslife/design-system';
import {useAtom, useSetAtom} from 'jotai';
import {Text} from 'react-native';
import Header from '../../components/molecules/common/header/Header';
import Card from '../../components/molecules/common/card/Card';
import CafeteriaCard from '../../components/molecules/screens/cafeteria/card/CafeteriaCard';
import DatePaginationBar from '../../components/molecules/screens/cafeteria/pagination/DatePaginationBar';
import {MealTimeType} from '../../api/services/util/cafeteria/cafeteriaAPI.type';
import IconWithText from '../../components/molecules/common/iconWithText/IconWithText';
import DateUtils from '../../utils/date';
import CardLayout from '../../components/molecules/common/cardLayout/CardLayout';
import cachedCafeteriaItemAtom, {
  cafeteriaMealTimeAtom,
} from '../../store/cafeteria';

const CafeteriaScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const date = new DateUtils(new Date());

  const [cafeteriaMealTime, setCafeteriaMealTime] = useAtom(
    cafeteriaMealTimeAtom,
  );
  const [{items}] = useAtom(cachedCafeteriaItemAtom);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClickMealTimeButton = (mealTime: MealTimeType) => {
    setCafeteriaMealTime(mealTime);
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label="학식" onPressBackButton={handleGoBack} />
      <ScrollView bounces={false}>
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
