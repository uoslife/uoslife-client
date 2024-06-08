import {Platform} from 'react-native';
import {CoreAPI, UtilAPI} from '../api/services';
import {RecapInfoType} from '../api/services/core/libraryHistory/libraryHistoryAPI.type';
import {ErrorResponseType} from '../api/services/type';
import {GetAnnouncementsParams} from '../api/services/util/announcement/announcementAPI.type';
import {
  GetLibraryRankingRes,
  GetMyLibraryRankingRes,
  LibraryReservationType,
  ReservationStatusTypeFromServer,
} from '../api/services/util/library/libraryAPI.type';
import {LibraryRankingMajorNameType} from '../features/library/constants/libraryRanking/libraryRanking';
import {LibraryRankingTabsType} from '../features/library/constants/libraryTabs';
import storage from '../storage';
import {
  DEFAULT_RESERVATION_STATUS,
  LibraryReservationAtomType,
  ReservationStatusType,
} from '../features/library/store';
import {LibraryDynamicIslandBridge} from '../utils/ios/libraryDynamicIslandBridge';
import {LibraryStateNotificationBridge} from '../utils/android/libraryStateNotificationBridge';

export default class UtilityService {
  static async getLibraryReservationInfo() {
    try {
      const response = await UtilAPI.getLibraryReservation({});
      return response;
    } catch (error) {
      return undefined;
    }
  }

  static async getAnnouncementsInMainScreen(
    origin: GetAnnouncementsParams['origin'],
    size: GetAnnouncementsParams['size'],
  ) {
    try {
      const announcements = await UtilAPI.getAnnouncements({
        origin,
        page: 0,
        size,
      });
      return announcements;
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
      new Date(this.convertDateFormat(seatStartTime)).valueOf() / 1000
    );
  }

  static async getLibraryReservation(): Promise<LibraryReservationAtomType> {
    const librarySeatStartTime = storage.getString('librarySeatStartTime');
    const libraryUsingStatus = storage.getString('libraryUsingStatus') as
      | ReservationStatusTypeFromServer
      | undefined;

    const isAndroid = Platform.OS === 'android';

    try {
      let isStudyRoom: boolean = false;
      let status: ReservationStatusType = DEFAULT_RESERVATION_STATUS;

      const response = await UtilAPI.getLibraryReservation({});
      // start Dynamic Island
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
        storage.set('librarySeatStartTime', response.seatStartTime);
        storage.set('libraryUsingStatus', response.status);
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
        storage.set('libraryUsingStatus', response.status);
      }
      // end Dynamic Island

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
        if (isAndroid) LibraryStateNotificationBridge.end();
        else LibraryDynamicIslandBridge.onEndActivity();
        storage.delete('librarySeatStartTime');
        storage.delete('libraryUsingStatus');
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

  static convertDateFormat(format: string) {
    const year = format.substring(0, 4);
    const month = format.substring(4, 6);
    const day = format.substring(6, 8);
    const hours = format.substring(8, 10);
    const minutes = format.substring(10, 12);
    const seconds = format.substring(12, 14);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
