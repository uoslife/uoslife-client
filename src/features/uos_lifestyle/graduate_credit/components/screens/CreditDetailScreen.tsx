import React, {Suspense, useState} from 'react';
import {useSuspenseQuery, UseSuspenseQueryResult} from '@tanstack/react-query';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Txt, colors, Icon} from '@uoslife/design-system';
import ProgressBar from '../ProgressBar';
import {GraduateCreditStackParamList} from '../../navigators/types/graduateCredit';
import {CoreAPI} from '../../../../../api/services';
import {ApiResponse, CreditDetail} from '../../types';
import LoadingIndicator from '../LoadingIndicator';
import Header from '../../../../../components/molecules/common/header/Header';
import {SubjectCreditListRes} from '../../../../../api/services/core/graduateCredit/graduateCreditAPI.type';
import {GeneralEducationDetailList, GeneralEducationDetail} from '../../types';
import SubjectDetailButton from '../SubjectDetailButton';

type DetailInformationComponentProps = {
  type?: string;
  requirementCreditTotal: number;
  requirementCreditCurrent: number;
  electiveCreditTotal: number;
  electiveCreditCurrent: number;
  creditData: ApiResponse;
  generalEducationDetail: UseSuspenseQueryResult<SubjectCreditListRes, Error>;
  generalElectiveDetailCredit: GeneralEducationDetailList;
  generalRequirementDetailCredit: GeneralEducationDetailList;
  generalMaxCredit: number;
  generalMinCredit: number;
};

const MainMajorDetailComponent = ({
  type,
  requirementCreditCurrent,
  requirementCreditTotal,
  electiveCreditCurrent,
  electiveCreditTotal,
  creditData,
}: Omit<
  DetailInformationComponentProps,
  | 'generalEducationDetail'
  | 'generalElectiveDetailCredit'
  | 'generalRequirementDetailCredit'
  | 'generalMaxCredit'
  | 'generalMinCredit'
>) => {
  return (
    <View>
      <S.CreditInfoContainer>
        <S.CreditInfoBox>
          <Txt label={`전공필수`} color="grey130" typograph="titleMedium" />
          <S.TextWrapper>
            <Txt
              label={`${requirementCreditCurrent}`}
              color="grey190"
              typograph="titleLarge"
            />
            <Txt
              label={`/${requirementCreditTotal}`}
              color="primaryLighter"
              typograph="titleMedium"
            />
          </S.TextWrapper>
        </S.CreditInfoBox>
        <S.VerticalDivider />
        <S.CreditInfoBox>
          <Txt label={`전공선택`} color="grey130" typograph="titleMedium" />
          <S.TextWrapper>
            <Txt
              label={`${electiveCreditCurrent}`}
              color="grey190"
              typograph="titleLarge"
            />
            <Txt
              label={`/${electiveCreditTotal}`}
              color="primaryLighter"
              typograph="titleMedium"
            />
          </S.TextWrapper>
        </S.CreditInfoBox>

        {type === '전공' && (
          <>
            <S.VerticalDivider />
            <S.CreditInfoBox>
              <Txt label="일반선택" color="grey130" typograph="titleMedium" />
              <S.TextWrapper>
                <Txt
                  label={`${creditData.commonElective}`}
                  color="grey190"
                  typograph="titleMedium"
                />
              </S.TextWrapper>
            </S.CreditInfoBox>
          </>
        )}
      </S.CreditInfoContainer>
      <S.HorizontalDividerThin />

      <S.ProgressBarWrapper>
        <S.TextWrapper>
          <Txt label={`전공필수 `} color="grey190" typograph="titleLarge" />
          <Txt
            label={`${requirementCreditCurrent}/${requirementCreditTotal}`}
            color="grey90"
            typograph="bodyMedium"
          />
        </S.TextWrapper>
        <ProgressBar
          type="none"
          maxNum={requirementCreditTotal}
          currentCredit={requirementCreditCurrent}
        />
      </S.ProgressBarWrapper>
      <S.ProgressBarWrapper>
        <S.TextWrapper>
          <Txt label={`전공선택 `} color="grey190" typograph="titleLarge" />
          <Txt
            label={`${electiveCreditCurrent}/${electiveCreditTotal}`}
            color="grey90"
            typograph="bodyMedium"
          />
        </S.TextWrapper>
        <ProgressBar
          type="none"
          maxNum={electiveCreditTotal}
          currentCredit={electiveCreditCurrent}
        />
      </S.ProgressBarWrapper>
    </View>
  );
};

