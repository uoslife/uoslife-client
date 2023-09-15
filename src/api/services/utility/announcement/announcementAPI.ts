import {get} from '../../../core/methods';
import AnnouncementService from './announcementAPI.interface';
import * as Type from './announcementAPI.type';

const AnnouncementAPI: AnnouncementService = {
  getAllAnnouncements: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement?${generateQueryString(params)}`,
    ),
  searchAnnouncements: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement/search?${generateQueryString(params)}`,
    ),
  opitonallySearchAnnouncements: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement/search/option?${generateQueryString(params)}`,
    ),
};

export default AnnouncementAPI;
