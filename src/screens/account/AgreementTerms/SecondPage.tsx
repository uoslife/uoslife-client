import styled from '@emotion/native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { View, Text, NativeSyntheticEvent, TextInputChangeEventData, Image } from 'react-native';
import { BaseButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../../components/button/Button';
import BottomSheet from '../../../components/modals/BottomSheet';
import PopUp from '../../../components/modals/PopUp';

// 약관 동의: 하단 팝업에 들어갈 내용
const AgreementToTerms = ({ openPopUp }: { openPopUp: () => void }) => {
    const [checked, setChecked] = useState<boolean[]>([false, false, false]);
    const checkedAll = checked[0] && checked[1] && checked[2];

    // const checkCheckedPath = "../../../assets/images/check_checked.png";
    // const checkUncheckedPath = "../../../assets/images/check_unchecked.png";
    // const checkCircleCheckedPath = "../../../assets/images/check_circle_checked.png";
    // const checkCircleUncheckedPath = "../../../assets/images/check_circle_unchecked.png";

    const CheckCheckedImage = () => <Image source={require("../../../assets/images/check_checked.png")} />
    const CheckUncheckedImage = () => <Image source={require("../../../assets/images/check_unchecked.png")} />
    const CheckCircleCheckedImage = () => <Image source={require("../../../assets/images/check_circle_checked.png")} />
    const CheckCircleUncheckedImage = () => <Image source={require("../../../assets/images/check_circle_unchecked.png")} />

    useEffect(() => { if (checked[2]) openPopUp() }, [checked[2]]);

    const toggleAll = () => {
        if (checkedAll) {
            setChecked([false, false, false]);
        }
        else
            setChecked([true, true, true]);
    }

    const toggleSingle = (num: number) => {
        const copied = [...checked];
        copied[num] = !copied[num];

        setChecked(copied);
    };

    return <View>
        <View>
            <S.checkAllBtn onPress={toggleAll}>
                {
                    (checkedAll)
                        ? <CheckCircleCheckedImage />
                        : <CheckCircleUncheckedImage />
                }
                <Text>약관에 모두 동의</Text>
            </S.checkAllBtn>
            <S.checkSingleContainer>
                <TouchableOpacity onPress={() => { toggleSingle(0) }}>
                    {checked[0] ? <CheckCheckedImage /> : <CheckUncheckedImage />}
                </TouchableOpacity>
                <Text onPress={() => { }}>[필수] 개인정보처리방침</Text>
            </S.checkSingleContainer>
            <S.checkSingleContainer>
                <TouchableOpacity onPress={() => { toggleSingle(1) }}>
                    {checked[1] ? <CheckCheckedImage /> : <CheckUncheckedImage />}
                </TouchableOpacity>
                <Text onPress={() => { }}>[필수] 시대생 이용약관</Text>
            </S.checkSingleContainer>
            <S.checkSingleContainer>
                <TouchableOpacity onPress={() => { toggleSingle(2) }}>
                    {checked[2] ? <CheckCheckedImage /> : <CheckUncheckedImage />}
                </TouchableOpacity>
                <View>
                    <Text>[선택] 광고 및 마케팅 수신 동의 알림</Text>
                    <Text>각종 시대생 소식 및 이벤트에 대한 정보를 제공합니다.</Text>
                </View>
            </S.checkSingleContainer>
        </View>
        <Button label='확인' type={checkedAll ? "primary" : "default"} />
    </View>
}

// 광고성 정보 수신동의 처리 결과: 모달에 들어갈 내용
const AgreementProcessResult = () => (
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
            {isPopUpOpened && <PopUp onClose={closePopUp} zIndex={3} darkBackground><AgreementProcessResult /></PopUp>}
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
    checkSingleContainer: styled.View`
        display: flex;
        flex-direction: row;
        gap: 8px;
        width: 100%;
        padding: 12px;
    `,
    checkAllBtn: styled.TouchableOpacity`
        display: flex;
        flex-direction: row;
        gap: 8px;
        width: 100%;
        padding: 12px;
        border-radius: 12px;
        border: #A19F9D
    `,
};
