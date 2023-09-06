import {get} from '../../../core/methods';
import AnnouncementService from './announcementAPI.interface';
import * as Type from './announcementAPI.type';

const AnnouncementAPI: AnnouncementService = {
  getAnnouncementsAll: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement?${getQueryStringFromParams(params)}`,
    ),
  getAnnouncementsBySearch: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement/search?${getQueryStringFromParams(params)}`,
    ),
  getAnnouncementsByOptionalSearch: params =>
    get<Type.GetAnnouncementsGeneralRes>(
      `utility/announcement/search/option?${getQueryStringFromParams(params)}`,
    ),
};

export default AnnouncementAPI;
