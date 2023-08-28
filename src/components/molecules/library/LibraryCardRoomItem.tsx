import {Text, View} from 'react-native';
import React from 'react';

export type RoomProps = {
  roomName: string;
  totalSeatCnt: number;
  remainingSeatCnt: number;
};

const LibraryCardRoomItem = ({
  remainingSeatCnt,
  roomName,
  totalSeatCnt,
}: RoomProps) => {
  return (
    <View>
      <Text>{remainingSeatCnt}</Text>
      <Text>{roomName}</Text>
      <Text>{totalSeatCnt}</Text>
    </View>
  );
};

export default LibraryCardRoomItem;
