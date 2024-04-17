import styled from '@emotion/native';
import {memo, useMemo} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {
  LIBRARY_ROW_COUNT,
  LIBRARY_SEATS,
} from '../../../../configs/utility/librarySeatingChart';
import {RoomNameType} from '../../../../configs/utility/librarySeatingChart/roomName';
import SeatItem from '../../../atoms/seat_item/SeatItem';
import {SeatStatusType} from '../../../../configs/utility/librarySeatingChart/seatStatus';
import {
  ROOM_2_FOR_DISABLED_PERSON_LIST,
  ROOM_4_FOR_DISABLED_PERSON_LIST,
} from '../../../../configs/utility/librarySeatingChart/forDisabledPersonList';

const {width} = Dimensions.get('screen');

type Props = {
  roomNumber: RoomNameType;
  handlePressItem: () => void;
};

const mock: Array<{seatId: number; status: SeatStatusType}> = [
  {
    seatId: 12,
    status: 'NOT_AVAILABLE',
  },
  {
    seatId: 14,
    status: 'RESERVED',
  },
  {
    seatId: 23,
    status: 'SPECIFIED',
  },
];

const findStatusBySeatId = (seatId: number) => {
  return mock.find(item => item.seatId === seatId)?.status;
};

const findForDisabledPerson = (
  roomNumber: Props['roomNumber'],
  seatId: number,
): boolean | null => {
  switch (roomNumber) {
    case '2':
      return (
        ROOM_2_FOR_DISABLED_PERSON_LIST.some(item => item === seatId) ?? null
      );
    case '4':
      return (
        ROOM_4_FOR_DISABLED_PERSON_LIST.some(item => item === seatId) ?? null
      );
    default:
      return null;
  }
};

const LibrarySeatingChart = ({roomNumber, handlePressItem}: Props) => {
  const itemWidth = useMemo(() => {
    const libraryRowCount = LIBRARY_ROW_COUNT.get(roomNumber);
    if (!libraryRowCount) return 0;
    return (width - 16) / libraryRowCount - 2;
  }, [roomNumber]);

  const currentSeat = useMemo(
    () => LIBRARY_SEATS.get(roomNumber),
    [roomNumber],
  );

  const isRoom5 = useMemo(() => roomNumber === '5', [roomNumber]);
  const changeTextSize = () => {
    if (isRoom5) return 'large';
    return 'medium';
  };

  return (
    <S.MapContainer
      data={currentSeat}
      scrollEnabled={false}
      renderItem={row => {
        const rowItem = row.item as number[];
        if (rowItem.length === 0)
          return <View style={{width: itemWidth, height: itemWidth}} />;
        return (
          <S.Wrapper>
            <FlatList
              horizontal
              scrollEnabled={false}
              data={rowItem}
              renderItem={({item}) => {
                const status = findStatusBySeatId(item);
                const forDisabledPerson = findForDisabledPerson(
                  roomNumber,
                  item,
                );
                return (
                  <SeatItem
                    key={item}
                    label={item}
                    status={status}
                    itemWidth={itemWidth}
                    textSize={changeTextSize()}
                    onPress={handlePressItem}
                    forDisabledPerson={forDisabledPerson}
                  />
                );
              }}
              getItemLayout={(_, index) => ({
                length: itemWidth + 2,
                offset: (itemWidth + 2) * index,
                index,
              })}
              keyExtractor={(_, index) => index.toString()}
            />
          </S.Wrapper>
        );
      }}
      getItemLayout={(_, index) => ({
        length: itemWidth + 2,
        offset: (itemWidth + 2) * index,
        index,
      })}
      keyExtractor={(_, index) => index.toString()}
      isRoom5={isRoom5}
    />
  );
};

export default memo(LibrarySeatingChart);

const S = {
  MapContainer: styled.FlatList<{isRoom5: boolean}>`
    background-color: white;
    flex-direction: column;
    align-self: flex-start;
    margin: ${({isRoom5}) => (isRoom5 ? '0 auto' : '0 0 0 2px')};
  `,
  Wrapper: styled.View`
    flex-direction: row;
  `,
};
