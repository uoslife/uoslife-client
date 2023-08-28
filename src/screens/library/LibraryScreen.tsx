import styled from '@emotion/native';
import Header from '../../components/header/Header';
import {useEffect, useState} from 'react';
import LibraryTimer from '../../components/molecules/library/LibraryTimer';
import {Txt, colors} from '@uoslife/design-system';
import {LibrarySeatStatus} from '../../components/molecules/library/LibararySeatStatus';
import {ScrollView} from 'react-native-gesture-handler';
import {LibraryCardProps} from '../../components/molecules/library/LibraryCard';
import LibraryUserInfo, {
  LibraryUserInfoProps,
} from '../../components/molecules/library/LibraryUserInfo';

// Header 상단바에 겹침 이슈 해결 필요
const LibraryScreen = () => {
  const [libraryUserInfo, setLibraryUserInfo] = useState<LibraryUserInfoProps>({
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
        {roomName: '멀티미디어실', remainingSeatCnt: 40, totalSeatCnt: 180},
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

  return (
    <ScrollView>
      <S.screenContainer>
        <Header label="도서관" />
        <LibraryUserInfo libraryUserInfo={libraryUserInfo} />
        <LibrarySeatStatus libraries={seatStatus} />
      </S.screenContainer>
    </ScrollView>
  );
};

export default LibraryScreen;

const S = {
  screenContainer: styled.View`
    height: 100%;
    width: 100%;

    background: ${() => colors.grey10};

    display: flex;
    align-items: center;

    padding-bottom: 70px;
  `,
};
