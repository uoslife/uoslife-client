import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {useAtom} from 'jotai';

import LibraryCircleTimer from './LibraryCircleTimer';
import TextItems from '../../../../common/textItems/TextItems';

import useUserState from '../../../../../../hooks/useUserState';

import {UserAtomType} from '../../../../../../store/account/user';
import {
  ReservationStatusTypeInUsing,
  libraryReservationAtom,
} from '../../../../../../store/library';
import {libraryInformationMessage} from '../../../../../../configs/utility/library';

const getInformationMessage = (
  reservationStatus: ReservationStatusTypeInUsing,
  user: UserAtomType['user'],
) => {
  return `${user?.nickname || 'undefined'}님 ${
    libraryInformationMessage[reservationStatus]
  }`;
};

const LibraryUserInfo = () => {
  const {user} = useUserState();
  const [{data}] = useAtom(libraryReservationAtom);

  return (
    <S.userInfoWrapper>
      {data.reservationInfo ? (
        <Txt
          color="grey190"
          label={getInformationMessage(
            data.reservationStatus as ReservationStatusTypeInUsing,
            user,
          )}
          typograph="titleLarge"
        />
      ) : null}
      <LibraryCircleTimer
        reservationStatus={data.reservationStatus}
        remainingSeconds={data.reservationInfo?.remainingSeconds || null}
        seatStartTime={data.reservationInfo?.seatStartTime || null}
      />
      {data.reservationInfo ? (
        <S.InformationTextWrapper>
          <TextItems
            label="열람실"
            item={
              data.isStudyRoom
                ? data.reservationInfo.studyRoomName
                : data.reservationInfo.seatRoomName
            }
          />
          <TextItems
            label="좌석번호"
            item={`${
              data.isStudyRoom
                ? data.reservationInfo.studyRoomNo
                : `${data.reservationInfo.seatNo}번`
            }`}
          />
          <TextItems
            label="이용시간"
            item={
              data.isStudyRoom
                ? data.reservationInfo.studyRoomUseTime
                : data.reservationInfo.seatUseTime
            }
          />
          {!data.isStudyRoom && (
            <TextItems
              label="연장횟수"
              item={`${data.reservationInfo.extendUsed}회 / ${data.reservationInfo.extendRemaining}회`}
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
    padding: 20px 16px 0px;
    gap: 24px;
  `,
  InformationTextWrapper: styled.View`
    gap: 8px;
    width: 100%;
    padding: 0 32px;
  `,
};
