import {ServiceFunc} from '../../type';
import * as Type from './announcementAPI.type';

export default interface AnnouncementService {
  getAllAnnouncements: ServiceFunc<
    Type.GetAnnouncementsAllParams,
    Type.GetAnnouncementsGeneralRes
  >;
  searchAnnouncements: ServiceFunc<
    Type.GetAnnouncementsBySearchParams,
    Type.GetAnnouncementsGeneralRes
  >;
  opitonallySearchAnnouncements: ServiceFunc<
    Type.GetAnnouncementsByOptionalSearchParams,
    Type.GetAnnouncementsGeneralRes
  >;
}
