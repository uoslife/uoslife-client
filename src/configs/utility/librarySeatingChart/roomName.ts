export type RoomNameType = '1' | '2' | '3' | '4' | '5';
export type RoomNameEnumType = Record<RoomNameType, string>;

export const RoomNameEnum: RoomNameEnumType = {
  1: '0 데시벨 1',
  2: '0 데시벨 2',
  3: '0 ZONE 1',
  4: '0 ZONE 2',
  5: '노트북실',
};
