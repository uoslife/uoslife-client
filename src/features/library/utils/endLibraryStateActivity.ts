import {isAndroid} from '../../../utils/android/isAndroid';
import {LibraryStateNotificationBridge} from '../../../utils/android/libraryStateNotificationBridge';
import {LibraryDynamicIslandBridge} from '../../../utils/ios/libraryDynamicIslandBridge';
import {
  deleteLibrarySeatStartTime,
  deleteLibraryUsingStatus,
} from '../storage/library';

export const endLibraryStateActivity = () => {
  if (isAndroid) LibraryStateNotificationBridge.end();
  else LibraryDynamicIslandBridge.onEndActivity();

  deleteLibrarySeatStartTime();
  deleteLibraryUsingStatus();
};
