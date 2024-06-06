import NotificationAPI from './notification/notificationAPI';
import MygradeAPI from './mygrade/mygradeAPI';
import LibraryHistoryAPI from './libraryHistory/libraryHistoryAPI';
import GraduateCreditAPI from './graduateCredit/graduateCreditAPI';

const CoreAPI = {
  ...NotificationAPI,
  ...MygradeAPI,
  ...LibraryHistoryAPI,
  ...GraduateCreditAPI,
};

export default CoreAPI;
