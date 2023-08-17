import React from 'react'
import { View, Text } from "react-native";
import RoundTextInput from '../../../components/forms/roundTextInput/RoundTextInput';
import Header from '../../../components/header/Header';

const NoticeMainScreen = () => {
  return (
    <View>
      <Header label='공지사항' />
      <RoundTextInput placeholder='Placeholder' />
    </View>
  )
}; 

export default NoticeMainScreen;