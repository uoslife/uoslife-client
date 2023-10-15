import {get} from '../../../core/methods';
import AnnouncementService from './announcementAPI.interface';
import * as Type from './announcementAPI.type';
import {generateQueryString} from '../../../../utils/getQueryStringFromParams';

const AnnouncementAPI: AnnouncementService = {
  getAnnouncements: params =>
    get<Type.GetAnnouncementsRes>(
      `utility/announcement?${generateQueryString(params)}`,
    ),
  getAnnouncementById: params =>
    get<Type.GetAnnouncementByIdRes>(`utility/announcement/${params.id}`),
  searchAnnoucements: params =>
    get<Type.SearchAnnouncementsRes>(
      `utility/announcement/search?${generateQueryString(params)}`,
    ),

  // NOT-IN-USE(23 / 10 / 14)

  // searchAnnoucementsOptionally: params =>
  //   get<Type.SearchAnnouncementsOptionallyRes>(`
  //     utility/announcement/search/option?${generateQueryString(params)}`),
};

export default AnnouncementAPI;
