import styled from '@emotion/native';
import {Button, Txt, colors} from '@uoslife/design-system';
import {View, Linking} from 'react-native';
import useUserState from '../../hooks/useUserState';

const RANK_DEEPLINK = 'uoslife://rank';
const CHALLENGE_DEEPLINK = 'uoslife://challenge';

type DeepLinkType = typeof RANK_DEEPLINK | typeof CHALLENGE_DEEPLINK;

const EventScreen = () => {
  const handleOnpressButton = async (deepLink: DeepLinkType): Promise<void> => {
    await Linking.openURL(deepLink);
  };

  return (
    <S.screenContainer>
      <S.DescriptionWrapper>
        <S.TopContainer>
          <Txt
            label={'도서관  이벤트'}
            color="primaryBrand"
            typograph="headlineLarge"
          />
          <S.ImageContainer
            source={require('../../assets/images/library_iroomae.png')}
          />
        </S.TopContainer>
        <Button
          label="순위 보기"
          isFullWidth
          onPress={() => handleOnpressButton(RANK_DEEPLINK)}
        />
        <Button
          label="도전 과제"
          isFullWidth
          onPress={() => handleOnpressButton(CHALLENGE_DEEPLINK)}
        />
      </S.DescriptionWrapper>
    </S.screenContainer>
  );
};

export default EventScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
    background-color: ${colors.primaryLighterAlt};
    padding-top: 164px;
    height: 100%;
    align-items: center;
    gap: 60px;
  `,
  ImageContainer: styled.Image`
    width: 135px;
    height: 135px;
  `,
  TopContainer: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
  `,
  DescriptionWrapper: styled.View`
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
    justify-content: center;
    gap: 32px;
  `,
};
