import styled from '@emotion/native';
import Header from '../../components/header/Header';
import {useEffect, useState} from 'react';
import LibraryTimer from '../../components/molecules/library/LibraryTimer';
import {Txt, colors} from '@uoslife/design-system';
import {
  LibrarySeatStatus,
  SeatStatusProps,
} from '../../components/molecules/library/LibararySeatStatus';
import {ScrollView} from 'react-native-gesture-handler';
import {LibraryCardProps} from '../../components/molecules/library/LibraryCard';

type LibraryUserInfo =
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

// Header 상단바에 겹침 이슈 해결 필요
const LibraryScreen = () => {
  const [libraryUserInfo, setLibraryUserInfo] = useState<LibraryUserInfo>({
    userName: '한유민',
    using: true,
    leave: false,
    timerTime: 1805,
    room: '쏼라쏼라열람실',
    seatNum: 21,
    timeOfUse: '14:00 - 20:00',
    extended: 0,
  });
  const [seatStatus, setSeatStatus] = useState<LibraryCardProps[]>([
    {
      libraryName: '중앙도서관',
      rooms: [
        {roomName: '0 데시벨 1', remainingSeatCnt: 228, totalSeatCnt: 266},
        {roomName: '0 데시벨 2', remainingSeatCnt: 80, totalSeatCnt: 243},
        {roomName: '0 ZONE 1', remainingSeatCnt: 228, totalSeatCnt: 266},
        {roomName: '0 ZONE 2', remainingSeatCnt: 3420940239, totalSeatCnt: 266},
      ],
    },
    {
      libraryName: '경영경제전문도서관',
      rooms: [
        {roomName: '제1 열람실', remainingSeatCnt: 40, totalSeatCnt: 50},
        {
          roomName: '제2 열람실',
          remainingSeatCnt: 1234123412234,
          totalSeatCnt: 234321234121343,
        },
      ],
    },
    {
      libraryName: '법학전문도서관',
      rooms: [
        {roomName: '멀티미디어실', remainingSeatCnt: 40, totalSeatCnt: 50},
        {
          roomName: 'ㅇㅇ',
          remainingSeatCnt: 12341234124234,
          totalSeatCnt: 234321232341343,
        },
      ],
    },
  ]);

  // 정보 불러오는 API 붙이기
  useEffect(() => {}, []);

  const UserInfo = () => {
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
                <Txt
                  color={'grey190'}
                  label={item.value}
                  typograph="bodyLarge"
                />
              </S.userInfoDetailItem>
            ),
          )}
        </S.userInfoDetails>
      </S.userInfoWrapper>
    );
  };

  return (
    <ScrollView>
      <S.screenContainer>
        <Header label="도서관" />
        <UserInfo />
        <LibrarySeatStatus libraries={seatStatus} />
      </S.screenContainer>
    </ScrollView>
  );
};

export default LibraryScreen;

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

const S = {
  screenContainer: styled.View`
    height: 100%;
    width: 100%;

    background: ${() => colors.grey10};

    display: flex;
    align-items: center;

    padding-bottom: 70px;
  `,
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
