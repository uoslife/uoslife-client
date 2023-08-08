import styled from '@emotion/native';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TextInput, BaseButton } from 'react-native-gesture-handler';

const FirstPage = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    return (
        <S.pageWrapper>
            <S.contentsContainer>
                <S.descriptionContainer>
                    <View>
                        <S.description1>통합하고자 하는 아이디를</S.description1>
                        <S.description1>선택해주세요.</S.description1>
                    </View>
                    <View>
                        <S.description2>&#8226; 아래 기본 계정 중 대표로 통합할 계정을 선택해주세요.</S.description2>
                        <S.description2>&#8226; 선택한 계정을 제외한 기존 계정은 삭제됩니다.</S.description2>
                    </View>
                </S.descriptionContainer>
                <S.inputContainer>
                    <TextInput>Temp</TextInput>
                    <TextInput>Temp</TextInput>
                    <TextInput>Temp</TextInput>
                    <TextInput>Temp</TextInput>
                </S.inputContainer>
            </S.contentsContainer>
            <BaseButton><Text>다음</Text></BaseButton>
        </S.pageWrapper>
    )
}

export default FirstPage;

const S = {
    pageWrapper: styled.View`
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-top: 42px;
        padding-right: 21px;
        padding-left: 21px;
        padding-bottom: 27px;

        align-items: center;
        justify-content: space-between;
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
    `,
    descriptionContainer: styled.View`
        display: flex;
        flex-direction: column;
        gap: 8px;
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
