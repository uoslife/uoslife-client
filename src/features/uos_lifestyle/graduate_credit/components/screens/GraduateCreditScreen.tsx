import {ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import Header from '../../../../../components/molecules/common/header/Header';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';

const GraduateCreditScreen = () => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  return (
    <ScrollView bounces={false}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="이수 학점 확인하기"
        onPressBackButton={() => navigation.goBack()}
      />
      <S.GraduateCreditScreen>
        <SubjectDetailButton type="major" label="디자인학과" />
        <SubjectDetailButton type="subject" label="전공 필수" />
        <ProgressBar
          type="sub"
          maxNum={130}
          currentCredit={70}
          minGraduateCredit={80}
        />
      </S.GraduateCreditScreen>
    </ScrollView>
  );
};

export default GraduateCreditScreen;

const S = {
  GraduateCreditScreen: styled.View`
    gap: 24px;
    padding: 52px 16px 120px 16px;
    flex: 1;
  `,
};