const SubjectDetailComponent = ({
  requirementCreditCurrent,
  requirementCreditTotal,
  electiveCreditCurrent,
  generalEducationDetail,
  generalElectiveDetailCredit,
  generalRequirementDetailCredit,
  generalMaxCredit,
  generalMinCredit,
}: Omit<
  DetailInformationComponentProps,
  'creditData' | 'electiveCreditTotal'
>) => {
  const [activeTab, setActiveTab] = useState('필수');
  return (
    <View>
      <S.CreditInfoContainer>
        <S.CreditInfoBox>
          <Txt label="교양필수" color="grey130" typograph="titleMedium" />
          <S.TextWrapper>
            <Txt
              label={`${requirementCreditCurrent}`}
              color="grey190"
              typograph="titleLarge"
            />
            <Txt
              label={`/${requirementCreditTotal}`}
              color="primaryLighter"
              typograph="titleMedium"
            />
          </S.TextWrapper>
        </S.CreditInfoBox>
        <S.VerticalDivider />
        <S.CreditInfoBox>
          <Txt label="교양선택" color="grey130" typograph="titleMedium" />
          <S.TextWrapper>
            <Txt
              label={`${electiveCreditCurrent}`}
              color="grey190"
              typograph="titleLarge"
            />
            {/* 교양선택 최소 이수 학점==교양 이수 최대 가능-교양 필수 */}
            <Txt
              label={`/${generalMaxCredit - requirementCreditTotal}`}
              color="primaryLighter"
              typograph="titleMedium"
            />
          </S.TextWrapper>
        </S.CreditInfoBox>
      </S.CreditInfoContainer>
      <S.HorizontalDivider />
      <S.TabContainer>
        <S.TabButton
          active={activeTab === '필수'}
          onPress={() => setActiveTab('필수')}>
          <Txt
            label="교양필수"
            color={activeTab === '필수' ? 'primaryBrand' : 'grey130'}
            typograph="bodyLarge"
          />
        </S.TabButton>
        <S.TabButton
          active={activeTab === '선택'}
          onPress={() => setActiveTab('선택')}>
          <Txt
            label="교양선택"
            color={activeTab === '선택' ? 'primaryBrand' : 'grey130'}
            typograph="bodyLarge"
          />
        </S.TabButton>
      </S.TabContainer>
      {activeTab === '필수' ? (
        <View>
          <S.ProgressBarWrapper>
            <S.TextWrapper>
              <Txt label="진행률 " color="grey190" typograph="titleLarge" />
              <Txt
                label={`${requirementCreditCurrent}/${requirementCreditTotal}`}
                color="grey90"
                typograph="bodyMedium"
              />
            </S.TextWrapper>
            <ProgressBar
              type="none"
              maxNum={requirementCreditTotal}
              currentCredit={requirementCreditCurrent}
            />
            {generalRequirementDetailCredit.some(
              item => item.courseRequirement > item.courseTotal,
            ) ? (
              <>
                <S.TextWrapper>
                  <Icon name="info" width={20} height={20} color="grey130" />
                  <Txt
                    label="아직 최소 학점을 채우지 못했어요"
                    color="grey130"
                    typograph="bodyMedium"
                  />
                </S.TextWrapper>
                <S.ButtonRowLayout>
                  {generalRequirementDetailCredit.map(
                    (item: GeneralEducationDetail, index: number) => {
                      if (item.courseTotal < item.courseRequirement) {
                        return (
                          <SubjectDetailButton
                            key={`${item.courseName} 교양필수`}
                            label={`${item.courseName}`}
                            type="elective"
                          />
                        );
                      } else {
                        return null;
                      }
                    },
                  )}
                </S.ButtonRowLayout>
              </>
            ) : (
              <S.TextWrapper>
                <Icon
                  name="check"
                  width={20}
                  height={20}
                  color="primaryBrand"
                />
                <Txt
                  label=" 교양 필수 학점을 모두 이수했어요"
                  color="primaryBrand"
                  typograph="bodyMedium"
                />
              </S.TextWrapper>
            )}
          </S.ProgressBarWrapper>
          <Txt label="세부 정보" color="grey190" typograph="titleLarge" />
          <Suspense fallback={<LoadingIndicator />}>
            <S.DetailInfoContainer>
              {generalEducationDetail.data
                ?.filter(item => item.courseType === 'Requirement')
                .map((item, index) => (
                  <View key={`${item.courseName} 교양필수`}>
                    <S.DetailInfoBox>
                      <Txt
                        label={item.courseName}
                        color="grey190"
                        typograph="bodyLarge"
                      />
                      <S.TextWrapper>
                        <Txt
                          label={`${item.courseTotal}`}
                          color="grey190"
                          typograph="titleLarge"
                        />
                        <Txt
                          label={`/${item.courseRequirement}`}
                          color="grey90"
                          typograph="titleLarge"
                        />
                      </S.TextWrapper>
                    </S.DetailInfoBox>
                    {index <
                      generalEducationDetail.data.filter(
                        item => item.courseType === 'Requirement',
                      ).length -
                        1 && <S.HorizontalDividerThin />}
                  </View>
                ))}
            </S.DetailInfoContainer>
          </Suspense>
        </View>
      ) : (
        <View>
          <S.ProgressBarWrapper>
            <S.TextWrapper>
              <Txt label="진행률 " color="grey190" typograph="titleLarge" />
              <Txt
                label={`${electiveCreditCurrent}/${
                  generalMaxCredit - requirementCreditTotal
                }`}
                color="grey90"
                typograph="bodyMedium"
              />
            </S.TextWrapper>
            <ProgressBar
              type="sub"
              maxNum={generalMaxCredit - requirementCreditTotal}
              currentCredit={electiveCreditCurrent}
              minGraduateCredit={generalMinCredit - requirementCreditTotal}
            />
            {generalElectiveDetailCredit.some(
              item => item.courseRequirement > item.courseTotal,
            ) ? (
              <>
                <S.TextWrapper>
                  <Icon name="info" width={20} height={20} color="grey130" />
                  <Txt
                    label=" 아직 최소 학점을 채우지 못했어요."
                    color="grey130"
                    typograph="bodyMedium"
                  />
                </S.TextWrapper>
                <S.ButtonRowLayout>
                  {generalElectiveDetailCredit.map(
                    (item: GeneralEducationDetail, index: number) => {
                      if (item.courseTotal < item.courseRequirement) {
                        return (
                          <SubjectDetailButton
                            key={`${item.courseName} 교양선택`}
                            label={`${item.courseName}`}
                            type="elective"
                          />
                        );
                      } else {
                        return null;
                      }
                    },
                  )}
                </S.ButtonRowLayout>
              </>
            ) : (
              <S.TextWrapper>
                <Icon
                  name="check"
                  width={20}
                  height={20}
                  color="primaryBrand"
                />
                <Txt
                  label="교양 선택 학점을 모두 이수했어요."
                  color="primaryBrand"
                  typograph="bodyMedium"
                />
              </S.TextWrapper>
            )}
          </S.ProgressBarWrapper>
          <Txt label="세부 정보" color="grey190" typograph="titleLarge" />
          <Suspense fallback={<LoadingIndicator />}>
            <S.DetailInfoContainer>
              {generalElectiveDetailCredit.map(
                (item: GeneralEducationDetail, index) => (
                  <View key={`${item.courseName} 교양`}>
                    <S.DetailInfoBox>
                      <Txt
                        label={item.courseName}
                        color="grey190"
                        typograph="bodyLarge"
                      />
                      <S.TextWrapper>
                        <Txt
                          label={`${item.courseTotal}`}
                          color="grey190"
                          typograph="titleLarge"
                        />
                        <Txt
                          label={`/${item.courseRequirement}`}
                          color="grey90"
                          typograph="titleLarge"
                        />
                      </S.TextWrapper>
                    </S.DetailInfoBox>
                    {index <
                      generalEducationDetail.data.filter(
                        item => item.courseType === 'Elective',
                      ).length -
                        1 && <S.HorizontalDividerThin />}
                  </View>
                ),
              )}
            </S.DetailInfoContainer>
          </Suspense>
        </View>
      )}
    </View>
  );
};

