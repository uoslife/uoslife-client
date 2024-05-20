import urls from '../../configs/urls';
import UoslifeWebviewScreen from './UoslifeWebviewScreen';

const MeetingScreen = () => {
  return <UoslifeWebviewScreen uri={`${urls.MEETING_URL}/common/roulette`} />;
};

export default MeetingScreen;
