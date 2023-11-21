import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import NotificationService from './src/services/notification';

NotificationService.registerMessageHandlerOnBackground();

AppRegistry.registerComponent(appName, () => App);
