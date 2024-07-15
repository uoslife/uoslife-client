import NotificationAPI from './notification/notificationAPI';
import HiddenGradeAPI from './hidden_grade/hiddenGradeAPI';
import LibraryHistoryAPI from './libraryHistory/libraryHistoryAPI';
import GraduateCreditAPI from './graduateCredit/graduateCreditAPI';

const CoreAPI = {
  ...NotificationAPI,
  ...HiddenGradeAPI,
  ...LibraryHistoryAPI,
  ...GraduateCreditAPI,
};

export default CoreAPI;
