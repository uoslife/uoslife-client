import urls from '../../../configs/urls';
import UoslifeWebviewScreen from '../../../screens/UoslifeWebviewScreen';

const MeetingScreen = () => {
  return <UoslifeWebviewScreen uri={urls.MEETING_URL} />;
};

export default MeetingScreen;
