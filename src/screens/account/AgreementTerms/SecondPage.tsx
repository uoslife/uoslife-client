import styled from '@emotion/native';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, NativeSyntheticEvent, TextInputChangeEventData, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '../../../components/button/Button';
import BottomSheet from '../../../components/modals/BottomSheet';
import PopUp from '../../../components/modals/PopUp';
import AgreementToTerms from '../../../components/contents/AgreementToTerms';
import AgreementProcessResult from '../../../components/contents/AgreementProcessResult';

interface SecondPageProps {
    setPage: Dispatch<SetStateAction<number>>
}

interface InputProps {
    text: string;
    isChecked: boolean;
}

const SecondPage = ({ setPage }: SecondPageProps) => {
    const [input, setInput] = useState<InputProps>({
        text: "",
        isChecked: false,
    });
    const [isBottomSheetOpened, setIsBottomSheetOpened] = useState<boolean>(false);
    const [isPopUpOpened, setIsPopUpOpened] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;

        const regex = /^[가-힣a-zA-Z0-9!@#$%^&*()-_+=~]{1,8}$/;

        const isValid = regex.test(text); // 정규표현식 일치 여부 확인
        let isVerified = false; // 중복되지 않았는지 확인: API 붙인 뒤 로직 작성

        try {
            isVerified = true;
        } catch (err) {
            console.log(err);
        }

        const isChecked = isValid && isVerified;

        setInput({ text, isChecked })
    }

    const openPopUp = () => {
        setIsPopUpOpened(true);
    }

    const openBottomSheet = () => {
        setIsBottomSheetOpened(true);
    }

    const closeBottomSheet = () => {
        setIsBottomSheetOpened(false);
    }

    const closePopUp = () => {
        setIsPopUpOpened(false);
    }

    return (
        <>
            <S.pageWrapper>
                <S.contentsContainer>
                    <S.description1>사용하실 닉네임을 입력해주세요.</S.description1>
                    <View>
                        <S.description2>닉네임은 최대 8자로 설정 가능합니다.</S.description2>
                        <S.description2>한글, 영문, 숫자, 특수기호를 이용해주세요.</S.description2>
                    </View>
                    <View>
                        <View><S.literalNickname>닉네임</S.literalNickname></View>
                        <S.nicknameAndCheck>
                            <TextInput value={input.text} onChange={onChange} style={{ borderColor: "black", borderStyle: 'solid', borderWidth: 5, flex: 1 }} />
                        </S.nicknameAndCheck>
                    </View>
                </S.contentsContainer>
                <Button
                    label={"확인"}
                    onPress={openBottomSheet}
                    type={input.isChecked ? "primary" : "default"}
                />
            </S.pageWrapper>
            {isBottomSheetOpened && <BottomSheet zIndex={1} onBackgroundPress={closeBottomSheet} darkBackground={!isPopUpOpened}>
                <AgreementToTerms openPopUp={openPopUp} />
            </BottomSheet>}
            {isPopUpOpened && <PopUp onClose={closePopUp} zIndex={3} darkBackground>
                <AgreementProcessResult />
            </PopUp>}
        </>
    );
}

export default SecondPage;

const S = {
    pageWrapper: styled.View`
        flex: 1;
        display: flex;
        flex-direction: column;

        padding-top: 28px;
        padding-right: 16px;
        padding-left: 16px;
        padding-bottom: 28px;
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
        gap: 32px;
    `,
    description1: styled.Text`
        font-size: 25px;
        font-weight: bold;
        color: black;
    `,
    description2: styled.Text`
        font-size: 18px;
        color: black;
    `,
    inputContainer: styled.View`
        display: flex;
        flex-direction: column;
        gap: 28px;
    `,
    literalNickname: styled.Text`
        padding-left: 12px;
        padding-right: 12px
        color: black;
    `,
};
