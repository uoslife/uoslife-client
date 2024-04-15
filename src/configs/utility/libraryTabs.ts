export type LibraryTabsType = 'MY_SEAT' | 'SEAT_LIST' | 'RECORD';
export type LibraryTabsEnumType = Record<LibraryTabsType, string>;

export type LibraryRoomStatusTabsType = 'ECONOMY' | 'LAW' | 'CENTRAL';
export type LibraryRoomStatusTabsEnumType = Record<
  LibraryRoomStatusTabsType,
  string
>;

export const LibraryTabsEnum: LibraryTabsEnumType = {
  MY_SEAT: '내자리',
  SEAT_LIST: '좌석',
  RECORD: '기록',
};

export const LibraryRoomStatusTabsEnum: LibraryRoomStatusTabsEnumType = {
  CENTRAL: '중앙도서관',
  LAW: '법학전문도서관',
  ECONOMY: '경영경제도서관',
};
