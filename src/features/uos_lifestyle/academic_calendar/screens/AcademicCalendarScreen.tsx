import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {useState} from 'react';
import Header from '../../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';
import {ScheduleTabEnum} from '../constants';

const AcademicCalendarScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const date = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedTab, setSelectedTab] = useState(ScheduleTabEnum.ALL);

  // const currentDate: Date = new Date();
  // const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  // const year: number = currentDate.getFullYear();
  // const handlePreviousMonth = () => {
  //   setMonth(month === 1 ? 12 : month - 1);
  // };
  // const handleNextMonth = () => {
  //   setMonth(month === 12 ? 1 : month + 1);
  // };

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

          <S.IconWrapper>
            <Icon name="search" width={24} height={24} />
          </S.IconWrapper>
        </S.TabContainer>
      </S.Container>
    </View>
  );
};

export default AcademicCalendarScreen;

const S = {
  Container: styled.View`
    display: flex;
    gap: 10px;
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
  IconWrapper: styled.View`
    padding: 12px;
  `,
};
