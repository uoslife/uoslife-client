import styled, {css} from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {View} from 'react-native';
import LibraryChallengeBoard from '../../../components/molecules/screens/library/LibraryChallengeBoard';
import {
  ChallengeUserStatusDes1Enum,
  ChallengeUserStatusDes2Enum,
  ChallengeUserStatusEnum,
} from '../../../configs/utility/libraryChallenge/challengeUserStatus';

export const ChallengUserStatusImgEnum = {
  EGG: require('../../../assets/images/iroomae_egg.png'),
  BABY: require('../../../assets/images/iroomae_baby.png'),
  CHICK: require('../../../assets/images/iroomae_chick.png'),
  JUNGDO: require('../../../assets/images/iroomae_jungdo.png'),
  CHEONJAE: require('../../../assets/images/iroomae_cheonjae.png'),
  MANJAE: require('../../../assets/images/iroomae_manjae.png'),
};

const ChallengeScreen = () => {
  return (
    <S.Container>
      <S.CharacterBox>
        <S.ImageContainer source={ChallengUserStatusImgEnum.BABY} />
        <S.TextBox>
          <Txt
            label={ChallengeUserStatusEnum.BABY}
            color="grey190"
            typograph="headlineMedium"
          />
          <View
            style={css`
              display: flex;
              align-items: center;
              gap: 4px;
            `}>
            <Txt
              label={ChallengeUserStatusDes1Enum.BABY}
              color="primaryBrand"
              typograph="titleSmall"
            />
            <Txt
              label={ChallengeUserStatusDes2Enum.BABY}
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
