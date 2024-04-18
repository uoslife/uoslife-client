import styled, {css} from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {View} from 'react-native';
import LibraryChallengeBoard from '../../../components/molecules/screens/library/LibraryChallengeBoard';

const ChallengeScreen = () => {
  return (
    <S.Container>
      <S.CharacterBox>
        <S.ImageContainer
          source={require('../../../assets/images/iroomae_baby.png')}
        />
        <S.TextBox>
          <Txt label="아기루매" color="grey190" typograph="headlineMedium" />
          <View
            style={css`
              display: flex;
              align-items: center;
              gap: 4px;
            `}>
            <Txt
              label="5시간 달성!"
              color="primaryBrand"
              typograph="titleSmall"
            />
            <Txt
              label="루매가 부화했어요!"
              color="grey190"
              typograph="bodyMedium"
            />
          </View>
        </S.TextBox>
      </S.CharacterBox>
      <LibraryChallengeBoard />
    </S.Container>
  );
};

export default ChallengeScreen;

const S = {
  Container: styled.View`
    width: 100%;
    height: 100%;
    background-color: #f7faff;
    padding-left: 28px;
    padding-right: 28px;
    padding-top: 20px;
    gap: 20px;
  `,
  CharacterBox: styled.View`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  TextBox: styled.View`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  ImageContainer: styled.Image`
    width: 200px;
    height: 200px;
  `,
};
