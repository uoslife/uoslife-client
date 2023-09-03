import styled from '@emotion/native';
import Card from '../../card/Card';
import LibraryCardRoomItem, {RoomProps} from './LibraryCardRoomItem';
import {colors} from '@uoslife/design-system';
import {View} from 'react-native';

export type LibraryCardProps = {libraryName: string; rooms: RoomProps[]};

const LibraryCard = ({libraryName, rooms}: LibraryCardProps) => {
  // emotion/native 라이브러리의 border-[direction] 관련 버그로 인해 style prop으로 구현하였습니다.
  // 구현 방식상 도서관당 열람실이 2개 이상 있어야 한다는 점 참고 바랍니다.
  const firstItemStyle = {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey20,
  };
  const middleItemStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey20,
  };
  const lastItemStyle = {
    paddingTop: 12,
  };

  return (
    <Card title={libraryName}>
      <S.cardContentContainer>
        {rooms.map((room, i) => (
          <View
            style={
              i === 0
                ? firstItemStyle
                : i === rooms.length - 1
                ? lastItemStyle
                : middleItemStyle
            }>
            <LibraryCardRoomItem
              key={room.roomName}
              remainingSeatCnt={room.remainingSeatCnt}
              totalSeatCnt={room.totalSeatCnt}
              roomName={room.roomName}
            />
          </View>
        ))}
      </S.cardContentContainer>
    </Card>
  );
};

export default LibraryCard;

const S = {
  cardContentContainer: styled.View`
    padding-left: 16px;
    padding-right: 16px;
  `,
};
