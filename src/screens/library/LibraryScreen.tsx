import styled from '@emotion/native';
import Header from '../../components/header/Header';
import {useEffect, useState} from 'react';
import LibraryTimer from '../../components/molecules/library/LibraryTimer';
import {Txt} from '@uoslife/design-system';
import LibraryCardItem from '../../components/molecules/library/LibraryCardItem';

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
    timerTime: 1000,
    room: '쏼라쏼라열람실',
    seatNum: 21,
    timeOfUse: '14:00 - 20:00',
    extended: 0,
  });

  // API 붙이기
  useEffect(() => {}, []);

  const UserInfo = () => {
    const usingStatus = !libraryUserInfo.using
      ? 3 // 3: 미사용
      : !libraryUserInfo.leave
      ? 0 // 0: 사용, 도서관 내부
      : libraryUserInfo.timerTime > 1800
      ? 1 // 1: 사용, 외출, 30분 초과 남음
      : 2; // 2: 사용, 외출, 30분 이하 남음

    if (!libraryUserInfo.using)
      return (
        <S.userInfoWrapper>
          <S.timerContainer>
            <LibraryTimer usingStatus={usingStatus} />
          </S.timerContainer>
        </S.userInfoWrapper>
      );

    const {room, seatNum, timeOfUse, extended, userName} = libraryUserInfo;

    const sayingArray = [
      '잘하고 있어요!',
      '조심히 다녀오세요!',
      '시간이 얼마 남지 않았어요!',
    ];
    const processedSaying = `${userName}님 ` + sayingArray[usingStatus];

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
            usingStatus={usingStatus}
            timerTime={libraryUserInfo.timerTime}
          />
        </S.timerContainer>
        <S.userInfoDetails>
          {processedDescriptionArray.map((item, i) => (
            <S.detailItem key={i}>
              <Txt
                style={{width: 56}}
                color={'grey90'}
                label={item[0]}
                typograph="titleSmall"
              />
              <Txt color={'grey190'} label={item[1]} typograph="bodyLarge" />
            </S.detailItem>
          ))}
        </S.userInfoDetails>
      </S.userInfoWrapper>
    );
  };

  const SeatStatus = () => (
    <S.seatStatusWrapper>
      <S.seatStatusTopTextContainer>
        <Txt color="grey190" label="도서관 좌석 현황" typograph="titleLarge" />
      </S.seatStatusTopTextContainer>
      <LibraryCardItem />
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
  userInfoDetails: styled.View`
    display: flex;
    gap: 8px;

    width: 100%;

    padding-top: 24px;
    padding-left: 48px;
  `,
  detailItem: styled.View`
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
