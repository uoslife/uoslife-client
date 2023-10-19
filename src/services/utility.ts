import {UtilAPI} from '../api/services';
import {GetAnnouncementsParams} from '../api/services/util/announcement/announcementAPI.type';

export class UtilityService {
  static async getLibraryReservationInfo() {
    try {
      const libraryReservationRes = await UtilAPI.getLibraryReservation({});
      return libraryReservationRes;
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
}
