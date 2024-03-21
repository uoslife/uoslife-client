import styled from '@emotion/native';
import {Button, Txt, colors} from '@uoslife/design-system';
import {View, Linking} from 'react-native';
import useUserState from '../../hooks/useUserState';

const LIBRARY_RECAP_DEEPLINK = 'uoslife://libraryRecap';

const RedirectLibraryRecapScreen = () => {
  const {user} = useUserState();
  const handleOnPressCheckButton = async () => {
    await Linking.openURL(LIBRARY_RECAP_DEEPLINK);
  };
  return (
    <S.screenContainer>
      <S.ImageContainer
        source={require('../../assets/images/library_iroomae.png')}
      />
      <S.DescriptionWrapper>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Txt
              label={user?.nickname ?? ''}
              color="primaryBrand"
              typograph="headlineMedium"
            />
            <Txt
              label="님의 2023년"
              color="grey190"
              typograph="headlineMedium"
            />
          </View>
          <Txt
            label="중앙 도서관 여정이 도착했어요"
            color="grey190"
            typograph="headlineMedium"
          />
        </View>
        <Button
          label="확인하기"
          isFullWidth
          onPress={handleOnPressCheckButton}
        />
      </S.DescriptionWrapper>
    </S.screenContainer>
  );
};

export default RedirectLibraryRecapScreen;

const S = {
  screenContainer: styled.View`
    flex: 1;
    background-color: ${colors.primaryLighterAlt};
    padding-top: 164px;
    align-items: center;
    gap: 72px;
  `,
  ImageContainer: styled.Image`
    width: 300px;
    height: 270px;
  `,
  DescriptionWrapper: styled.View`
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
    justify-content: center;
    gap: 24px;
  `,
};
