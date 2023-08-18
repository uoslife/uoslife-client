import {useState} from 'react';
import {View} from 'react-native';
import NoticeMainScreen from './NoticeMainScreenContainer';
import NoticeBookmarkBoxScreenContainer from './NoticeBookmarkBoxScreenContainer';
import NoticeDetailScreenContainer from './NoticeDetailScreenContainer';
import NoticeSearchResultScreencontainer from './NoticeSearchResultScreencontainer';

export type StepTypeTemp = 'main' | 'detail' | 'bookmark-box' | 'search-result';

const NoticeTempScreen = () => {
  const [step, setStep] = useState<StepTypeTemp>('detail');

  const handleNoticeStep = (step: StepTypeTemp) => {
    switch (step) {
      case 'main':
        return <NoticeMainScreen setStep={setStep} />;
      case 'detail':
        return <NoticeDetailScreenContainer setStep={setStep} />;
      case 'bookmark-box':
        return <NoticeBookmarkBoxScreenContainer setStep={setStep} />;
      case 'search-result':
        return <NoticeSearchResultScreencontainer setStep={setStep} />;
    }
  };

  return <View>{handleNoticeStep(step)}</View>;
};

export default NoticeTempScreen;
