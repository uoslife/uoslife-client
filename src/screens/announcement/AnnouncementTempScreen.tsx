import {useState} from 'react';
import {View} from 'react-native';
import AnnouncementMainScreen from './AnnouncementMainScreenContainer';
import AnnouncementBookmarkBoxScreenContainer from './AnnouncementBookmarkBoxScreenContainer';
import AnnouncementDetailScreenContainer from './AnnouncementDetailScreenContainer';
import AnnouncementSearchResultScreencontainer from './AnnouncementSearchResultScreencontainer';
import AnnoucementSearchContainerScreen from './AnnoucementSearchContainerScreen';

export type StepTypeTemp =
  | 'main'
  | 'detail'
  | 'bookmark-box'
  | 'search-result'
  | 'serach-window';

const AnnouncementTempScreen = () => {
  const [step, setStep] = useState<StepTypeTemp>('main');

  const handleAnnouncementStep = (step: StepTypeTemp) => {
    switch (step) {
      case 'main':
        return <AnnouncementMainScreen setStep={setStep} />;
      case 'detail':
        return <AnnouncementDetailScreenContainer setStep={setStep} />;
      case 'bookmark-box':
        return <AnnouncementBookmarkBoxScreenContainer setStep={setStep} />;
      case 'search-result':
        return <AnnouncementSearchResultScreencontainer setStep={setStep} />;
      case 'serach-window':
        return <AnnoucementSearchContainerScreen setStep={setStep} />;
    }
  };

  return <View>{handleAnnouncementStep(step)}</View>;
};

export default AnnouncementTempScreen;
