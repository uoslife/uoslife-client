import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Header from '../../../../../components/molecules/common/header/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Txt, colors, Icon} from '@uoslife/design-system';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';
const CreditDetailScreen = () => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('교양필수');

  return (
    <ScrollView bounces={false}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="교양"
        onPressBackButton={() => navigation.goBack()}
      />
      <S.ScreenContainer>
        <S.HeaderContainer>
          <Txt label="교양 51학점 중" color="grey190" typograph="titleLarge" />
          <S.TextWrapper>
            <Txt
              label="32학점"
              color="primaryBrand"
              typograph="headlineMedium"
            />
            <Txt
              label=" 수강했어요."
              color="grey190"
              typograph="headlineMedium"
            />
          </S.TextWrapper>
          <View style={{paddingVertical: 4}}>
            <Txt
              label="남은 수강 가능 학점: 19"
              color="grey130"
              typograph="bodyMedium"
            />
          </View>
          <S.CreditInfoContainer>
            <S.CreditInfoBox>
              <Txt label="교양필수" color="grey130" typograph="bodyMedium" />
              <S.TextWrapper>
                <Txt label="8" color="grey190" typograph="titleLarge" />
                <Txt
                  label="/8"
                  color="primaryLighter"
                  typograph="titleMedium"
                />
              </S.TextWrapper>
            </S.CreditInfoBox>
            <S.VerticalDivider />
            <S.CreditInfoBox>
              <Txt label="교양선택" color="grey130" typograph="bodyMedium" />
              <S.TextWrapper>
                <Txt label="24" color="grey190" typograph="titleLarge" />
                <Txt
                  label="/43"
                  color="primaryLighter"
                  typograph="titleMedium"
                />
              </S.TextWrapper>
            </S.CreditInfoBox>
          </S.CreditInfoContainer>
        </S.HeaderContainer>
        <S.HorizontalDivider />
        <S.TabContainer>
          <S.TabButton
            active={activeTab === '교양필수'}
            onPress={() => setActiveTab('교양필수')}>
            <Txt
              label="교양필수"
              color={activeTab === '교양필수' ? 'primaryBrand' : 'grey130'}
              typograph="bodyLarge"
            />
          </S.TabButton>
          <S.TabButton
            active={activeTab === '교양선택'}
            onPress={() => setActiveTab('교양선택')}>
            <Txt
              label="교양선택"
              color={activeTab === '교양선택' ? 'primaryBrand' : 'grey130'}
              typograph="bodyLarge"
            />
          </S.TabButton>
        </S.TabContainer>
        <S.ContentContainer>
          {activeTab === '교양필수' ? (
            <View>
              <S.ProgressBarWrapper>
                <S.TextWrapper>
                  <Txt label="진행률" color="grey190" typograph="titleLarge" />
                  <Txt label="24/30" color="grey90" typograph="bodyMedium" />
                </S.TextWrapper>
                <ProgressBar
                  type="sub"
                  maxNum={130}
                  currentCredit={70}
                  minGraduateCredit={80}
                />
                <Txt
                  label="아직 최소 학점을 채우지 못했어요"
                  color="grey90"
                  typograph="bodyMedium"
                />
              </S.ProgressBarWrapper>
              <Txt label="세부 정보" color="grey190" typograph="titleLarge" />
              <S.DetailInfoContainer>
                <S.DetailInfoBox>
                  <Txt label="인문사회" color="grey190" typograph="bodyLarge" />
                  <S.TextWrapper>
                    <Txt label="3" color="grey190" typograph="titleLarge" />
                    <Txt label="/3" color="grey90" typograph="titleLarge" />
                  </S.TextWrapper>
                </S.DetailInfoBox>
                <S.HorizontalDividerThin />
                <S.DetailInfoBox>
                  <Txt label="자연공학" color="grey190" typograph="bodyLarge" />
                  <S.TextWrapper>
                    <Txt label="3" color="grey190" typograph="titleLarge" />
                    <Txt label="/3" color="grey90" typograph="titleLarge" />
                  </S.TextWrapper>
                </S.DetailInfoBox>
                <S.HorizontalDividerThin />
                <S.DetailInfoBox>
                  <Txt label="공학소양" color="grey190" typograph="bodyLarge" />
                  <S.TextWrapper>
                    <Txt label="3" color="grey190" typograph="titleLarge" />
                    <Txt label="/3" color="grey90" typograph="titleLarge" />
                  </S.TextWrapper>
                </S.DetailInfoBox>
                <S.HorizontalDividerThin />
                <S.DetailInfoBox>
                  <Txt label="학문기초" color="grey190" typograph="bodyLarge" />
                  <S.TextWrapper>
                    <Txt label="3" color="grey190" typograph="titleLarge" />
                    <Txt label="/3" color="grey90" typograph="titleLarge" />
                  </S.TextWrapper>
                </S.DetailInfoBox>
              </S.DetailInfoContainer>
            </View>
          ) : (
            <View>
              <S.ProgressBarWrapper>
                <S.TextWrapper>
                  <Txt label="진행률" color="grey190" typograph="titleLarge" />
                  <Txt label="24/43" color="grey90" typograph="bodyMedium" />
                </S.TextWrapper>
                <ProgressBar
                  type="sub"
                  maxNum={130}
                  currentCredit={70}
                  minGraduateCredit={80}
                />
                <S.TextWrapper>
                  <Icon color="grey130" name="info" width={20} height={20} />
                  <Txt
                    label="아직 최소 학점을 채우지 못했어요"
                    color="grey130"
                    typograph="bodyMedium"
                  />
                </S.TextWrapper>
                <SubjectDetailButton label="학문기초" type="subject" />
              </S.ProgressBarWrapper>
              <S.TextWrapper>
                <Icon
                  color="primaryBrand"
                  name="check"
                  height={20}
                  width={20}
                />
                <Txt
                  label="교양 필수 학점을 모두 이수했어요."
                  color="primaryBrand"
                  typograph="bodyMedium"
                />
              </S.TextWrapper>
            </View>
          )}
        </S.ContentContainer>
      </S.ScreenContainer>
    </ScrollView>
  );
};

