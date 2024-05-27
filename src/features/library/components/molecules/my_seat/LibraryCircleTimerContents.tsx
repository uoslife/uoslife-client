import {Txt} from '@uoslife/design-system';
import {View} from 'react-native';
import {
  LIBRARY_NO_TIME,
  CIRCLE_COLOR_NO_TIME,
  CIRCLE_COLOR_MIN_TIME,
  CIRCLE_COLOR_MAX_TIME,
} from '../../../constants/library';
import useLibraryDisplayTime from '../../../hooks/useLibraryDisplayTime';

type Props = {
  isUsingStatus: boolean;
  remainingTime: number;
  seatStartTime: string;
};

const calculateTextColor = (remainingTime: Props['remainingTime']) => {
  if (LIBRARY_NO_TIME < remainingTime) return CIRCLE_COLOR_NO_TIME;
  return CIRCLE_COLOR_MIN_TIME;
};

const LibraryCircleTimerContents = ({
  isUsingStatus,
  remainingTime,
  seatStartTime,
}: Props) => {
  const {displayTime} = useLibraryDisplayTime({
    isUsingStatus,
    remainingTime,
    seatStartTime,
  });

  return (
    <>
      <Txt
        color="grey130"
        label={isUsingStatus ? '학습 시간' : '남은 시간'}
        typograph="titleSmall"
      />
      <View style={{paddingTop: 4}}>
        <Txt color="grey190" label={displayTime} typograph="headlineMedium" />
      </View>
      <View style={{paddingTop: 24}}>
        <Txt
          color={
            isUsingStatus
              ? CIRCLE_COLOR_MAX_TIME
              : calculateTextColor(remainingTime)
          }
          label={isUsingStatus ? '이용 중' : '외출 중'}
          typograph="titleSmall"
        />
      </View>
    </>
  );
};

export default LibraryCircleTimerContents;
