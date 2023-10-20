import CafeteriaAPI from './cafeteria/cafeteriaAPI';
import AnnouncementAPI from './announcement/announcementAPI';
import LibraryAPI from './library/libraryAPI';
import StudentIdAPI from './studentId/studentIdAPI';

const UtilAPI = {
  ...CafeteriaAPI,
  ...AnnouncementAPI,
  ...LibraryAPI,
  ...StudentIdAPI,
};

export default UtilAPI;
