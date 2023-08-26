import styled from '@emotion/native';
import {View, Text} from 'react-native';

// 광고성 정보 수신동의 처리 결과: 모달에 들어갈 내용
const AgreementProcessResult = () => (
  <S.wrapper>
    <Text>광고성 정보 수신동의 처리 결과</Text>
    <View>
      <Text>전송자: UOS LIFE</Text>
      <Text>일시: {new Date().toDateString()}</Text>
      <Text>내용: 수신동의 처리 완료</Text>
    </View>
    <View>
      <Text>광고성 정보 수신 동의는</Text>
      <Text>MY Page &lt; [앱 설정]에서 변경 가능합니다.</Text>
    </View>
  </S.wrapper>
);

export default AgreementProcessResult;

const S = {
  wrapper: styled.View`
    padding-top: 24px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 16px;
  `,
};
