import urls from '../configs/urls';
import UoslifeWebviewScreen from './UoslifeWebviewScreen';

const RouletteScreen = () => {
  return <UoslifeWebviewScreen uri={`${urls.MEETING_URL}/common/roulette`} />;
};

export default RouletteScreen;
