import CafeteriaAPI from './cafeteria/cafeteriaAPI';
import AnnouncementAPI from './announcement/announcementAPI';
import StudentIdAPI from './studentId/studentIdAPI';

const UtilAPI = {
  ...CafeteriaAPI,
  ...AnnouncementAPI,
  ...StudentIdAPI,
};

export default UtilAPI;
