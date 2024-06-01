import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import NotificationService from './src/services/notification';

NotificationService.registerMessageHandlerOnBackground();
NotificationService.onBackgroundEvent();

const FakeAppForiOSBackgroundNoti = () => {
  return null;
};

const AppWrapper = ({isHeadless}) => {
  if (isHeadless) {
    return <FakeAppForiOSBackgroundNoti />;
  }

  return <App />;
};
AppRegistry.registerComponent(appName, () => AppWrapper);
