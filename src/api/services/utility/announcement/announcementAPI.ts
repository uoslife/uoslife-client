import {get} from '../../../core/methods';
import AnnouncementService from './announcementAPI.interface';
import * as Type from './announcementAPI.type';

const AnnouncementAPI: AnnouncementService = {
  getAllAnnouncements: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement?${getQueryStringFromParams(params)}`,
    ),
  searchAnnouncements: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement/search?${getQueryStringFromParams(params)}`,
    ),
  opitonallySearchAnnouncements: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement/search/option?${getQueryStringFromParams(params)}`,
    ),
};

export default AnnouncementAPI;
