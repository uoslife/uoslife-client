import Card from '../../card/Card';
import LibraryCardRoomItem, {RoomProps} from './LibraryCardRoomItem';

export type LibraryCardProps = {libraryName: string; rooms: RoomProps[]};

const LibraryCard = ({libraryName, rooms}: LibraryCardProps) => {
  return (
    <Card title={libraryName}>
      {rooms.map(room => (
        <LibraryCardRoomItem
          key={room.roomName}
          remainingSeatCnt={room.remainingSeatCnt}
          totalSeatCnt={room.totalSeatCnt}
          roomName={room.roomName}
        />
      ))}
    </Card>
  );
};

export default LibraryCard;
