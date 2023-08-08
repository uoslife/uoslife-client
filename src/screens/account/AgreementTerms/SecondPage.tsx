import styled from '@emotion/native';
import React, { useState } from 'react'
import { View, Text } from 'react-native';
import { BaseButton, TextInput } from 'react-native-gesture-handler';

// 약관 동의: 하단 팝업에 들어갈 내용
const AgreementToTerms = () => (
    <View>
        <BaseButton><Text>약관에 모두 동의</Text></BaseButton>
        <BaseButton><Text>(필수) 개인정보처리방침</Text></BaseButton>
        <BaseButton><Text>(필수) 시대생 이용약관</Text></BaseButton>
        <BaseButton><Text>(선택) 광고 및 마케팅 수신 동의 알림</Text></BaseButton>
    </View>
)

// 광고성 정보 수신동의 처리 결과: 모달에 들어갈 내용
const AgreementProcessedResult = () => (
    <View>
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
        <BaseButton><Text>닫기</Text></BaseButton>
    </View>
);

const SecondPage = () => {
    const [isValid, setIsValid] = useState<boolean>(false);

    return (
        <S.pageWrapper>
            <S.contentsContainer>
                <S.description1>사용하실 닉네임을 입력해주세요.</S.description1>
                <View>
                    <S.nicknameAndCheck>
                        <TextInput style={{ borderColor: "black", borderStyle: 'solid', borderWidth: 5, flex: 1 }} />
                        <BaseButton onPress={() => { setIsValid(true) }}><Text>중복확인</Text></BaseButton>
                    </S.nicknameAndCheck>
                    <S.description2>&#8226; 한글, 영문, 숫자, 특수기호를 이용하여</S.description2>
                    <S.description2>최대 8자 설정 가능합니다.</S.description2>
                </View>
            </S.contentsContainer>
            <BaseButton onPress={isValid ? () => {

            } : () => { }} style={isValid ? { backgroundColor: "blue", width: "100%" } : {}}><Text>확인</Text></BaseButton>
        </S.pageWrapper>
    );
}

export default SecondPage;

const S = {
    pageWrapper: styled.View`
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        padding-top: 42px;
        padding-right: 21px;
        padding-left: 21px;
        padding-bottom: 27px;
        justify-content: space-between;
    `,
    nicknameAndCheck: styled.View`
        display: flex;
        flex-direction: row;
        gap: 4px;
    `,
    contentsContainer: styled.View`
        display: flex;
        flex-direction: column;
        gap: 24px;
    `,
    description1: styled.Text`
        font-size: 25px;
        font-weight: bold;
        color: black;
    `,
    description2: styled.Text`
        font-size: 18px;
        padding-left: 27px;
        padding-right: 27px;
    `,
    inputContainer: styled.View`
        display: flex;
        flex-direction: column;
        gap: 28px;
    `,
    // cardContainer: styled.View`
    //   padding: 12px;
    //   width: 200px;
    //   display: flex;
    //   flex-direction: column;
    //   border-radius: 8px;
    //   background: #efefef;
    // `,
    // cardWrapper: styled.View`
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: space-between;
    // `,
    // button: styled.View`
    //   border-radius: 16px;
    //   background: #d0d0d0;
    //   padding: 4px 10px;
    //   font-size: 10px;
    // `,
};
