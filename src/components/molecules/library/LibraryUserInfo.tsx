import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import LibraryTimer from './LibraryTimer';

export type LibraryUserInfoProps =
  | {
      userName: string;
      using: true; // 사용여부
      leave: boolean; // 외출여부
      timerTime: number; // 타이머에 표시될 시간: 초 단위
      room: string; // 열람실: 가능하면 type을 나중에 더 specific하게 변경하기
      seatNum: number; // 좌석번호
      timeOfUse: string; // 이용시간: 가능하면 type을 나중에 더 specific하게 변경하기
      extended: number; // 연장 횟수: 0 - 3회
    }
  | {
      using: false;
    };

const LibraryUserInfo = ({
  libraryUserInfo,
}: {
  libraryUserInfo: LibraryUserInfoProps;
}) => {
  const usingStatus = !libraryUserInfo.using
    ? 3 // 3: 미사용
    : !libraryUserInfo.leave
    ? 0 // 0: 사용, 도서관 내부
    : libraryUserInfo.timerTime > 1800
    ? 1 // 1: 사용, 외출, 30분 초과 남음
    : 2; // 2: 사용, 외출, 30분 이하 남음

  if (usingStatus === 3 || !libraryUserInfo.using)
    return (
      <S.userInfoWrapper>
        <S.timerContainer>
          <LibraryTimer usingStatus={usingStatus} />
        </S.timerContainer>
      </S.userInfoWrapper>
    );

  const {room, seatNum, timeOfUse, extended, userName} = libraryUserInfo;

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

const getSaying = ({
  userName,
  usingStatus,
}: {
  userName: string;
  usingStatus: 0 | 1 | 2;
}) => {
  return `${userName}님 ${
    ['잘하고 있어요!', '조심히 다녀오세요!', '시간이 얼마 남지 않았어요!'][
      usingStatus
    ]
  }`;
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

export default LibraryUserInfo;

const S = {
  userInfoWrapper: styled.View`
    display: flex;
    align-items: center;

    width: 100%;
  `,
  sayingContainer: styled.View`
    padding-top: 20px;

    display: flex;
    align-items: center;
  `,
  timerContainer: styled.View`
    padding-top: 24px;
  `,
  userInfoDetails: styled.View`
    display: flex;
    gap: 8px;

    width: 100%;

    padding-top: 24px;
    padding-left: 48px;
  `,
  userInfoDetailItem: styled.View`
    display: flex;
    flex-direction: row;
    gap: 24px;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
  `,
};
