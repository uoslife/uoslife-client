import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import LibraryTimer from './LibraryTimer';

export type LibraryUserInfoType =
  | {
      userName: string;
      using: true; // 사용여부
      leave: boolean; // 외출여부
      timerTime: number; // 타이머에 표시될 시간: 초 단위
      room: string; // 열람실: 가능하면 type을 나중에 더 specific하게 변경하기
      seatNum: number; // 좌석번호
      timeOfUse: string; // 이용 가능 시간: 가능하면 type을 나중에 더 specific하게 변경하기(정규표현식 등 이용)
      extended: number; // 연장 횟수: 0 - 3회
    }
  | {
      using: false;
    };
// Driven by LibraryUserInfo
export type UsingStatus = 'IN-USE' | 'OUTGO' | 'BE-CLOSED' | 'NOT-USED';
export type UsingStatusWithoutNotUsed = Exclude<UsingStatus, 'NOT-USED'>;

const LibraryUserInfo = ({
  libraryUserInfo,
}: {
  libraryUserInfo: LibraryUserInfoType;
}) => {
  const usingStatus: UsingStatus = (function () {
    // 사용 X
    if (!libraryUserInfo.using) return 'NOT-USED';

    // 사용 O, 외출 X
    if (!libraryUserInfo.leave) return 'IN-USE';

    // 외출 O, 외출시간 > 30분
    if (libraryUserInfo.timerTime > 1800) return 'OUTGO';

    // 외출 O, 외출시간 <= 30분
    return 'BE-CLOSED';
  })();

  if (usingStatus === 'NOT-USED' || !libraryUserInfo.using)
    return (
      <S.userInfoWrapper>
        <S.timerContainer>
          <LibraryTimer usingStatus={usingStatus} />
        </S.timerContainer>
      </S.userInfoWrapper>
    );

  const {room, seatNum, timeOfUse, extended, userName} = libraryUserInfo;

  const getSaying = ({
    userName,
    usingStatus,
  }: {
    userName: string;
    usingStatus: UsingStatusWithoutNotUsed;
  }) => {
    const additionalSaying: {[key in UsingStatusWithoutNotUsed]: string} = {
      'IN-USE': '잘하고 있어요!',
      OUTGO: '조심히 다져오세요!',
      'BE-CLOSED': '',
    };

    return `${userName}님 ${additionalSaying[usingStatus]}`;
  };

  const getDescriptions = ({
    room,
    seatNum,
    timeOfUse,
    extended,
  }: {
    room: string;
    seatNum: number;
    timeOfUse: string;
    extended: number;
  }) => {
    return [
      {key: '열람실', value: room},
      {key: '좌석번호', value: `${seatNum}번`},
      {key: '이용시간', value: timeOfUse},
      {key: '연장횟수', value: `${extended}회 / 3회`},
    ];
  };

  return (
    <S.userInfoWrapper>
      <S.sayingContainer>
        <Txt
          color={'grey190'}
          label={getSaying({userName, usingStatus})}
          typograph={'titleLarge'}
        />
      </S.sayingContainer>
      <S.timerContainer>
        <LibraryTimer
          usingStatus={usingStatus}
          timerTime={libraryUserInfo.timerTime}
        />
      </S.timerContainer>
      <S.userInfoDetails>
        {getDescriptions({extended, room, seatNum, timeOfUse}).map(
          (item, i) => (
            <S.userInfoDetailItem key={i}>
              <Txt
                style={{width: 56}}
                color={'grey90'}
                label={item.key}
                typograph="titleSmall"
              />
              <Txt color={'grey190'} label={item.value} typograph="bodyLarge" />
            </S.userInfoDetailItem>
          ),
        )}
      </S.userInfoDetails>
    </S.userInfoWrapper>
  );
};

export default LibraryUserInfo;

const S = {
  userInfoWrapper: styled.View`
    align-items: center;
    width: 100%;
  `,
  sayingContainer: styled.View`
    padding-top: 20px;
    align-items: center;
  `,
  timerContainer: styled.View`
    padding-top: 24px;
  `,
  userInfoDetails: styled.View`
    gap: 8px;
    width: 100%;
    padding: 24px 0 0 64px;
  `,
  userInfoDetailItem: styled.View`
    flex-direction: row;
    gap: 24px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  `,
};
