import {ScrollView, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {css} from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import Header from '../../../../../components/molecules/common/header/Header';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';
import BusinessLogic from '../../services/creditService';
import {RootNavigationProps} from '../../../../../navigators/types/rootStack';
import ModalMenuButton from '../../../../../components/molecules/overlays/items/ModalMenuButton';
// 더미데이터
import dummyData from '../../configs/dummydata';

const data = new BusinessLogic(dummyData);

// 현재, 필요 학점 더해준다.

const GraduateCreditScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
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
        <View>
          <Txt label="교양 51학점 중" color="grey190" typograph="titleLarge" />
          <S.FlexRowLayout>
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
          </S.FlexRowLayout>
          <Txt label="107/130" color="grey130" typograph="bodyMedium" />
        </View>
        <S.ProgressBarContainer>
          <ProgressBar
            type="main"
            maxNum={130}
            currentCredit={70}
            minGraduateCredit={80}
          />
          {/* TODO: styled-component로 변경 */}
          <View
            style={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
            `}>
            <Txt label="0" color="grey60" typograph="labelMedium" />
            <Txt label="130" color="grey60" typograph="labelMedium" />
          </View>
          <View
            style={css`
              display: flex;
              flex-direction: row;
              gap: 4px;
            `}>
            <Icon color="grey130" name="info" width={20} height={20} />
            <Txt
              label="아직 최소 학점을 채우지 못했어요"
              color="grey130"
              typograph="bodyMedium"
            />
          </View>
          <S.FlexRowLayout>
            <SubjectDetailButton label="전공 필수" type="subject" />
            <SubjectDetailButton label="교양 선택" type="subject" />
          </S.FlexRowLayout>
          <S.HorizontalDividerThin />
        </S.ProgressBarContainer>
        <S.DetailCreditTagContainer>
          {data.tags().map((tag, index) => (
            <S.DetailCreditTag key={index}>
              {/* total이 0이면 부전공이나 복수전공 여부 X */}
              {tag.total !== 0 ? (
                <S.TagWrapper>
                  <S.TagHeader>
                    <Txt
                      label={tag.label}
                      color="black"
                      typograph="titleSmall"
                    />
                    <Pressable
                    // TODO: label 이용해 navigate 작성
                    // onPress={() => navigation.navigate('major_credit')}
                    >
                      <Icon
                        name="forwardArrow"
                        color="grey90"
                        width={20}
                        height={20}
                      />
                    </Pressable>
                  </S.TagHeader>
                  <S.TagFooter>
                    <S.CreditInfo>
                      <Txt
                        label={`${tag.current}`}
                        color="grey130"
                        typograph="bodyMedium"
                      />
                      <Txt
                        label={`/${tag.total}`}
                        color="grey60"
                        typograph="bodyMedium"
                      />
                    </S.CreditInfo>
                    <S.StatusButton status={tag.status}>
                      <S.StatusButtonText status={tag.status}>
                        {tag.status ? '이수 완료' : '미이수'}
                      </S.StatusButtonText>
                    </S.StatusButton>
                  </S.TagFooter>
                </S.TagWrapper>
              ) : (
                // 복수전공, 부전공 여부에 따라 비활성화
                <S.TagWrapper>
                  <S.TagHeader>
                    <Txt
                      label={tag.label}
                      color="grey40"
                      typograph="bodyLarge"
                    />
                    <Icon
                      name="forwardArrow"
                      color="grey40"
                      width={20}
                      height={20}
                    />
                  </S.TagHeader>
                </S.TagWrapper>
              )}
            </S.DetailCreditTag>
          ))}
        </S.DetailCreditTagContainer>
      </S.GraduateCreditScreen>
    </ScrollView>
  );
};

export default GraduateCreditScreen;

const S = {
  GraduateCreditScreen: styled.View`
    gap: 24px;
    padding: 30px 16px 120px 16px;
    flex: 1;
  `,
  DetailCreditTagContainer: styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  `,
  DetailCreditTag: styled.View`
    width: 160px;
    height: 100px;
    padding: 12px 8px 12px 12px;
    gap: 10px;
    align-items: center;
    border-radius: 8px;
    background-color: ${colors.grey10};
  `,
  TagWrapper: styled.View`
    gap: 32px;
    width: 100%;
    height: 100%;
  `,
  TagHeader: styled.View`
    display: flex;
    width: 100%;
    height: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  TagFooter: styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  CreditInfo: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  StatusButton: styled.View<{status: boolean}>`
    width: ${({status}) => (status ? '57px' : '44px')};
    border-radius: 10px;
    border-color: ${({status}) =>
      status ? colors.primaryBrand : colors.grey60};
    border: 1px solid;
    align-items: center;
  `,
  StatusButtonText: styled.Text<{status: boolean}>`
    color: ${({status}) => (status ? colors.primaryBrand : colors.grey60)};
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
  `,
  FlexRowLayout: styled.View`
    display: flex;
    gap: 4px;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 4px;
  `,
  ProgressBarContainer: styled.View`
    gap: 4px;
  `,
  HorizontalDividerThin: styled.View`
    align-self: stretch;
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
};
