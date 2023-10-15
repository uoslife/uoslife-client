import CafeteriaAPI from './cafeteria/cafeteriaAPI';
import AnnouncementAPI from './announcement/announcementAPI';

const UtilAPI = {
  ...CafeteriaAPI,
  ...AnnouncementAPI,
};

export default UtilAPI;
