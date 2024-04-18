import styled from '@emotion/native';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useState} from 'react';
import {useQueries} from '@tanstack/react-query';
import {Txt, colors} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import LibraryRankingServiceBox from './LibraryRankingServiceBox';
import usePullToRefresh from '../../../../../hooks/usePullToRefresh';
import Select from '../../../common/select/Select';
import {LibraryRankingTabsType} from '../../../../../configs/utility/libraryTabs';
import {LibraryRankingContentType} from '../../../../../api/services/util/library/libraryAPI.type';
import {
  calculateRankingChartHeight,
  calculateRankingChartBgColor,
} from '../../../../../utils/library/libraryRanking';
import {
  LibraryRankingMajorNameType,
  LibraryRankingMajorName,
  LibraryRankingMajorEnum,
} from '../../../../../configs/utility/libraryRanking/libraryRanking';
import {UtilAPI} from '../../../../../api/services';

const TRIANGLE_LEFT_WIDTH = Dimensions.get('screen').width - 136;
const TOP_RANKING_ORDER = [2, 1, 3];

const LibraryRankingChart = ({
  contents: {rank, time, nickname, departmentName},
}: {
  contents: LibraryRankingContentType;
}) => {
  return (
    <S.ChartContainer>
      <View>
        <S.ChartCrownImageWrapper>
          {rank === 1 && (
            <Image
              source={require('../../../../../assets/images/library_chart_crown.png')}
              style={{width: 25, height: 20}}
            />
          )}
          <Txt label={rank.toString()} color="grey190" typograph="titleLarge" />
        </S.ChartCrownImageWrapper>
        <S.ChartBarContainer>
          <S.ChartBar
            style={{
              height: calculateRankingChartHeight(rank),
              backgroundColor: calculateRankingChartBgColor(rank),
            }}
          />
        </S.ChartBarContainer>
      </View>
      <S.ChartInfoWrapper>
        <ScrollView
          horizontal
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          style={{borderRadius: 6}}>
          <Txt label={nickname} color="grey190" typograph="titleMedium" />
        </ScrollView>
        <ScrollView
          horizontal
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          style={{borderRadius: 6}}>
          <Txt label={departmentName} color="grey90" typograph="bodySmall" />
        </ScrollView>
        <Txt
          label={`${time}시간`}
          color="primaryBrand"
          typograph="titleMedium"
        />
      </S.ChartInfoWrapper>
    </S.ChartContainer>
  );
};

type Props = {duration: LibraryRankingTabsType};

const mockData: LibraryRankingContentType[] = [
  {
    rank: 1,
    time: 86,
    userId: 14,
    nickname: '정세',
    departmentName: '디자인학과',
  },
  {
    rank: 2,
    time: 58,
    userId: 334,
    nickname: '정세에에',
    departmentName: '전기전자컴퓨터공학부',
  },
  {
    rank: 3,
    time: 48,
    userId: 4,
    nickname: '정세에에에',
    departmentName: '컴퓨터과학부',
  },
];
const meMockData = {
  rank: 226,
  time: 86,
  nickname: 'asdf',
  major: '전기전자컴퓨터공학부',
  totalRank: 246,
};

const LibraryRanking = ({duration}: Props) => {
  const insets = useSafeAreaInsets();
  const [major, setMajor] = useState<LibraryRankingMajorNameType>('시대생');
  const [rankingData, myRankingData] = useQueries({
    queries: [
      {
        queryKey: [
          'getLibraryRanking',
          duration,
          LibraryRankingMajorEnum[major],
        ],
        queryFn: () =>
          UtilAPI.getLibraryRanking({
            duration,
            major: LibraryRankingMajorEnum[major],
          }),
      },
      {
        queryKey: [
          'getMyLibraryRanking',
          duration,
          LibraryRankingMajorEnum[major],
        ],
        queryFn: () =>
          UtilAPI.getMyLibraryRanking({
            duration,
            major: LibraryRankingMajorEnum[major],
          }),
      },
    ],
  });
  const {refreshing, onRefresh} = usePullToRefresh(() =>
    Promise.all([rankingData.refetch(), myRankingData.refetch()]),
  );
  return (
    <S.Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <S.SelectWrapper style={{zIndex: 1000, elevation: 5}}>
        <Select
          options={LibraryRankingMajorName}
          currentOption={major}
          setCurrent={setMajor}
        />
      </S.SelectWrapper>
      <LibraryRankingServiceBox label="상위 랭킹">
        <S.TopRankingBoxContainer>
          {mockData
            .sort(
              (a, b) =>
                TOP_RANKING_ORDER.indexOf(a.rank) -
                TOP_RANKING_ORDER.indexOf(b.rank),
            )
            .map(content => (
              <LibraryRankingChart key={content.userId} contents={content} />
            ))}
        </S.TopRankingBoxContainer>
      </LibraryRankingServiceBox>
      <LibraryRankingServiceBox label="내 랭킹">
        <S.TriangleContainer>
          <S.Triangle style={style.triangle} />
          <S.MyRankingIndicator
            style={{
              top:
                TRIANGLE_LEFT_WIDTH * (meMockData.rank / meMockData.totalRank),
            }}
          />
        </S.TriangleContainer>
        <S.MyRankingInfoWrapper>
          <Txt
            label={`${meMockData.rank}위 / ${meMockData.totalRank}위`}
            color="grey190"
            typograph="titleLarge"
          />
          <Txt
            label={`${meMockData.time}시간`}
            color="primaryBrand"
            typograph="titleLarge"
          />
        </S.MyRankingInfoWrapper>
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
    flex-direction: row;
    justify-content: space-between;
  `,
  ChartCrownImageWrapper: styled.View`
    align-items: center;
  `,
  ChartContainer: styled.View`
    width: 33%;
    gap: 8px;
    justify-content: flex-end;
  `,
  ChartNumber: styled.View``,
  ChartBarContainer: styled.View`
    align-items: center;
  `,
  ChartBar: styled.View`
    width: 60%;
    border-radius: 24px;
  `,
  ChartInfoWrapper: styled.View`
    align-items: center;
  `,
  TriangleContainer: styled.View`
    margin: 16px 16px 8px;
  `,
  Triangle: styled.View``,
  MyRankingInfoWrapper: styled.View`
    align-items: center;
    gap: 4px;
  `,
  MyRankingIndicator: styled.View`
    position: absolute;
    left: 0;
    width: 100%;
    height: 8px;
    border-radius: 16px;
    background-color: rgba(0, 82, 224, 0.5);
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
