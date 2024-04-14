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
        <S.TxtContainer>
          <Txt
            label={'도서관 이벤트'}
            color="grey190"
            typograph="headlineLarge"
            style={{textAlign: 'center'}}
          />
          <Txt
            label={
              '시험 기간 동안의 도서관 이용을 통해\n 도전과제를 달성하고 시대생 유저들과\n 순위 경쟁을 벌여보세요.'
            }
            color="grey190"
            typograph="bodyMedium"
            style={{textAlign: 'center'}}
          />
        </S.TxtContainer>
        <S.ButtonContainer>
          <Button
            label="도서관 순위"
            isFullWidth
            onPress={() => handleOnpressButton(RANK_DEEPLINK)}
            isRounded={true}
          />
          <Button
            label="도전과제"
            isFullWidth
            onPress={() => handleOnpressButton(CHALLENGE_DEEPLINK)}
            isRounded={true}
          />
        </S.ButtonContainer>
      </S.DescriptionWrapper>
    </S.screenContainer>
  );
};

export default EventScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
    padding-top: 164px;
    height: 100%;
    align-items: center;
    gap: 60px;
  `,
  ImageContainer: styled.Image`
    width: 135px;
    height: 135px;
  `,
  TxtContainer: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 16px;
  `,
  ButtonContainer: styled.View`
    gap: 12px;
  `,
  DescriptionWrapper: styled.View`
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
    justify-content: center;
    gap: 88px;
  `,
};
