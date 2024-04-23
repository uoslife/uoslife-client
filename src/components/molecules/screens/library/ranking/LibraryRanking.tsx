import styled from '@emotion/native';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import {useQueries} from '@tanstack/react-query';
import {Txt} from '@uoslife/design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import LibraryRankingServiceBox from './LibraryRankingServiceBox';
import usePullToRefresh from '../../../../../hooks/usePullToRefresh';
import Select from '../../../common/select/Select';
import {LibraryRankingTabsType} from '../../../../../configs/utility/libraryTabs';
import {LibraryRankingContentType} from '../../../../../api/services/util/library/libraryAPI.type';
import {
  calculateRankingChartHeight,
  calculateRankingChartBgColor,
  changeHourFromMin,
} from '../../../../../utils/library/libraryRanking';
import {
  LibraryRankingMajorNameType,
  LibraryRankingMajorName,
} from '../../../../../configs/utility/libraryRanking/libraryRanking';
import {UtilAPI} from '../../../../../api/services';
import useUserState from '../../../../../hooks/useUserState';
import Skeleton from '../../../common/skeleton/Skeleton';

const TRIANGLE_WIDTH = Dimensions.get('screen').width - 96;
const TRIANGLE_HEIGHT = TRIANGLE_WIDTH * (442 / 508);
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
          label={changeHourFromMin(time)}
          color="primaryBrand"
          typograph="titleMedium"
          style={{paddingTop: 1}}
        />
      </S.ChartInfoWrapper>
    </S.ChartContainer>
  );
};

type Props = {duration: LibraryRankingTabsType};

const LibraryRanking = ({duration}: Props) => {
  const {user} = useUserState();
  const insets = useSafeAreaInsets();
  const [major, setMajor] = useState<LibraryRankingMajorNameType>('시대생');
  const [rankingData, myRankingData] = useQueries({
    queries: [
      {
        queryKey: ['getLibraryRanking', duration, major],
        queryFn: () =>
          UtilAPI.getLibraryRanking({
            duration,
            major,
          }),
      },
      {
        queryKey: ['getMyLibraryRanking', duration, major],
        queryFn: () =>
          UtilAPI.getMyLibraryRanking({
            duration,
            major,
          }),
      },
    ],
  });
  const [isFetchingData, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    const timeout = setTimeout(() => {
      setIsFetching(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [rankingData.isFetching]);

  const isGraduateUser = useMemo(
    () => user?.enrollmentStatus === '졸업생',
    [user],
  );
  const isUnusedUser = useMemo(
    () => myRankingData.data?.rank === 0,
    [myRankingData.data?.rank],
  );

  const {refreshing, onRefresh} = usePullToRefresh(() =>
    Promise.all([rankingData.refetch(), myRankingData.refetch()]),
  );
  return (
    <S.Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <S.SelectWrapper style={{zIndex: 10, elevation: 5}}>
        <Select
          options={LibraryRankingMajorName}
          currentOption={major}
          setCurrent={setMajor}
        />
      </S.SelectWrapper>
      <LibraryRankingServiceBox label="상위 랭킹">
        {isFetchingData ? (
          <Skeleton variant="ranking" />
        ) : (
          <S.TopRankingBoxContainer>
            {rankingData.data?.content.length === 0 ? (
              <Txt
                label="랭킹 데이터가 없어요."
                color="grey160"
                typograph="titleSmall"
              />
            ) : (
              rankingData.data?.content
                .sort(
                  (a, b) =>
                    TOP_RANKING_ORDER.indexOf(a.rank) -
                    TOP_RANKING_ORDER.indexOf(b.rank),
                )
                .map(content => (
                  <LibraryRankingChart
                    key={content.userId}
                    contents={content}
                  />
                ))
            )}
          </S.TopRankingBoxContainer>
        )}
      </LibraryRankingServiceBox>
      <LibraryRankingServiceBox label="내 랭킹">
        <S.TriangleContainer>
          <Image
            source={require('../../../../../assets/images/library_ranking_triangle.png')}
            style={{width: TRIANGLE_WIDTH, height: TRIANGLE_HEIGHT}}
          />
          <S.MyRankingIndicator
            style={{
              top:
                !myRankingData.data || myRankingData.data.rank !== 0
                  ? (TRIANGLE_HEIGHT * (myRankingData?.data?.rank ?? 1)) /
                    (myRankingData?.data?.totalRank ?? 1)
                  : TRIANGLE_HEIGHT,
            }}
          />
        </S.TriangleContainer>

        <S.MyRankingInfoWrapper>
          {isGraduateUser || isUnusedUser ? (
            <Txt
              label={
                isGraduateUser
                  ? '졸업생은 확인할 수 없어요'
                  : '도서관 이용 후 확인이 가능해요'
              }
              color="grey190"
              typograph="titleMedium"
            />
          ) : (
            <>
              <Txt
                label={`${myRankingData.data?.rank}위 / ${myRankingData.data?.totalRank}위`}
                color="grey190"
                typograph="titleLarge"
              />
              <Txt
                label={`${changeHourFromMin(myRankingData.data?.time)}`}
                color="primaryBrand"
                typograph="titleLarge"
              />
            </>
          )}
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

// 28 36 32
