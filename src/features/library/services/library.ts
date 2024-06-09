import {UtilAPI, CoreAPI} from '../../../api/services';
import {RecapInfoType} from '../../../api/services/core/libraryHistory/libraryHistoryAPI.type';
import {ErrorResponseType} from '../../../api/services/type';
import {
  LibraryReservationType,
  GetLibraryRankingRes,
  GetMyLibraryRankingRes,
} from '../../../api/services/util/library/libraryAPI.type';
import storage from '../../../storage';
import {isAndroid} from '../../../utils/android/isAndroid';
import {LibraryStateNotificationBridge} from '../../../utils/android/libraryStateNotificationBridge';
import {LibraryDynamicIslandBridge} from '../../../utils/ios/libraryDynamicIslandBridge';
import {LibraryRankingMajorNameType} from '../constants/libraryRanking/libraryRanking';
import {LibraryRankingTabsType} from '../constants/libraryTabs';
import {
  librarySeatStartTime,
  libraryUsingStatus,
  setLibrarySeatStartTime,
  setLibraryUsingStatus,
} from '../storage/library';
import {
  ReservationStatusType,
  LibraryReservationAtomType,
  DEFAULT_RESERVATION_STATUS,
} from '../store';
import {convertDateFormat} from '../utils/convertDateFormat';
import {endLibraryStateActivity} from '../utils/endLibraryStateActivity';

export default class LibraryServices {
  static async getLibraryReservationInfo() {
    try {
      const response = await UtilAPI.getLibraryReservation({});
      return response;
    } catch (error) {
      return undefined;
    }
  }

  static getOutingStatus(
    remainingSeconds: LibraryReservationType['remainingSeconds'],
  ): ReservationStatusType {
    if (remainingSeconds < 30 * 60) return 'OUTING_DEFAULT';
    return 'OUTING_NO_TIME';
  }

  static calculateDateInterval(seatStartTime: string) {
    return (
      new Date().valueOf() / 1000 -
      new Date(convertDateFormat(seatStartTime)).valueOf() / 1000
    );
  }

  static async getLibraryReservation(): Promise<LibraryReservationAtomType> {
    // isLibraryStateActivity Parse 로직 분리시 동작 x
    const isLibraryStateActivityNonParse = storage.getString(
      'isLibraryStateActivity',
    );
    const isLibraryStateActivity = isLibraryStateActivityNonParse
      ? (JSON.parse(isLibraryStateActivityNonParse) as boolean)
      : null;

    try {
      let isStudyRoom: boolean = false;
      let status: ReservationStatusType = DEFAULT_RESERVATION_STATUS;

      const response = await UtilAPI.getLibraryReservation({});

      if (isLibraryStateActivity) this.startLibraryStateActivity(response);

      if (response.status === 'STUDY_ROOM') isStudyRoom = true;

      if (response.status !== 'OUTSIDE') status = 'USING';
      else {
        const outingStatus = this.getOutingStatus(response.remainingSeconds);
        status = outingStatus;
      }

      return {
        reservationStatus: status,
        reservationInfo: response,
        isStudyRoom,
      };
    } catch (error) {
      const err = error as ErrorResponseType;

      if (librarySeatStartTime) {
        endLibraryStateActivity();
      }

      if (err.status === 500) {
        return {
          reservationStatus: 'NOT_PORTAL_VERIFICATION',
          reservationInfo: null,
          isStudyRoom: null,
        };
      }

      return {
        reservationStatus: 'NOT_USING',
        reservationInfo: null,
        isStudyRoom: null,
      };
    }
  }

  static startLibraryStateActivity(response: LibraryReservationType) {
    if (librarySeatStartTime !== response.seatStartTime) {
      if (isAndroid)
        LibraryStateNotificationBridge.start({
          seatRoomName: response.seatRoomName,
          seatNumber: response.seatNo,
          isUsing: response.status === 'SEAT',
          dateInterval:
            response.status === 'SEAT'
              ? this.calculateDateInterval(response.seatStartTime)
              : response.remainingSeconds,
        });
      else
        LibraryDynamicIslandBridge.onStartActivity({
          seatRoomName: response.seatRoomName,
          seatNumber: response.seatNo,
          isUsing: response.status === 'SEAT',
          dateInterval:
            response.status === 'SEAT'
              ? this.calculateDateInterval(response.seatStartTime)
              : response.remainingSeconds,
        });
      setLibrarySeatStartTime(response.seatStartTime);
      setLibraryUsingStatus(response.status);
    }

    if (libraryUsingStatus !== response.status) {
      if (isAndroid)
        LibraryStateNotificationBridge.start({
          seatRoomName: response.seatRoomName,
          seatNumber: response.seatNo,
          isUsing: response.status === 'SEAT',
          dateInterval:
            response.status === 'SEAT'
              ? this.calculateDateInterval(response.seatStartTime)
              : response.remainingSeconds,
        });
      else
        LibraryDynamicIslandBridge.onUpdateActivity({
          isUsing: response.status === 'SEAT',
          dateInterval:
            response.status === 'SEAT'
              ? this.calculateDateInterval(response.seatStartTime)
              : response.remainingSeconds,
        });
      setLibraryUsingStatus(response.status);
    }
  }

  static async getLibraryUsageStatus(): Promise<RecapInfoType | null> {
    try {
      const res = await Promise.all([
        CoreAPI.getLibraryHistories({year: 2024}),
        CoreAPI.saveLibraryHistories({year: 2024}),
      ]);

      return res[0];
    } catch (error) {
      return null;
    }
  }

  static async getLibraryRanking({
    duration,
    major,
  }: {
    duration: LibraryRankingTabsType;
    major: LibraryRankingMajorNameType;
  }): Promise<GetLibraryRankingRes | null> {
    try {
      const res = await UtilAPI.getLibraryRanking({
        duration,
        major,
      });
      return res;
    } catch (error) {
      return null;
    }
  }

  static async getMyLibraryRanking({
    duration,
    major,
  }: {
    duration: LibraryRankingTabsType;
    major: LibraryRankingMajorNameType;
  }): Promise<GetMyLibraryRankingRes | null> {
    try {
      const res = await UtilAPI.getMyLibraryRanking({
        duration,
        major,
      });
      try {
        CoreAPI.saveLibraryHistories({year: 2024});
      } catch (err) {
        console.error(err);
      }
      return res;
    } catch (error) {
      return null;
    }
  }
}
