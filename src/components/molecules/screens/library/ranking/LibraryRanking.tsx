import styled from '@emotion/native';
import {
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {Txt, colors} from '@uoslife/design-system';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LibraryRankingServiceBox from './LibraryRankingServiceBox';
import usePullToRefresh from '../../../../../hooks/usePullToRefresh';
import boxShadowStyle from '../../../../../styles/boxShadow';
import Select from '../../../common/select/Select';

const TRIANGLE_LEFT_WIDTH = Dimensions.get('screen').width - 136;

const LibraryRankingIndicator = () => {
  return (
    <S.IndicatorContainer
      style={{...boxShadowStyle.bottomTapShadow, bottom: TRIANGLE_LEFT_WIDTH}}>
      <View style={{gap: 16, flexDirection: 'row'}}>
        <Txt label="최희준" color="grey190" typograph="bodyLarge" />
        <Txt label="디자인학과" color="grey90" typograph="bodyLarge" />
      </View>
      <Txt label="7시간" color="primaryBrand" typograph="titleSmall" />
      <Txt label="21위" color="grey190" typograph="titleSmall" />
    </S.IndicatorContainer>
  );
};

const LibraryRankingChart = () => {
  return (
    <S.ChartContainer>
      <View>
        <S.ChartCrownImageWrapper>
          <Image
            source={require('../../../../../assets/images/library_chart_crown.png')}
            style={{width: 25, height: 20}}
          />
          <Txt label="1" color="grey190" typograph="titleLarge" />
        </S.ChartCrownImageWrapper>
        <S.ChartBar style={{backgroundColor: colors.primaryLighter}} />
      </View>
      <S.ChartInfoWrapper>
        <Txt label="정세윤" color="grey190" typograph="titleMedium" />
        <Txt label="디자인학과" color="grey90" typograph="bodySmall" />
        <Txt label="86시간" color="primaryBrand" typograph="titleMedium" />
      </S.ChartInfoWrapper>
    </S.ChartContainer>
  );
};

const LibraryRanking = () => {
  const insets = useSafeAreaInsets();
  const {refreshing, onRefresh} = usePullToRefresh(() => {});
  return (
    <S.Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <S.SelectWrapper>
        <Select options={['시대생', '학과']} />
      </S.SelectWrapper>
      <LibraryRankingServiceBox label="상위 랭킹">
        <S.TopRankingBoxContainer>
          <LibraryRankingChart />
          <LibraryRankingChart />
          <LibraryRankingChart />
        </S.TopRankingBoxContainer>
      </LibraryRankingServiceBox>
      <LibraryRankingServiceBox label="내 랭킹">
        <S.MyRankingBoxContainer>
          <S.Triangle style={style.triangle} />
        </S.MyRankingBoxContainer>
        <LibraryRankingIndicator />
      </LibraryRankingServiceBox>
      <S.ScrollViewBottomBlank style={{height: insets.bottom + 8}} />
    </S.Container>
  );
};

export default LibraryRanking;

const S = {
  Container: styled.ScrollView`
    padding: 0 14px;
  `,
  TopRankingBoxContainer: styled.View`
    padding: 0 18px;
    flex-direction: row;
    justify-content: space-between;
  `,
  ChartCrownImageWrapper: styled.View`
    align-items: center;
  `,
  ChartContainer: styled.View`
    width: 22%;
    gap: 8px;
  `,
  ChartNumber: styled.View``,
  ChartBar: styled.View`
    height: 100px;
    border-radius: 24px;
  `,
  ChartInfoWrapper: styled.View`
    align-items: center;
  `,
  MyRankingBoxContainer: styled.View`
    padding: 16px;
  `,
  Triangle: styled.View``,
  IndicatorContainer: styled.View`
    position: absolute;
    left: 18px;
    width: 100%;
    padding: 12px 20px;
    justify-content: space-between;
    flex-direction: row;
    background-color: white;
    border-radius: 60px;
    align-items: center;
  `,
  ScrollViewBottomBlank: styled.View``,
  SelectWrapper: styled.View`
    margin: 32px 0 16px;
    align-items: center;
    justify-content: center;
  `,
};

const style = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: TRIANGLE_LEFT_WIDTH * (1000 / 1732),
    borderRightWidth: TRIANGLE_LEFT_WIDTH * (1000 / 1732),
    borderBottomWidth: TRIANGLE_LEFT_WIDTH,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primaryLighter,
    borderRadius: 10,
  },
});
