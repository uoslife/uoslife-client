import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Header from '../../components/header/Header';
import RoundInput from '../../components/textFields/roundInput/RoundInput';

const VerificationScreen = () => {
  const [value, setValue] = useState({
    name: '',
  });
  const onChangeText = (text: string, target: string) => {
    setValue({
      ...value,
      [target]: text,
    });
  };

  return (
    <View>
      <Header label="휴대폰 본인인증" />
      <Text>VerificationScreen</Text>
      <RoundInput
        value={value.name}
        onChangeText={e => onChangeText(e, 'name')}
        status="success">
        <Text>안녕</Text>
      </RoundInput>
    </View>
  );
};

export default VerificationScreen;
