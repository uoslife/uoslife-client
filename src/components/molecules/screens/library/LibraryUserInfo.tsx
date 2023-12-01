import {useEffect} from 'react';
import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {useAtom} from 'jotai';

import LibraryCircleTimer from './LibraryCircleTimer';
import TextItems from '../../common/textItems/TextItems';

import useUserState from '../../../../hooks/useUserState';

import UtilityService from '../../../../services/utility';
import {UserAtomType} from '../../../../store/account/user';
import libraryReservationAtom, {
  ReservationStatusTypeInUsing,
} from '../../../../store/library';
import {libraryInformationMessage} from '../../../../configs/utility/library';

const getInformationMessage = (
  reservationStatus: ReservationStatusTypeInUsing,
  user: UserAtomType['user'],
) => {
  return `${user || 'undefined'}님 ${
    libraryInformationMessage[reservationStatus]
  }`;
};

const LibraryUserInfo = () => {
  const {user} = useUserState();
  const [
    {reservationStatus, reservationInfo, isStudyRoom},
    setLibraryReservation,
  ] = useAtom(libraryReservationAtom);

  useEffect(() => {
    (async () => {
      const res = await UtilityService.getLibraryReservation();
      setLibraryReservation(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.userInfoWrapper>
      {reservationInfo ? (
        <Txt
          color="grey190"
          label={getInformationMessage(
            reservationStatus as ReservationStatusTypeInUsing,
            user,
          )}
          typograph="titleLarge"
        />
      ) : null}
      <LibraryCircleTimer
        reservationStatus={reservationStatus}
        remainingSeconds={reservationInfo?.remainingSeconds || null}
        seatStartTime={reservationInfo?.seatStartTime || null}
      />
      {reservationInfo ? (
        <S.InformationTextWrapper>
          <TextItems
            label="열람실"
            item={
              isStudyRoom
                ? reservationInfo.studyRoomName
                : reservationInfo.seatRoomName
            }
          />
          <TextItems
            label="좌석번호"
            item={`${
              isStudyRoom
                ? reservationInfo.studyRoomNo
                : `${reservationInfo.seatNo}번`
            }`}
          />
          <TextItems
            label="이용시간"
            item={
              isStudyRoom
                ? reservationInfo.studyRoomUseTime
                : reservationInfo.seatUseTime
            }
          />
          {!isStudyRoom && (
            <TextItems
              label="연장횟수"
              item={`${reservationInfo.extendUsed}회 / ${reservationInfo.extendRemaining}회`}
            />
          )}
        </S.InformationTextWrapper>
      ) : null}
    </S.userInfoWrapper>
  );
};

export default LibraryUserInfo;

const S = {
  userInfoWrapper: styled.View`
    align-items: center;
    width: 100%;
    padding-top: 20px;
    gap: 24px;
  `,
  InformationTextWrapper: styled.View`
    gap: 8px;
    width: 100%;
    padding: 0 32px;
  `,
};
