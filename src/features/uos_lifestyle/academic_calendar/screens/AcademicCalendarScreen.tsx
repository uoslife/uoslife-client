import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {useState} from 'react';
import Header from '../../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';
import TabView from '../../../../components/molecules/common/tab_view/TabView';
import {ScheduleTabEnum} from '../constants';
import ScheduleList from '../components/molecules/ScheduleList';

const AcademicCalendarScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const date = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="학사일정"
        onPressBackButton={() => navigation.goBack()}
      />
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
          <TabView index={index} setIndex={setIndex}>
            <TabView.Screen
              tabKey="ALL"
              tabTitle={ScheduleTabEnum.ALL}
              component={<ScheduleList tabType="ALL" />}
            />
            <TabView.Screen
              tabKey="MY_SCHEDULE"
              tabTitle={ScheduleTabEnum.MY_SCHEDULE}
              component={<ScheduleList tabType="MY_SCHEDULE" />}
            />
          </TabView>
        </S.TabWrapper>

        <S.IconWrapper>
          <Icon name="search" width={24} height={24} />
        </S.IconWrapper>
      </S.TabContainer>
    </View>
  );
};

export default AcademicCalendarScreen;

const S = {
  TodayInfoBox: styled.View`
    margin-top: 24px;
    padding: 0 16px;
    gap: 4px;
  `,
  TabContainer: styled.View`
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
  `,
  TabWrapper: styled.View`
    width: 170px;
  `,
  IconWrapper: styled.View`
    padding: 12px;
  `,
};
