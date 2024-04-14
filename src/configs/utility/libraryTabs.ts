export type LibraryTabsType = 'MY_SEAT' | 'SEAT_LIST' | 'RECORD';
export type LibraryTabsEnumType = Record<LibraryTabsType, string>;

export const LibraryTabsEnum: LibraryTabsEnumType = {
  MY_SEAT: '내자리',
  SEAT_LIST: '좌석',
  RECORD: '기록',
};