export default CreditDetailScreen;

const S = {
  ScreenContainer: styled.View`
    display: flex;
    padding: 24px 16px 120px 16px;
    flex: 1;
  `,
  HeaderContainer: styled.View`
    width: 100%;
    gap: 4px;
  `,
  TextWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  `,
  CreditInfoContainer: styled.View`
    display: flex;
    flex-direction: row;
    margin: 20px 0px;
    width: 100%;
    border-radius: 20px;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.primaryLighterAlt};
  `,
  CreditInfoBox: styled.View`
    display: flex;
    flex: 1;
    height: 92px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  VerticalDivider: styled.View`
    height: 60%;
    width: 1px;
    background-color: ${colors.primaryLight};
  `,
  HorizontalDivider: styled.View`
    align-self: stretch;
    width: 100%;
    height: 8px;
    margin: 0;
    background-color: ${colors.grey20};
  `,
  TabContainer: styled.View`
    flex-direction: row;
    margin-bottom: 16px;
  `,
  TabButton: styled(TouchableOpacity)<{
    active: boolean;
  }>`
    flex: 1;
    padding: 16px;
    align-items: center;
    border-bottom-width: 2px;
    border-bottom-color: ${({active}) =>
      active ? colors.primaryBrand : 'transparent'};
  `,
  ContentContainer: styled.View`
    width: 100%;
    margin-top: 20px;
    gap: 20px;
  `,
  ProgressBarWrapper: styled.View`
    width: 100%;
    display: flex;
    flex: 1;
    gap: 8px;
    margin-bottom: 8px;
  `,
  DetailInfoContainer: styled.View`
    width: 100%;
    margin-top: 20px;
    padding: 16px;
    background-color: ${colors.grey10};
    border-radius: 8px;
    height: 250px;
    display: flex;
    justify-content: space-between;
  `,
  DetailInfoBox: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  HorizontalDividerThin: styled.View`
    align-self: stretch;
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
};
