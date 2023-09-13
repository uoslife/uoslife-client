import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
const UoslifeMeetingScreen = () => {
  return (
    <S.screenContainer>
      <S.uoslifeBrandLogo
        source={require('../assets/images/uoslifeBrandLogo.png')}
      />
      <S.titleContainer>
        <S.confettiImage source={require('../assets/images/confetti.png')} />
        <Txt
          label={'시대팅 준비중에 있어요'}
          color={'grey190'}
          typograph={'headlineLarge'}
        />
        <S.confettiImage source={require('../assets/images/confetti.png')} />
      </S.titleContainer>
    </S.screenContainer>
  );
};

export default UoslifeMeetingScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 30px;
  `,
  uoslifeBrandLogo: styled.Image`
    width: 85%;
    height: 20%;
  `,
  titleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  `,
  confettiImage: styled.Image`
    width: 24px;
    height: 24px;
  `,
};
