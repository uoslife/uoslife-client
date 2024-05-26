import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../../../components/molecules/common/header/Header';
import ChallengeScreen from './main_screen/ChallengeScreen';

const LibraryChallengeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header
        label="도전과제"
        onPressBackButton={handleGoBack}
        style={{paddingTop: insets.top}}
      />
      <ChallengeScreen />
    </>
  );
};

export default LibraryChallengeScreen;
