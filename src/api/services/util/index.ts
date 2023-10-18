import CafeteriaAPI from './cafeteria/cafeteriaAPI';
import AnnouncementAPI from './announcement/announcementAPI';
import StudentIdQrAPI from './studentIdQr/studentIdQrAPI';

const UtilAPI = {
  ...CafeteriaAPI,
  ...AnnouncementAPI,
  ...StudentIdQrAPI,
};

export default UtilAPI;
