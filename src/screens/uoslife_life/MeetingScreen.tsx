import urls from '../../configs/urls';
import UoslifeWebviewScreen from '../etc/UoslifeWebviewScreen';

const MeetingScreen = () => {
  return <UoslifeWebviewScreen uri={urls.MEETING_URL} />;
};

export default MeetingScreen;
