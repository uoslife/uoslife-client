import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header/Header';
import styled from '@emotion/native';
import Card from '../../components/card/Card';
import CafeteriaCard from '../../components/molecules/cafeteria/card/CafeteriaCard';
import {Icon, Txt} from '@uoslife/design-system';
import {Pressable} from 'react-native';
import DatePaginationBar from '../../components/molecules/cafeteria/pagination/DatePaginationBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type CafeteriaItem = {
  corner?: string;
  dish?: string;
  subDish?: string;
  price?: string;
  extraPrice?: string;
  showDivider?: boolean;
};

export type DatePaginationItem = {};

const CafeteriaScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeIcon, setActiveIcon] = useState('lunch');

  // api example
  const cafeteriaItems: CafeteriaItem[] = [
    {
      corner: '코너A',
      dish: '라면',
      subDish: '치즈 / 떡 / 만두 / 공기밥',
      price: '2,000원',
      extraPrice: '(+ 500원)',
      showDivider: false,
    },
    {dish: '삶은 계란', price: '500원', showDivider: false},
    {dish: '돈불고기', price: '3,000원', showDivider: true},
    {
      corner: '코너B',
      dish: '콩나물국',
      subDish: '쥐어채볶음 / 참나물겉절이 / 만두',
      price: '3,800원',
      showDivider: true,
    },
    {
      corner: '코너C',
      dish: '콩나물국',
      subDish: '쥐어채볶음 / 참나물겉절이 / 만두',
      price: '3,800원',
      showDivider: true,
    },
    {
      corner: '코너D',
      dish: '콩나물국',
      subDish: '쥐어채볶음 / 참나물겉절이 / 만두',
      price: '3,800원',
      showDivider: false,
    },
  ];

  const handleIconPress = (icon: string) => {
    if (activeIcon !== icon) {
      setActiveIcon(icon);
    }
  };

  // api example
  const datePaginationItems: DatePaginationItem[] = [
    {
      date: '2023.08.22(화)',
    },
    {
      date: '2023.08.23(수)',
    },
    {
      date: '2023.08.24(목)',
    },
  ];

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header label={'학식'} />
      <ScrollView>
        <S.bodyContainer>
          <S.selectorWrapper>
            <DatePaginationBar
              totalPages={3}
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
          <S.menuContainer>
            <Card
              title="학생회관"
              caption="17:00 ~ 18:30"
              children={<CafeteriaCard cafeteriaItems={cafeteriaItems} />}
            />
            <Card
              title="자연과학관"
              caption="17:00 ~ 18:30"
              children={<CafeteriaCard isEmpty />}
            />
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
    algin-items: center;
    margin-top: 16px;
  `,
};

export default CafeteriaScreen;
