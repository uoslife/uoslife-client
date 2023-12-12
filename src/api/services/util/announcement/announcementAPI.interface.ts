import {ServiceFunc} from '../../type';
import * as Type from './announcementAPI.type';

export default interface AnnoucementService {
  getAnnouncements: ServiceFunc<
    Type.GetAnnouncementsParams,
    Type.GetAnnouncementsRes
  >;
  getAnnouncementById: ServiceFunc<
    Type.GetAnnouncementByIdParams,
    Type.GetAnnouncementByIdRes
  >;
  searchAnnoucements: ServiceFunc<
    Type.SearchAnnouncementsParams,
    Type.SearchAnnouncementsRes
  >;
  getAnnouncementByIdList: ServiceFunc<
    Type.GetAnnouncementByIdListParams,
    Type.GetAnnouncementByIdListRes
  >;
  searchAnnoucementsOptionally: ServiceFunc<
    Type.SearchAnnouncementsOptionallyParams,
    Type.SearchAnnouncementsOptionallyRes
  >;
}
