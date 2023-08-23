import React, {Dispatch} from 'react';
import {View} from 'react-native';

type StepTypeTemp = 'main' | 'detail' | 'bookmark' | 'search-result';

const NoticeSearchResultScreencontainer = ({
  setStep,
}: {
  setStep: Dispatch<StepTypeTemp>;
}) => {
  return <View></View>;
};

export default NoticeSearchResultScreencontainer;
