/* eslint-disable no-return-assign */
import {Pressable, Text, View} from 'react-native';
import {useSetAtom} from 'jotai';
import {Icon, colors} from '@uoslife/design-system';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SeatItemEnum} from '../../../constants/librarySeatingChart/seatItemEnum';
import {
  SeatStatusType,
  SeatStatusColorEnum,
} from '../../../constants/librarySeatingChart/seatStatus';
import {selectedSeatAtom} from '../../../store/reservation';

const DEFAULT_ITEM_WIDTH = 13;

type Props = {
  label?: number;
  status?: SeatStatusType;
  itemWidth?: number;
  textSize?: 'large' | 'medium';
  forDisabledPerson: boolean | null;
  forDesktopSeat: boolean | null;
  onPress: () => void;
};

const SeatItem = ({
  label,
  status = 'AVAILABLE',
  itemWidth = DEFAULT_ITEM_WIDTH,
  textSize = 'medium',
  forDisabledPerson,
  forDesktopSeat,
  onPress,
}: Props) => {
  const setSelectedSeat = useSetAtom(selectedSeatAtom);
  const seatItemSize = itemWidth + 2;
  const isAvailable = status === 'AVAILABLE';

  const pressed = useSharedValue<boolean>(false);

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? colors.grey60 : colors.grey40,
    transform: [{scale: withTiming(pressed.value ? 1.1 : 1, {duration: 250})}],
  }));

  const handlePressSeatItem = () => {
    onPress();
    setSelectedSeat({
      seatId: label ?? null,
      forDisabledPerson,
      forDesktopSeat,
    });
  };

  switch (label) {
    case SeatItemEnum.NONE:
      return (
        <View
          style={{
            width: seatItemSize,
            height: seatItemSize,
          }}
        />
      );
    case SeatItemEnum.WALL:
      return (
        <View
          style={{
            width: seatItemSize,
            height: seatItemSize,
            backgroundColor: colors.primaryLighterAlt,
          }}
        />
      );
    case SeatItemEnum.PILLAR:
      return (
        <View
          style={{
            width: seatItemSize,
            height: seatItemSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: '50%',
              marginTop: seatItemSize / 4,
              marginBottom: seatItemSize / 4,
              backgroundColor: colors.grey60,
            }}
          />
        </View>
      );
    case SeatItemEnum.ROW_LINE:
      return (
        <View
          style={{
            width: seatItemSize,
            height: seatItemSize,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: '10%',
              backgroundColor: colors.grey60,
            }}
          />
        </View>
      );
    case SeatItemEnum.COL_LINE:
      return (
        <View
          style={{
            width: seatItemSize,
            height: seatItemSize,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              marginTop: (seatItemSize / 10) * 4.5,
              marginBottom: (seatItemSize / 10) * 4.5,
              backgroundColor: colors.grey60,
            }}
          />
        </View>
      );
    case SeatItemEnum.BEND_TOP_RIGHT:
      return (
        <View
          style={{
            position: 'relative',
            width: seatItemSize,
            height: seatItemSize,
          }}>
          <View
            style={{
              position: 'absolute',
              flex: 1,
              width: '45%',
              height: '10%',
              top: (seatItemSize / 10) * 4.5,
              right: 0,
              backgroundColor: colors.grey60,
            }}
          />
          <View
            style={{
              position: 'absolute',
              flex: 1,
              width: '10%',
              height: '60%',
              top: 0,
              right: (seatItemSize / 10) * 4.5,
              backgroundColor: colors.grey60,
            }}
          />
        </View>
      );
    case SeatItemEnum.BEND_RIGHT_BOTTOM:
      return (
        <View
          style={{
            position: 'relative',
            width: seatItemSize,
            height: seatItemSize,
          }}>
          <View
            style={{
              position: 'absolute',
              flex: 1,
              width: '45%',
              height: '10%',
              top: (seatItemSize / 10) * 4.5,
              right: 0,
              backgroundColor: colors.grey60,
            }}
          />
          <View
            style={{
              position: 'absolute',
              flex: 1,
              width: '10%',
              height: '55%',
              bottom: 0,
              right: (seatItemSize / 10) * 4.5,
              backgroundColor: colors.grey60,
            }}
          />
        </View>
      );
    case SeatItemEnum.ROOM_4_SIDE:
      return (
        <View
          style={{
            width: seatItemSize,
            height: seatItemSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: '80%',
              marginTop: seatItemSize / 10,
              marginBottom: seatItemSize / 10,
              borderRadius: 2,
              backgroundColor: colors.grey40,
            }}
          />
        </View>
      );
    case SeatItemEnum.ARROW_BOTTOM:
      return (
        <View
          style={{
            width: seatItemSize,
            height: seatItemSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="arrow_down" width={12} height={12} />
        </View>
      );
    default:
      return isAvailable ? (
        <Pressable
          onPressIn={() => (pressed.value = true)}
          onPressOut={() => (pressed.value = false)}
          onPress={handlePressSeatItem}>
          <Animated.View
            style={[
              {
                width: itemWidth,
                height: itemWidth,
                backgroundColor: SeatStatusColorEnum[status],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 3,
                margin: 1,
                paddingLeft: 0.5,
              },
              animatedStyles,
            ]}>
            {forDisabledPerson && (
              <Icon
                name="disabled"
                width={3.5}
                height={5}
                color={
                  isAvailable || status === 'SPECIFIED' ? 'grey190' : 'white'
                }
              />
            )}
            {forDesktopSeat && (
              <Icon
                name="desktop"
                width={5}
                height={5}
                color={
                  isAvailable || status === 'SPECIFIED' ? 'grey190' : 'white'
                }
              />
            )}
            <Text
              style={{
                color:
                  isAvailable || status === 'SPECIFIED'
                    ? colors.grey190
                    : colors.white,
                fontSize: textSize === 'large' ? 9 : 4.5,
              }}>
              {label}
            </Text>
          </Animated.View>
        </Pressable>
      ) : (
        <View
          style={[
            {
              width: itemWidth,
              height: itemWidth,
              backgroundColor: SeatStatusColorEnum[status],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              margin: 1,
              paddingLeft: 0.5,
            },
          ]}>
          {forDisabledPerson && (
            <Icon
              name="disabled"
              width={3.5}
              height={5}
              color={
                isAvailable || status === 'SPECIFIED' ? 'grey190' : 'white'
              }
            />
          )}
          {forDesktopSeat && (
            <Icon
              name="desktop"
              width={5}
              height={5}
              color={
                isAvailable || status === 'SPECIFIED' ? 'grey190' : 'white'
              }
            />
          )}
          <Text
            style={{
              color:
                isAvailable || status === 'SPECIFIED'
                  ? colors.grey190
                  : colors.white,
              fontSize: textSize === 'large' ? 9 : 4.5,
            }}>
            {label}
          </Text>
        </View>
      );
  }
};

export default SeatItem;
