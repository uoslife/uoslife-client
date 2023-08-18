import React, {Dispatch} from 'react';
import {View} from 'react-native';

type StepTypeTemp = 'main' | 'detail' | 'bookmark';

const NoticeDetailScreenContainer = ({
  setStep,
}: {
  setStep: Dispatch<StepTypeTemp>;
}) => {
  return <View></View>;
};

export default NoticeDetailScreenContainer;
