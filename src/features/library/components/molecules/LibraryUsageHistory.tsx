import {Suspense} from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {useSuspenseQuery} from '@tanstack/react-query';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';
import CardLayout from '../../../../components/molecules/common/cardLayout/CardLayout';
import Skeleton from '../../../../components/molecules/common/skeleton/Skeleton';
import LibraryServices from '../../services/library';
import {changeHourFromMin} from '../../utils/libraryRanking';
import useUserState from '../../../../hooks/useUserState';

const LibraryUsageHistory = () => {
  const {data, refetch} = useSuspenseQuery({
    queryKey: ['getLibraryUsageStatus'],
    queryFn: () => LibraryServices.getLibraryUsageStatus(),
  });

  const {user} = useUserState();
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
              {user?.identity.status === '졸업생' ? (
                <Txt
                  label="졸업생이면 확인할 수 없어요."
                  color="grey150"
                  typograph="titleSmall"
                />
              ) : (
                <>
                  <Txt
                    label="정보를 불러올 수 없어요."
                    color="grey150"
                    typograph="titleSmall"
                  />
                  <Txt
                    label="서버의 문제일 수 있어요. 잠시 후 다시 시도해주세요."
                    color="grey90"
                    typograph="caption"
                  />
                </>
              )}
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
                      label={changeHourFromMin(data.usageTime.usedMinute)}
                      color="primaryBrand"
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
    margin-top: 6px;
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
