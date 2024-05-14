import {Suspense} from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {useSuspenseQuery} from '@tanstack/react-query';

import CardLayout from '../../common/cardLayout/CardLayout';
import UtilityService from '../../../../services/utility';
import Skeleton from '../../common/skeleton/Skeleton';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';

const LibraryUsageHistory = () => {
  const {data, refetch} = useSuspenseQuery({
    queryKey: ['getLibraryUsageStatus'],
    queryFn: () => UtilityService.getLibraryUsageStatus(),
  });

  return (
    <S.Container>
      <S.TitleWrapper>
        <Txt
          label="올해의 도서관 이용 내역"
          color="grey190"
          typograph="titleLarge"
        />
        <AnimatePress onPress={() => refetch()} variant="scale_up">
          <Icon name="refresh" width={24} height={24} color="grey90" />
        </AnimatePress>
      </S.TitleWrapper>
      <Suspense fallback={<Skeleton variant="card" />}>
        <S.LibraryHistoryCardWrapper>
          {!data ? (
            <CardLayout style={{padding: 20, paddingLeft: 16, gap: 6}}>
              <Txt
                label="정보를 불러올 수 없어요."
                color="grey150"
                typograph="titleSmall"
              />
              <Txt
                label="서버의 문제이거나 졸업생이면 확인할 수 없어요."
                color="grey90"
                typograph="caption"
              />
            </CardLayout>
          ) : (
            <>
              <CardLayout>
                <S.CardContainer>
                  <S.CardLeftWrapper>
                    <Icon name="calendar" width={20} height={20} />
                    <Txt label="출석일" color="grey90" typograph="titleSmall" />
                  </S.CardLeftWrapper>
                  <S.CardTextWrapper>
                    <Txt
                      label={data.usageTime.usedDays.toString()}
                      color="primaryBrand"
                      typograph="headlineMedium"
                    />
                    <Txt
                      label="/365일"
                      color="grey90"
                      typograph="headlineMedium"
                    />
                  </S.CardTextWrapper>
                </S.CardContainer>
              </CardLayout>
              <CardLayout>
                <S.CardContainer>
                  <S.CardLeftWrapper>
                    <Icon name="alarm" width={20} height={20} />
                    <Txt
                      label="이용시간"
                      color="grey90"
                      typograph="titleSmall"
                    />
                  </S.CardLeftWrapper>
                  <S.CardTextWrapper>
                    <Txt
                      label={data.usageTime.usedMinute.toString()}
                      color="primaryBrand"
                      typograph="headlineMedium"
                    />
                    <Txt
                      label="시간"
                      color="grey90"
                      typograph="headlineMedium"
                    />
                  </S.CardTextWrapper>
                </S.CardContainer>
              </CardLayout>
            </>
          )}
        </S.LibraryHistoryCardWrapper>
      </Suspense>
    </S.Container>
  );
};

export default LibraryUsageHistory;

const S = {
  Container: styled.View`
    gap: 12px;
  `,
  LibraryHistoryCardWrapper: styled.View`
    gap: 12px;
  `,
  CardContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 16px;
  `,
  TitleWrapper: styled.View`
    padding: 0 5px 0 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  CardLeftWrapper: styled.View`
    gap: 4px;
    flex-direction: row;
  `,
  CardTextWrapper: styled.View`
    flex-direction: row;
  `,
};
