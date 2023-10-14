import {ServiceFunc} from '../../type';
import * as Type from './announcementAPI.type';

export default interface AnnoucementService {
  getAnnouncementsForMain: ServiceFunc<
    Type.GetAnnouncementsForMainParams,
    Type.GetAnnouncementsForMainRes
  >;
  getAnnouncementById: ServiceFunc<
    Type.GetAnnouncementByIdParams,
    Type.GetAnnouncementByIdRes
  >;
  searchAnnoucements: ServiceFunc<
    Type.SearchAnnouncementsParams,
    Type.SearchAnnouncementsRes
  >;

  // NOT-IN-USE(23 / 10 / 14)

  // searchAnnoucementsOptionally: ServiceFunc<
  //   Type.SearchAnnouncementsOptionallyParams,
  //   Type.SearchAnnouncementsOptionallyRes
  // >;
}
