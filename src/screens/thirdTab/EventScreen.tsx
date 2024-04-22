import styled from '@emotion/native';
import {Button, Txt, colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {RootNavigationProps} from '../../navigators/RootStackNavigator';

type NavigationType = 'Library_challenge' | 'Library_ranking';

const EventScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const insets = useSafeAreaInsets();
  const handleOnpressButton = (path: NavigationType) => {
    switch (path) {
      case 'Library_challenge':
        return navigation.navigate('Library', {
          screen: 'Library_challenge',
        });
      case 'Library_ranking':
        return navigation.navigate('Library', {
          screen: 'Library_ranking',
        });
    }
  };

  return (
    <ScrollView bounces={false}>
      <LinearGradient
        style={{width: '100%', height: '100%', position: 'absolute'}}
        colors={['#E9F3FF', '#ffffff']}
      />
      <S.ScreenContainer
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 110,
        }}>
        <S.ImageContainer
          source={require('../../assets/images/iroomae_event_page.png')}
        />
        <S.DescriptionWrapper>
          <S.TxtContainer>
            <View style={{gap: 8}}>
              <S.CategoryContainer>
                <S.CategoryContent>
                  <Txt
                    label="#도서관 좌석 서비스 도입"
                    color="grey190"
                    typograph="labelSmall"
                    style={{textAlign: 'center'}}
                  />
                </S.CategoryContent>
                <S.CategoryContent>
                  <Txt
                    label="#도서관 순위"
                    color="grey190"
                    typograph="labelSmall"
                    style={{textAlign: 'center'}}
                  />
                </S.CategoryContent>
                <S.CategoryContent>
                  <Txt
                    label="#도전 과제"
                    color="grey190"
                    typograph="labelSmall"
                    style={{textAlign: 'center'}}
                  />
                </S.CategoryContent>
              </S.CategoryContainer>
              <Txt
                label="도전! 중간고사"
                color="grey190"
                typograph="headlineLarge"
                style={{textAlign: 'center', fontSize: 44, lineHeight: 53}}
              />
              <Txt
                label="4월 23일 - 31일"
                color="grey190"
                typograph="bodyLarge"
                style={{textAlign: 'center'}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <S.TxtWrapper>
                <Txt
                  label="시험 기간 동안 도서관 이용을 통해"
                  color="grey190"
                  typograph="bodyMedium"
                  style={{textAlign: 'center'}}
                />
                <Txt
                  label="도전과제를 달성"
                  color="primaryBrand"
                  typograph="bodyMedium"
                  style={{textAlign: 'center', marginLeft: 4}}
                />
                <Txt
                  label="하고"
                  color="grey190"
                  typograph="bodyMedium"
                  style={{textAlign: 'center'}}
                />
              </S.TxtWrapper>
              <S.TxtWrapper>
                <Txt
                  label="다른 시대생 사용자와 "
                  color="grey190"
                  typograph="bodyMedium"
                  style={{textAlign: 'center'}}
                />
                <Txt
                  label="순위 경쟁"
                  color="primaryBrand"
                  typograph="bodyMedium"
                  style={{textAlign: 'center', marginLeft: 4}}
                />
                <Txt
                  label="을 벌여보세요!"
                  color="grey190"
                  typograph="bodyMedium"
                  style={{textAlign: 'center'}}
                />
              </S.TxtWrapper>
            </View>
          </S.TxtContainer>
          <S.ButtonContainer>
            <Button
              label="도서관 순위"
              isFullWidth
              onPress={() => handleOnpressButton('Library_ranking')}
              isRounded
            />
            <Button
              label="도전과제"
              isFullWidth
              onPress={() => handleOnpressButton('Library_challenge')}
              isRounded
            />
          </S.ButtonContainer>
        </S.DescriptionWrapper>
        <S.GapBox />
      </S.ScreenContainer>
    </ScrollView>
  );
};

export default EventScreen;

const S = {
  ScreenContainer: styled.View`
    flex: 1;
    padding-top: 80px;
    height: 100%;
  `,
  ImageContainer: styled.Image`
    width: 100%;
    height: 300px;
  `,
  CategoryContainer: styled.View`
    flex-direction: row;
    gap: 8px;
  `,
  CategoryContent: styled.View`
    padding: 4px 8px;
    border-radius: 16px;
    background-color: ${colors.secondaryLight};
  `,
  TxtContainer: styled.View`
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 16px;
    gap: 16px;
  `,
  TxtWrapper: styled.View`
    flex-direction: row;
  `,
  ButtonContainer: styled.View`
    gap: 12px;
  `,
  DescriptionWrapper: styled.View`
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
    justify-content: center;
    gap: 24px;
  `,
  GapBox: styled.View`
    height: 32px;
  `,
};
