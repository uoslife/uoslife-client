import styled from '@emotion/native';
import {memo, useMemo} from 'react';
import {Dimensions, FlatList, View} from 'react-native';

import {
  LIBRARY_ROW_COUNT,
  LIBRARY_SEATS,
} from '../../constants/librarySeatingChart';
import {RoomNameType} from '../../constants/librarySeatingChart/roomName';
import {
  findForDesktopSeat,
  findForDisabledPerson,
  findSeatStatusBySeatId,
} from '../../utils/findSeatItem';
import {GetSeatListRes} from '../../../../api/services/util/library/libraryAPI.type';
import SeatItem from '../atoms/seat_item/SeatItem';

const {width} = Dimensions.get('screen');

type Props = {
  roomNumber: RoomNameType;
  handlePressItem: () => void;
  seatList?: GetSeatListRes;
};

const LibrarySeatingChart = ({
  roomNumber,
  handlePressItem,
  seatList,
}: Props) => {
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
                const status = findSeatStatusBySeatId(seatList, item);
                const forDisabledPerson = findForDisabledPerson(
                  roomNumber,
                  item,
                );
                const forDesktopSeat = findForDesktopSeat(roomNumber, item);
                return (
                  <SeatItem
                    key={item}
                    label={item}
                    status={status}
                    itemWidth={itemWidth}
                    textSize={changeTextSize()}
                    onPress={handlePressItem}
                    forDisabledPerson={forDisabledPerson}
                    forDesktopSeat={forDesktopSeat}
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
