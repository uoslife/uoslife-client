import {useMemo} from 'react';
import {Dimensions, View} from 'react-native';

import {FlashList} from '@shopify/flash-list';
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
    return Math.round((width - 8) / libraryRowCount - 2);
  }, [roomNumber]);

  const currentSeat = useMemo(
    () =>
      LIBRARY_SEATS.get(roomNumber)?.map(item =>
        item.map(i => {
          return {
            seatNumber: i,
            status: findSeatStatusBySeatId(seatList, i),
            forDisabledPerson: findForDisabledPerson(roomNumber, i),
            forDesktopSeat: findForDesktopSeat(roomNumber, i),
          };
        }),
      ),
    [roomNumber, seatList],
  );

  const isRoom5 = useMemo(() => roomNumber === '5', [roomNumber]);
  const changeTextSize = () => {
    if (isRoom5) return 'large';
    return 'medium';
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: currentSeat!.length * (itemWidth + 2),
          width: LIBRARY_ROW_COUNT.get(roomNumber)! * (itemWidth + 2),
          backgroundColor: 'white',
        }}>
        <FlashList
          data={currentSeat}
          scrollEnabled={false}
          renderItem={row => {
            const rowItem = row.item;
            if (rowItem.length === 0)
              return (
                <View style={{width: itemWidth + 2, height: itemWidth + 2}} />
              );
            return (
              <FlashList
                horizontal
                scrollEnabled={false}
                data={rowItem}
                renderItem={({item}) => {
                  return (
                    <SeatItem
                      label={item.seatNumber}
                      status={item.status}
                      itemWidth={itemWidth}
                      textSize={changeTextSize()}
                      onPress={handlePressItem}
                      forDisabledPerson={item.forDisabledPerson}
                      forDesktopSeat={item.forDesktopSeat}
                    />
                  );
                }}
                initialScrollIndex={0}
                estimatedFirstItemOffset={itemWidth + 2}
                estimatedItemSize={itemWidth + 2}
                keyExtractor={(_, index) => index.toString()}
              />
            );
          }}
          initialScrollIndex={0}
          estimatedFirstItemOffset={itemWidth + 2}
          estimatedItemSize={itemWidth + 2}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default LibrarySeatingChart;
