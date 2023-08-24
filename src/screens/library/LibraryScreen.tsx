import styled from '@emotion/native';
import Header from '../../components/header/Header';
import {useEffect, useState} from 'react';
import LibraryTimer from '../../components/molecules/library/LibraryTimer';
import {Txt} from '@uoslife/design-system';
import {CardLayout} from '../../components/molecules';

type LibraryUserInfo =
  | {
      userName: string;
      state: '이용 중' | '외출 중'; // 사용자 상태
      timerTime: number; // 타이머에 표시: 초 단위로
      room: string; // 열람실: 가능하면 type을 나중에 더 specific하게 변경하기
      seatNum: number; // 좌석번호
      timeOfUse: string; // 이용시간: 가능하면 type을 나중에 더 specific하게 변경하기
      extended: number; // 연장 횟수: 0 - 3회
    }
  | {
      state: '비이용'; // 사용자 상태
    };

// Header 상단바에 겹침 이슈 해결 필요
const LibraryScreen = () => {
  const [libraryUserInfo, setLibraryUserInfo] = useState<LibraryUserInfo>({
    userName: '한유민',
    state: '이용 중',
    timerTime: 1000,
    room: '쏼라쏼라',
    seatNum: 21,
    timeOfUse: '30:00 - 90:00',
    extended: 0,
  });

  // API 붙이기
  useEffect(() => {}, []);

  const UserInfo = () => {
    switch (libraryUserInfo.state) {
      case '비이용':
        return (
          <S.userInfoWrapper>
            <S.timerContainer>
              <LibraryTimer state={libraryUserInfo.state} />
            </S.timerContainer>
          </S.userInfoWrapper>
        );
      default:
        const {room, seatNum, timeOfUse, extended} = libraryUserInfo;

        // 남은 시간에 따라 달라지게 해야 함: 아직 미구현
        const processedSaying = `${libraryUserInfo.userName}님 잘하고 있어요!`;

        const processedDescriptionArray = [
          ['열람실', room],
          ['좌석번호', `${seatNum}번`],
          ['이용시간', timeOfUse],
          ['연장횟수', `${extended}회 / 3회`],
        ];

        return (
          <S.userInfoWrapper>
            <S.sayingContainer>
              <Txt
                color={'grey190'}
                label={processedSaying}
                typograph={'titleLarge'}
              />
            </S.sayingContainer>
            <S.timerContainer>
              <LibraryTimer
                state={libraryUserInfo.state}
                timerTime={libraryUserInfo.timerTime}
              />
            </S.timerContainer>
            <S.userInfoDescription>
              {processedDescriptionArray.map((item, i) => (
                <S.descriptionItemContainer key={i}>
                  <Txt
                    style={{width: 56}}
                    color={'grey90'}
                    label={item[0]}
                    typograph="titleSmall"
                  />
                  <Txt
                    color={'grey190'}
                    label={item[1]}
                    typograph="bodyLarge"
                  />
                </S.descriptionItemContainer>
              ))}
            </S.userInfoDescription>
          </S.userInfoWrapper>
        );
    }
  };

  const SeatStatus = () => (
    <S.seatStatusWrapper>
      <S.seatStatusTopTextContainer>
        <Txt color="grey190" label="도서관 좌석 현황" typograph="titleLarge" />
      </S.seatStatusTopTextContainer>
      {/* Card */}
    </S.seatStatusWrapper>
  );

  return (
    <S.screenContainer>
      <Header label="도서관" />
      <UserInfo />
      <SeatStatus />
    </S.screenContainer>
  );
};

export default LibraryScreen;

const S = {
  screenContainer: styled.View`
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
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
  userInfoDescription: styled.View`
    display: flex;
    gap: 8px;

    width: 100%;

    padding-top: 24px;
    padding-left: 48px;
  `,
  descriptionItemContainer: styled.View`
    display: flex;
    flex-direction: row;
    gap: 24px;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
  `,
  seatStatusWrapper: styled.View`
    display: flex;
    width: 100%;

    padding-top: 48px;
    padding-left: 16px;
    padding-right: 16px;
  `,
  seatStatusTopTextContainer: styled.View`
    padding-left: 8px;
  `,
};
