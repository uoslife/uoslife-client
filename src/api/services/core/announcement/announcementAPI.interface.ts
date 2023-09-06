import {ServiceFunc} from '../../type';
import * as Type from './announcementAPI.type';

export default interface AnnouncementService {
  getAnnouncementsAll: ServiceFunc<
    Type.GetAnnouncementsAllParams,
    Type.GetAnnouncementsGeneralRes
  >;
  getAnnouncementsBySearch: ServiceFunc<
    Type.GetAnnouncementsBySearchParams,
    Type.GetAnnouncementsGeneralRes
  >;
  getAnnouncementsByOptionalSearch: ServiceFunc<
    Type.GetAnnouncementsByOptionalSearchParams,
    Type.GetAnnouncementsGeneralRes
  >;
}
