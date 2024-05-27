import {get} from '../../../core/methods';
import AnnouncementService from './announcementAPI.interface';
import * as Type from './announcementAPI.type';
import {generateQueryString} from '../../../../features/announcement/utils/getQueryStringFromParams';

// TODO: ServiceFunc 변경 이후 발생하는 것으로 예상되는 타입에러 대응
const AnnouncementAPI: AnnouncementService = {
  getAnnouncements: params =>
    get<Type.GetAnnouncementsRes>(
      `utility/announcement?${generateQueryString(params)}&sort=date,desc`,
    ),
  getAnnouncementById: params =>
    get<Type.GetAnnouncementByIdRes>(`utility/announcement/${params.id}`),
  searchAnnoucements: params =>
    get<Type.SearchAnnouncementsRes>(
      `utility/announcement/search?${generateQueryString(
        params,
      )}&sort=date,desc`,
    ),
  getAnnouncementByIdList: params =>
    get<Type.GetAnnouncementByIdListRes>(
      `utility/announcement/list?${params.idList
        .map(id => `id=${id}`)
        .join('&')}`,
    ),
  searchAnnoucementsOptionally: params =>
    get<Type.SearchAnnouncementsOptionallyRes>(
      `utility/announcement/search/option?${generateQueryString(
        params,
      )}&sort=date,desc`,
    ),
};

export default AnnouncementAPI;
