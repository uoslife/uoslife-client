import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import LibraryCard, {LibraryCardProps} from './LibraryCard';

export type SeatStatusProps = {
  libraries: LibraryCardProps[];
};

export const LibrarySeatStatus = ({libraries}: SeatStatusProps) => (
  <S.seatStatusWrapper>
    <S.seatStatusTopTextContainer>
      <Txt color="grey190" label="도서관 좌석 현황" typograph="titleLarge" />
    </S.seatStatusTopTextContainer>

    <S.cardsWrapper>
      {libraries.map(library => (
        <LibraryCard
          key={library.libraryName}
          libraryName={library.libraryName}
          rooms={library.rooms}
        />
      ))}
    </S.cardsWrapper>
  </S.seatStatusWrapper>
);

const S = {
  seatStatusWrapper: styled.View`
    width: 100%;
    padding: 48px 16px 0 16px;
  `,
  seatStatusTopTextContainer: styled.View`
    padding-left: 8px;
  `,
  cardsWrapper: styled.View`
    padding-top: 12px;
    gap: 16px;
  `,
};
