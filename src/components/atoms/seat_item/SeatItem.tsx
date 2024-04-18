import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {useSetAtom} from 'jotai';
import styled from '@emotion/native';
import {Icon, colors} from '@uoslife/design-system';

import AnimatePress from '../../animations/pressable_icon/AnimatePress';
import {SeatItemEnum} from '../../../configs/utility/librarySeatingChart/seatItemEnum';
import {
  SeatStatusColorEnum,
  SeatStatusType,
} from '../../../configs/utility/librarySeatingChart/seatStatus';
import {selectedSeatAtom} from '../../../store/library/reservation';

const DEFAULT_ITEM_WIDTH = 13;

type Props = {
  label?: number;
  status?: SeatStatusType;
  itemWidth?: number;
  textSize?: 'large' | 'medium';
  forDisabledPerson: boolean | null;
  onPress: () => void;
};

const SeatItem = ({
  label,
  status = 'AVAILABLE',
  itemWidth = DEFAULT_ITEM_WIDTH,
  textSize = 'medium',
  forDisabledPerson,
  onPress,
}: Props) => {
  const setSelectedSeat = useSetAtom(selectedSeatAtom);
  const seatItemSize = itemWidth + 2;
  const isAvailable = status === 'AVAILABLE';

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
    default:
      return (
        <AnimatePress
          variant={isAvailable ? 'scale_up_2' : 'none'}
          onPress={() => {
            if (!isAvailable) return;
            onPress();
            setSelectedSeat({
              seatId: label ?? null,
              forDisabledPerson,
            });
          }}>
          <S.Container
            style={{
              width: itemWidth,
              height: itemWidth,
              backgroundColor: SeatStatusColorEnum[status],
            }}>
            {forDisabledPerson && (
              <Icon
                name="menu" // TODO: 장애인 icon으로 변경
                width={6}
                height={6}
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
          </S.Container>
        </AnimatePress>
      );
  }
};

export default memo(SeatItem);

const S = {
  Container: styled.View`
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    margin: 1px;
    padding-left: 0.5px;
  `,
};
