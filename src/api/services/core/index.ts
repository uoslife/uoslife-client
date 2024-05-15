import NotificationAPI from './notification/notificationAPI';
import MygradeAPI from './mygrade/mygradeAPI';
import LibraryHistoryAPI from './libraryHistory/libraryHistoryAPI';

const CoreAPI = {
  ...NotificationAPI,
  ...MygradeAPI,
  ...LibraryHistoryAPI,
};

export default CoreAPI;
