import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import LibraryTimer from './LibraryTimer';
import {UtilAPI} from '../../../api/services';
import TextItems from '../common/textItems/TextItems';
import {GetLibraryReservationRes} from '../../../api/services/util/library/libraryAPI.type';
import storage from '../../../storage';
import {GetUserInfoRes} from '../../../api/services/core/user/userAPI.type';
import {ErrorResponseType} from '../../../api/services/type';

type UsingStatusIsUsingType = 'USING' | 'NOT_USING';
type UsingStatusInOutingType = 'OUTING_DEFAULT' | 'OUTING_NO_TIME';
export type UsingStatusType = UsingStatusIsUsingType | UsingStatusInOutingType;
export type UsingStatusExcludeNotUsing = Exclude<UsingStatusType, 'NOT_USING'>;

const INFORMATION_MESSAGE_FROM_STATUS: {[key in UsingStatusType]: string} = {
  USING: '잘하고 있어요!',
  OUTING_DEFAULT: '조심히 다녀오세요!',
  OUTING_NO_TIME: '시간이 얼마 남지 않았어요!',
  NOT_USING: '',
};

const getInformationMessage = (libraryUsingStatus: UsingStatusType) => {
  const userInfo = JSON.parse(storage.getString('user')!) as GetUserInfoRes;

  return `${userInfo.name ?? ''}님 ${
    INFORMATION_MESSAGE_FROM_STATUS[libraryUsingStatus]
  }`;
};

const LibraryUserInfo = () => {
  const [libraryReservationInfo, setLibraryReservationInfo] =
    useState<GetLibraryReservationRes>();
  const [libraryUsingStatus, setLibraryUsingStatus] =
    useState<UsingStatusType>();
  const [isStudyRoom, setIsStudyRoom] = useState(false);

  const getOutingStatus = (
    remainingSeconds: GetLibraryReservationRes['remainingSeconds'],
  ): UsingStatusType => {
    if (remainingSeconds < 30 * 60) return 'OUTING_DEFAULT';
    return 'OUTING_NO_TIME';
  };

  useEffect(() => {
    (async () => {
      try {
        const libraryReservationRes = await UtilAPI.getLibraryReservation({});
        setLibraryReservationInfo(libraryReservationRes);
        if (libraryReservationRes.seatRoomName === '') setIsStudyRoom(true);
        else setIsStudyRoom(false);

        const outingStatus = getOutingStatus(
          libraryReservationRes.remainingSeconds,
        );
        if (libraryReservationRes.remainingSeconds === -1)
          setLibraryUsingStatus('USING');
        else setLibraryUsingStatus(outingStatus);
      } catch (error) {
        const err = error as ErrorResponseType;
        setLibraryUsingStatus('NOT_USING');
        if (err.code === 'L01') setLibraryUsingStatus('NOT_USING');
        else console.error(err);
      }
    })();
  }, []);

  return (
    <S.userInfoWrapper>
      {!libraryReservationInfo || !libraryUsingStatus ? (
        <></>
      ) : (
        <>
          <Txt
            color="grey190"
            label={getInformationMessage(libraryUsingStatus)}
            typograph="titleLarge"
          />
          <LibraryTimer
            libraryUsingStatus={libraryUsingStatus}
            timerTime={libraryReservationInfo.remainingSeconds}
          />
          <S.InformationTextWrapper>
            <TextItems
              label="열람실"
              item={
                isStudyRoom
                  ? libraryReservationInfo!.studyRoomName
                  : libraryReservationInfo!.seatRoomName
              }
            />
            <TextItems
              label="좌석번호"
              item={`${
                isStudyRoom
                  ? libraryReservationInfo!.studyRoomNo
                  : `${libraryReservationInfo!.seatNo}번`
              }`}
            />
            <TextItems
              label="이용시간"
              item={
                isStudyRoom
                  ? libraryReservationInfo!.studyRoomUseTime
                  : libraryReservationInfo!.seatUseTime
              }
            />
            {!isStudyRoom && (
              <TextItems
                label="연장횟수"
                item={`${libraryReservationInfo!.extendUsed}회 / ${
                  libraryReservationInfo!.extendRemaining
                }회`}
              />
            )}
          </S.InformationTextWrapper>
        </>
      )}
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
