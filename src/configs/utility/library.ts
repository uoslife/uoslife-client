import {colors} from '@uoslife/design-system';
import {ColorFormat, Props} from 'react-native-countdown-circle-timer';
import {ReservationStatusTypeInUsing} from '../../store/library';

export const LIBRARY_MAX_TIME = 90 * 60;
export const LIBRARY_NO_TIME = 30 * 60;
export const LIBRARY_MIN_TIME = 0;

export const CIRCLE_COLOR_MAX_TIME = 'primaryBrand' as const;
export const CIRCLE_COLOR_NO_TIME = 'secondaryUi' as const;
export const CIRCLE_COLOR_MIN_TIME = 'red' as const;

export const DEFAULT_TRAIL_COLOR = colors.grey40 as ColorFormat;

export const libraryInformationMessage: {
  [key in ReservationStatusTypeInUsing]: string;
} = {
  USING: '잘하고 있어요!',
  OUTING_DEFAULT: '조심히 다녀오세요!',
  OUTING_NO_TIME: '시간이 얼마 남지 않았어요!',
};

export const LibraryCircleTimerDefaultProps: Props = {
  // @ts-ignore
  colors: [
    colors[CIRCLE_COLOR_MAX_TIME],
    colors[CIRCLE_COLOR_NO_TIME],
    colors[CIRCLE_COLOR_MIN_TIME],
  ],
  size: 240,
  strokeWidth: 2,
  rotation: 'counterclockwise',
  isSmoothColorTransition: false,
  duration: LIBRARY_MAX_TIME,
  colorsTime: [
    LIBRARY_MAX_TIME,
    LIBRARY_MAX_TIME,
    LIBRARY_NO_TIME,
    LIBRARY_MIN_TIME,
  ],
  trailColor: DEFAULT_TRAIL_COLOR,
};
