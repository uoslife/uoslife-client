import React from 'react';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {Txt} from '@uoslife/design-system';
import {ReservationStatusType} from '../../../../store/library';
import LibraryCircleTimerContents from './LibraryCircleTimerContents';
import {
  DEFAULT_TRAIL_COLOR,
  LibraryCircleTimerDefaultProps,
} from '../../../../configs/utility/library';

type LibraryCustomCircleTimerProps = {
  reservationStatus: ReservationStatusType;
  remainingSeconds: number | null;
  seatStartTime: string | null;
};

const LibraryCircleTimer = ({
  reservationStatus,
  remainingSeconds,
  seatStartTime,
}: LibraryCustomCircleTimerProps) => {
  if (reservationStatus === 'NOT_PORTAL_VERIFICATION')
    return (
      // @ts-ignore
      <CountdownCircleTimer
        {...LibraryCircleTimerDefaultProps}
        colors={DEFAULT_TRAIL_COLOR}>
        {() => (
          <Txt
            color="grey130"
            label={`포털 연동 후\n나의 도서관 현황을\n확인해보세요`}
            typograph="titleLarge"
            style={{textAlign: 'center'}}
          />
        )}
      </CountdownCircleTimer>
    );
  if (reservationStatus === 'NOT_USING')
    return (
      // @ts-ignore
      <CountdownCircleTimer
        {...LibraryCircleTimerDefaultProps}
        colors={DEFAULT_TRAIL_COLOR}>
        {() => (
          <Txt
            color="grey130"
            label={`이용 중인 좌석이\n없어요`}
            typograph="titleLarge"
            style={{textAlign: 'center'}}
          />
        )}
      </CountdownCircleTimer>
    );

  const isUsingStatus = reservationStatus === 'USING';
  return (
    <CountdownCircleTimer
      {...LibraryCircleTimerDefaultProps}
      isPlaying={!isUsingStatus}
      initialRemainingTime={remainingSeconds || undefined}>
      {({remainingTime}) => (
        <LibraryCircleTimerContents
          isUsingStatus={isUsingStatus}
          remainingTime={remainingTime}
          seatStartTime={seatStartTime || ''}
        />
      )}
    </CountdownCircleTimer>
  );
};

export default LibraryCircleTimer;
