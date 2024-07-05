import NotificationAPI from './notification/notificationAPI';
import HiddenGradeAPI from './hidden_grade/hiddenGradeAPI';
import LibraryHistoryAPI from './libraryHistory/libraryHistoryAPI';

const CoreAPI = {
  ...NotificationAPI,
  ...HiddenGradeAPI,
  ...LibraryHistoryAPI,
};

export default CoreAPI;
