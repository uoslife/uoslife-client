import analytics from '@react-native-firebase/analytics';
import {
  LogEventNameType,
  LogEventObjectType,
} from '../configs/analytics/analytics';

export default class AnalyticsService {
  static async logAnalyticsEvent(
    logEventName: LogEventNameType,
    logEventObject: LogEventObjectType,
  ): Promise<void> {
    await analytics().logEvent(logEventName, logEventObject);
  }
}
