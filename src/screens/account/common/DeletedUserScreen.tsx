import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Button, Txt} from '@uoslife/design-system';
import Header from '../../../components/molecules/common/header/Header';
import useAccountFlow from '../../../hooks/useAccountFlow';

const DeletedUserScreen = () => {
  const insets = useSafeAreaInsets();

  const {changeAccountFlow, increaseSignUpFlowStep} = useAccountFlow();

  const handlePressAgreeButton = () => {
    increaseSignUpFlowStep();
  };
  const handlePressDisagreeButton = () => {
    increaseSignUpFlowStep();
    // TODO: call rejoin/disagree API
  };

  return (
    <S.ScreenContainer
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 8,
      }}>
      <Header
        label="탈퇴 유저 복구 안내"
        onPressBackButton={() => {
          changeAccountFlow({commonFlowName: 'SIGNIN'});
        }}
      />
      <S.ContentsWrapper>
        <S.TextWrapper>
          <Txt
            label="탈퇴 유저 복구 안내"
            color="black"
            typograph="headlineMedium"
          />
          <Txt
            label={`탈퇴한 이력이 존재하는 계정으로 로그인 하셨습니다.\n기존 계정을 복구하시겠습니까?`}
            color="black"
            typograph="bodyMedium"
          />
        </S.TextWrapper>
        <S.ButtonWrapper>
          <Button label="예" isFullWidth onPress={handlePressAgreeButton} />
          <Button
            label="아니오"
            variant="outline"
            isFullWidth
            onPress={handlePressDisagreeButton}
          />
        </S.ButtonWrapper>
      </S.ContentsWrapper>
    </S.ScreenContainer>
  );
};

export default DeletedUserScreen;

const S = {
  ScreenContainer: styled.View`
    flex: 1;
  `,
  ContentsWrapper: styled.View`
    padding: 28px 16px 0;
    flex: 1;
    justify-content: space-between;
  `,
  TextWrapper: styled.View`
    gap: 16px;
  `,
  ButtonWrapper: styled.View`
    gap: 4px;
  `,
};
