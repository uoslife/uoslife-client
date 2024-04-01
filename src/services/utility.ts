import {CoreAPI, UtilAPI} from '../api/services';
import {RecapInfoType} from '../api/services/core/libraryHistory/libraryHistoryAPI.type';
import {ErrorResponseType} from '../api/services/type';
import {GetAnnouncementsParams} from '../api/services/util/announcement/announcementAPI.type';
import {
  GetCafeteriasResponse,
  MealTimeType,
} from '../api/services/util/cafeteria/cafeteriaAPI.type';
import {LibraryReservationType} from '../api/services/util/library/libraryAPI.type';
import {
  DEFAULT_RESERVATION_STATUS,
  LibraryReservationAtomType,
  ReservationStatusType,
} from '../store/library';
import DateUtils from '../utils/date';

export type GetCafeteriaItemsType = {
  commonDate: string;
  displayDate: string;
  mealTime: MealTimeType;
  items?: GetCafeteriasResponse;
};

type GetCafeteriaItemsParams = {
  mealTime: MealTimeType;
  commonDate: DateUtils['commonDate'];
  displayDate: DateUtils['displayDate'];
};

export default class UtilityService {
  static async getCafeteriaItems({
    mealTime,
    commonDate,
    displayDate,
  }: GetCafeteriaItemsParams): Promise<GetCafeteriaItemsType> {
    try {
      const response = await UtilAPI.getCafeterias({
        mealTime,
        openDate: commonDate,
      });
      return {
        commonDate,
        mealTime,
        displayDate,
        items: response,
      };
    } catch (error) {
      return {
        commonDate,
        mealTime,
        displayDate,
      };
    }
  }

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

  static async getLibraryReservation(): Promise<LibraryReservationAtomType> {
    try {
      let isStudyRoom: boolean = false;
      let status: ReservationStatusType = DEFAULT_RESERVATION_STATUS;

      const response = await UtilAPI.getLibraryReservation({});

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
}
