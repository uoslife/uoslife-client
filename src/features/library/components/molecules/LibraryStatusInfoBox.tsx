import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {
  SeatStatusColorEnum,
  SeatStatusEnum,
} from '../../constants/librarySeatingChart/seatStatus';

const LibraryStatusInfoBox = () => {
  return (
    <S.StatusInfo>
      <S.StatusItemWrapper>
        <S.StatusColorBox
          style={{backgroundColor: SeatStatusColorEnum.AVAILABLE}}
        />
        <Txt
          label={SeatStatusEnum.AVAILABLE}
          color="grey190"
          typograph="labelMedium"
        />
      </S.StatusItemWrapper>
      <S.StatusItemWrapper>
        <S.StatusColorBox
          style={{backgroundColor: SeatStatusColorEnum.RESERVED}}
        />
        <Txt
          label={SeatStatusEnum.RESERVED}
          color="grey190"
          typograph="labelMedium"
        />
      </S.StatusItemWrapper>
      <S.StatusItemWrapper>
        <S.StatusColorBox
          style={{backgroundColor: SeatStatusColorEnum.SPECIFIED}}
        />
        <Txt
          label={SeatStatusEnum.SPECIFIED}
          color="grey190"
          typograph="labelMedium"
        />
      </S.StatusItemWrapper>
      <S.StatusItemWrapper>
        <S.StatusColorBox
          style={{backgroundColor: SeatStatusColorEnum.NOT_AVAILABLE}}
        />
        <Txt
          label={SeatStatusEnum.NOT_AVAILABLE}
          color="grey190"
          typograph="labelMedium"
        />
      </S.StatusItemWrapper>
    </S.StatusInfo>
  );
};

export default LibraryStatusInfoBox;

const S = {
  StatusInfo: styled.View`
    padding: 14px 10px;
    width: 100%;
    gap: 14px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  StatusItemWrapper: styled.View`
    flex-direction: row;
    gap: 4px;
  `,
  StatusColorBox: styled.View`
    width: 18px;
    height: 18px;
    border-radius: 6px;
  `,
};
