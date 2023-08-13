import { useState, useEffect } from "react"
import { View, Text, Image } from 'react-native';
import { Button } from "../button/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "@emotion/native";

// 약관 동의: 하단 팝업에 들어갈 내용
// 재사용성은 고려하지 않고 짬, 리팩토링 굳이 필요하려나?
const AgreementToTerms = ({ openModal }: { openModal: () => void }) => {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);

  // const checkCheckedPath = "../../../assets/images/check_checked.png";
  // const checkUncheckedPath = "../../../assets/images/check_unchecked.png";
  // const checkCircleCheckedPath = "../../../assets/images/check_circle_checked.png";
  // const checkCircleUncheckedPath = "../../../assets/images/check_circle_unchecked.png";

  const CheckCheckedImage = () => <Image source={require("../../assets/images/check_checked.png")} />
  const CheckUncheckedImage = () => <Image source={require("../../assets/images/check_unchecked.png")} />
  const CheckCircleCheckedImage = () => <Image source={require("../../assets/images/check_circle_checked.png")} />
  const CheckCircleUncheckedImage = () => <Image source={require("../../assets/images/check_circle_unchecked.png")} />

  useEffect(() => { if (checked[2]) openModal() }, [checked[2]]);

  const checkedAll = checked[0] && checked[1] && checked[2];
  const checkedRequired = checked[0] && checked[1];

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
    <Button label='확인' type={checkedRequired ? "primary" : "default"} />
  </View>
}

export default AgreementToTerms;

const S = {
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
