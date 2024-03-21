import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';

import {useEffect, useState} from 'react';
import CardLayout from '../../common/cardLayout/CardLayout';
import UtilityService from '../../../../services/utility';
import {RecapInfoType} from '../../../../api/services/core/libraryHistory/libraryHistoryAPI.type';

const LibraryUsageHistory = () => {
  const [LibraryHistory, setLibraryHistory] = useState<RecapInfoType | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const libraryStatusRes = await UtilityService.getLibraryUsageStatus();
      setLibraryHistory(libraryStatusRes);
    })();
  }, []);

  return (
    <S.Container>
      <Txt
        label="올해의 도서관 이용 내역"
        color="grey190"
        typograph="titleLarge"
        style={{paddingLeft: 8}}
      />
      <S.LibraryHistoryCardWrapper>
        {!LibraryHistory ? (
          <CardLayout style={{padding: 20, paddingLeft: 16, gap: 6}}>
            <Txt
              label="정보를 불러올 수 없어요."
              color="grey150"
              typograph="titleSmall"
            />
            <Txt
              label="서버의 문제이거나 졸업생이면 확인할 수 없어요"
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
                    label={LibraryHistory.usageTime.useTime.toString()}
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
                  <Txt label="이용시간" color="grey90" typograph="titleSmall" />
                </S.CardLeftWrapper>
                <S.CardTextWrapper>
                  <Txt
                    label={LibraryHistory.usageTime.useHour.toString()}
                    color="primaryBrand"
                    typograph="headlineMedium"
                  />
                  <Txt label="시간" color="grey90" typograph="headlineMedium" />
                </S.CardTextWrapper>
              </S.CardContainer>
            </CardLayout>
          </>
        )}
      </S.LibraryHistoryCardWrapper>
    </S.Container>
  );
};

export default LibraryUsageHistory;

const S = {
  Container: styled.View`
    width: 100%;
    padding: 48px 16px 0 16px;
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

  CardLeftWrapper: styled.View`
    gap: 4px;
    flex-direction: row;
  `,
  CardTextWrapper: styled.View`
    flex-direction: row;
  `,
};
