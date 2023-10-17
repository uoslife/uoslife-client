import CafeteriaAPI from './cafeteria/cafeteriaAPI';
import AnnouncementAPI from './announcement/announcementAPI';
import LibraryAPI from './library/libraryAPI';

const UtilAPI = {
  ...CafeteriaAPI,
  ...AnnouncementAPI,
  ...LibraryAPI,
};

export default UtilAPI;