const DetailInformationComponent = ({
  type,
  requirementCreditCurrent,
  requirementCreditTotal,
  electiveCreditCurrent,
  electiveCreditTotal,
  creditData,
  generalEducationDetail,
  generalElectiveDetailCredit,
  generalRequirementDetailCredit,
  generalMaxCredit,
  generalMinCredit,
}: DetailInformationComponentProps) => {
  // Header
  switch (type) {
    case '전공':
    case '복수전공':
    case '부전공':
      return (
        <MainMajorDetailComponent
          type={type}
          requirementCreditCurrent={requirementCreditCurrent}
          requirementCreditTotal={requirementCreditTotal}
          creditData={creditData}
          electiveCreditCurrent={electiveCreditCurrent}
          electiveCreditTotal={electiveCreditTotal}
        />
      );
    // default 교양
    default: {
      return (
        <SubjectDetailComponent
          requirementCreditTotal={requirementCreditTotal}
          requirementCreditCurrent={requirementCreditCurrent}
          electiveCreditCurrent={electiveCreditCurrent}
          generalEducationDetail={generalEducationDetail}
          generalElectiveDetailCredit={generalElectiveDetailCredit}
          generalRequirementDetailCredit={generalRequirementDetailCredit}
          generalMaxCredit={generalMaxCredit}
          generalMinCredit={generalMinCredit}
        />
      );
    }
  }
};
const CreditDetailScreen = () => {
  const route =
    useRoute<
      RouteProp<GraduateCreditStackParamList, 'graduate_credit_detail'>
    >();
  const {Props: creditData, type} = route.params;
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const generalEducationDetail = useSuspenseQuery<SubjectCreditListRes>({
    queryKey: ['getNecessarySubjectCredit'],
    queryFn: () => CoreAPI.getNecessarySubjectCredit(),
  });

  const getDetailSubjectType = (
    type: string,
    creditData: ApiResponse,
  ): CreditDetail => {
    switch (type) {
      case '전공':
        return creditData.major;
      case '복수전공':
        return creditData.doubleMajor;
      case '부전공':
        return creditData.minor;
      // default 교양
      default:
        return creditData.generalEducation;
    }
  };
  // 전공 | 복전 | 부전 | 교양 type 따라 필수,선택 학점
  const detailSubjectType = getDetailSubjectType(type, creditData);

  // 전공, 복전, 부전 필수, 선택
  const requirementCreditTotal: number =
    detailSubjectType.requirement.total ?? 0;
  const requirementCreditCurrent: number =
    detailSubjectType.requirement.current ?? 0;
  // 교양 필수 선택
  const electiveCreditTotal: number = detailSubjectType.elective.total ?? 0;
  const electiveCreditCurrent: number = detailSubjectType.elective.current ?? 0;
  // 교양 최대 최소 학점
  const generalMaxCredit: number = creditData.generalEducation.minmax.max ?? 0;
  const generalMinCredit: number = creditData.generalEducation.minmax.min ?? 0;
  // 현재 타입에 의한 필수, 선택 과목 학점
  const totalCredit: number =
    type === '교양'
      ? generalMaxCredit ?? 0
      : requirementCreditTotal + electiveCreditTotal;
  const currentCredits: number =
    requirementCreditCurrent + electiveCreditCurrent;
  // 잔여 학점
  const remainingCredits =
    currentCredits >= totalCredit ? 0 : totalCredit - currentCredits;
  // 교양 선택 filter
  const generalElectiveDetailCredit: SubjectCreditListRes =
    generalEducationDetail.data?.filter(item => item.courseType === 'Elective');
  const generalRequirementDetailCredit: SubjectCreditListRes =
    generalEducationDetail.data?.filter(
      item => item.courseType === 'Requirement',
    );
  return (
    <ScrollView bounces={false}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label={type}
        onPressBackButton={() => navigation.goBack()}
      />
      <S.ScreenContainer>
        {type === '교양' ? (
          <S.HeaderContainer>
            <Txt
              label={`최대 ${totalCredit}, 최소 ${generalMinCredit}학점 중`}
              color="grey190"
              typograph="titleLarge"
            />
            <S.TextWrapper>
              <Txt
                label={`${currentCredits}학점`}
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
                label={`남은 수강 가능 학점: ${remainingCredits}학점`}
                color="grey130"
                typograph="bodyMedium"
              />
            </View>
          </S.HeaderContainer>
        ) : (
          // 교양 제외 전공
          <S.HeaderContainer>
            <Txt
              label={`${type} ${totalCredit}학점 중`}
              color="grey190"
              typograph="titleLarge"
            />
            <S.TextWrapper>
              <Txt
                label={`${currentCredits}학점`}
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
                label={`최소이수학점 충족까지: ${remainingCredits}학점`}
                color="grey130"
                typograph="bodyMedium"
              />
            </View>
          </S.HeaderContainer>
        )}
        {DetailInformationComponent({
          type,
          requirementCreditCurrent,
          requirementCreditTotal,
          electiveCreditCurrent,
          electiveCreditTotal,
          creditData,
          generalEducationDetail,
          generalElectiveDetailCredit,
          generalRequirementDetailCredit,
          generalMaxCredit,
          generalMinCredit,
        })}
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
    margin-top: 28px;
    margin-bottom: 10px;
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
    gap: 6px;
  `,
  VerticalDivider: styled.View`
    height: 60%;
    width: 1px;
    background-color: ${colors.primaryLight};
  `,
  HorizontalDivider: styled.View`
    align-self: stretch;
    width: 140%;
    margin-top: 14px;
    left: -40px;
    height: 8px;
    background-color: ${colors.grey20};
  `,
  TabContainer: styled.View`
    flex-direction: row;
    margin-bottom: 16px;
  `,
  TabButton: styled(TouchableOpacity)<{active: boolean}>`
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
    margin-bottom: 28px;
  `,
  DetailInfoContainer: styled.View`
    width: 100%;
    margin-top: 10px;
    padding: 16px;
    background-color: ${colors.grey10};
    border-radius: 8px;
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
    margin-top: 16px;
    margin-bottom: 16px;
  `,
  ButtonRowLayout: styled.View`
    display: flex;
    flex-direction: row;
    gap: 8px;
  `,
};
