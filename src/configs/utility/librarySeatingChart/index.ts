import ROOM_1_SEATING_CHART from './room_1_seating_chart';
import ROOM_2_SEATING_CHART from './room_2_seating_chart';
import ROOM_3_SEATING_CHART from './room_3_seating_chart';
import ROOM_4_SEATING_CHART from './room_4_seating_chart';
import ROOM_5_SEATING_CHART from './room_5_seating_chart';
import ROOM_6_SEATING_CHART from './room_6_seating_chart';
import {
  ROOM_1_ROW_COUNT,
  ROOM_2_ROW_COUNT,
  ROOM_3_ROW_COUNT,
  ROOM_4_ROW_COUNT,
  ROOM_5_ROW_COUNT,
  ROOM_6_ROW_COUNT,
} from './seatItemEnum';

export const LIBRARY_SEATS = new Map<string, SeatingChartType>([
  ['1', ROOM_1_SEATING_CHART],
  ['2', ROOM_2_SEATING_CHART],
  ['3', ROOM_3_SEATING_CHART],
  ['4', ROOM_4_SEATING_CHART],
  ['5', ROOM_5_SEATING_CHART],
  ['6', ROOM_6_SEATING_CHART],
]);

export const LIBRARY_ROW_COUNT = new Map<string, number>([
  ['1', ROOM_1_ROW_COUNT],
  ['2', ROOM_2_ROW_COUNT],
  ['3', ROOM_3_ROW_COUNT],
  ['4', ROOM_4_ROW_COUNT],
  ['5', ROOM_5_ROW_COUNT],
  ['6', ROOM_6_ROW_COUNT],
]);

export type SeatingChartType = number[][];
