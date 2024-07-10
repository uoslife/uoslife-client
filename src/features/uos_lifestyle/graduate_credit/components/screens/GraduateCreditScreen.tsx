import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Txt, Icon, colors, Button} from '@uoslife/design-system';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Header from '../../../../../components/molecules/common/header/Header';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';
import BusinessLogic from '../../services/creditService';
import {GraduateCreditNavigationProp} from '../../navigators/types/graduateCredit';
import {CoreAPI} from '../../../../../api/services';
import {ApiResponse} from '../../types';
import useUserState from '../../../../../hooks/useUserState';
import {GraduateCreditRes} from '../../../../../api/services/core/graduateCredit/graduateCreditAPI.type';
import {SUBJECT_BUTTON_LABEL} from '../../configs/constants';
import {RootNavigationProps} from '../../../../../navigators/types/rootStack';
import AnimatedScrollRefreshComponent from '../AnimatedScrollRefresh';
import LoadingIndicator from '../LoadingIndicator';

const PortalUnauthorizedComponent = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const handleNavigatePortalAuthenticate = async () => {
    return navigation.navigate('student_id_portal_authentication');
  };

  return (
    <S.PortalUnauthorizedScreenContainer>
      <View style={{alignItems: 'center', gap: 6}}>
        <Txt
          label="포털계정이 연동되어 있지 않아요."
          color="grey190"
          typograph="headlineMedium"
        />
        <Txt
          label="이수 학점을 보려면 포털 연동을 해주세요!"
          color="grey130"
          typograph="titleSmall"
        />
      </View>
      <Button
        label="포털 계정 연동하기"
        isFullWidth
        onPress={handleNavigatePortalAuthenticate}
      />
    </S.PortalUnauthorizedScreenContainer>
  );
};

const GraduateCreditScreen = () => {
  const navigation = useNavigation<GraduateCreditNavigationProp>();
  const inset = useSafeAreaInsets();
  const {user} = useUserState();
  const [graduateCreditData, setGraduateCreditData] =
    useState<GraduateCreditRes>();

  const totalCredit = graduateCreditData?.allCredit.total ?? 0;
  const currentCredit = graduateCreditData?.allCredit.current ?? 0;

  const {isPending: isPendingForGetCredit, isError: isErrorForGetCredit} =
    useQuery<GraduateCreditRes>({
      queryKey: ['getGraduateCredit'],
      queryFn: async () => {
        const data = await CoreAPI.getAllGraduateCredit();
        setGraduateCreditData(data);
        return data;
      },
    });

  const {
    isSuccess: isSuccessForCreateCredit,
    isPending: isPendingForCreateCredit,
    mutate: mutateGraduateCredit,
  } = useMutation({
    mutationKey: ['setGraduateCredit'],
    mutationFn: () => CoreAPI.createGraduateCredit(),
    onSuccess: data => {
      setGraduateCreditData(data);
    },
  });

  useEffect(() => {
    // 포탈 미인증
    if (!user?.isVerified) return;
    // 졸업 이수학점 post 요청
    if (isErrorForGetCredit && !isSuccessForCreateCredit) {
      mutateGraduateCredit();
    }
  }, [isSuccessForCreateCredit, isErrorForGetCredit]);

  // 변경
  const parsedResponse =
    graduateCreditData && new BusinessLogic(graduateCreditData);

  // 포탈 미인증 시, 선언적 페이지 처리
  if (!user?.isVerified) {
    return <PortalUnauthorizedComponent />;
  }

  // 이수학점 생성 로딩 페이지 -> 생성된 학점 받아오는중 | 생성된 학점 받기 실패 && 학점 생성하는중
  if (isPendingForGetCredit || isPendingForCreateCredit) {
    return <LoadingIndicator />;
  }

  // 이수학점 페이지 랜더링
  return (
    <View style={{flex: 1}}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="이수 학점 확인하기"
        onPressBackButton={() => navigation.goBack()}
      />
      <AnimatedScrollRefreshComponent onScroll={mutateGraduateCredit}>
        <S.GraduateCreditContentContainer>
          <SubjectDetailButton
            type="major"
            label={`${user?.identity.department}`}
          />
          <S.Description>
            <Txt
              label={`${user?.name}님은 졸업까지`}
              color="grey190"
              typograph="titleMedium"
            />
            <S.FlexRowLayout>
              <Txt
                label={`${totalCredit - currentCredit}학점`}
                color="primaryBrand"
                typograph="headlineMedium"
              />
              <Txt
                label="남았어요."
                color="grey190"
                typograph="headlineMedium"
              />
            </S.FlexRowLayout>
            <Txt
              label={`${currentCredit}/${totalCredit}`}
              color="grey130"
              typograph="bodyMedium"
            />
          </S.Description>
          <S.ProgressBarContainer>
            <ProgressBar
              type="main"
              maxNum={parseInt(`${totalCredit}`)}
              currentCredit={parseInt(`${currentCredit}`)}
            />
            <S.ProgressBarLabels>
              <Txt label="0" color="grey60" typograph="labelMedium" />
              <Txt label="130" color="grey60" typograph="labelMedium" />
            </S.ProgressBarLabels>
          </S.ProgressBarContainer>
          <S.MinCreditView>
            <S.FlexRowLayout>
              {totalCredit > currentCredit ? (
                <>
                  <Icon color="grey130" name="info" width={20} height={20} />
                  <Txt
                    label="아직 최소 학점을 채우지 못했어요"
                    color="grey130"
                    typograph="bodyMedium"
                  />
                </>
              ) : (
                <>
                  <Icon
                    color="primaryBrand"
                    name="check"
                    width={20}
                    height={20}
                  />
                  <Txt
                    label="졸업 학점을 모두 이수했어요"
                    color="primaryBrand"
                    typograph="bodyMedium"
                  />
                </>
              )}
            </S.FlexRowLayout>
            <S.FlexRowLayout>
              {parsedResponse
                ?.getRemainingSubect()
                .map(field => (
                  <SubjectDetailButton
                    key={`${field.label} 미이수학점`}
                    label={`${
                      field.label as keyof typeof SUBJECT_BUTTON_LABEL
                    }`}
                    type="subject"
                    data={graduateCreditData}
                  />
                ))}
            </S.FlexRowLayout>
          </S.MinCreditView>
          <S.HorizontalDividerThin />
          <S.DetailCreditTagContainer>
            {parsedResponse?.tags().map(tag => (
              <S.DetailCreditTag key={`${tag.label} 세부이수학점`}>
                {tag.total !== 0 ? (
                  <S.TagWrapper>
                    <S.TagHeader>
                      <Txt
                        label={tag.label}
                        color="black"
                        typograph="titleMedium"
                      />
                      <Pressable
                        onPress={() =>
                          navigation.navigate('graduate_credit_detail', {
                            Props: graduateCreditData as ApiResponse,
                            type: tag.label,
                          })
                        }>
                        <Icon
                          name="forwardArrow"
                          color="grey90"
                          width={25}
                          height={25}
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
                  <S.TagWrapper>
                    <S.TagHeader>
                      <Txt
                        label={tag.label}
                        color="grey40"
                        typograph="titleMedium"
                      />
                      <Icon
                        name="forwardArrow"
                        color="grey40"
                        width={25}
                        height={25}
                      />
                    </S.TagHeader>
                  </S.TagWrapper>
                )}
              </S.DetailCreditTag>
            ))}
          </S.DetailCreditTagContainer>
        </S.GraduateCreditContentContainer>
      </AnimatedScrollRefreshComponent>
    </View>
  );
};

export default GraduateCreditScreen;

const S = {
  PortalUnauthorizedScreenContainer: styled.View`
    padding: 24px 20px 150px;
    flex: 1;
    gap: 30px;
    justify-content: center;
  `,
  GraduateCreditContentContainer: styled.View`
    gap: 24px;
    flex: 1;
  `,
  Description: styled.View`
    margin-top: -8px;
    margin-bottom: 8px;
  `,
  MinCreditView: styled.View`
    display: flex;
    gap: 8px;
    margin: -12px 0;
  `,
  DetailCreditTagContainer: styled.View`
    margin-top: -12px;
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
    border: 1px solid;
    border-color: ${({status}) =>
      status ? colors.primaryBrand : colors.grey60};
    align-items: center;
  `,
  StatusButtonText: styled.Text<{status: boolean}>`
    color: ${({status}) => (status ? colors.primaryBrand : colors.grey60)};
    font-family: 'Pretendard';
    font-size: 12px;
    font-weight: 600;
  `,
  FlexRowLayout: styled.View`
    display: flex;
    gap: 4px;
    flex-direction: row;
  `,
  ProgressBarContainer: styled.View`
    gap: 4px;
  `,
  HorizontalDividerThin: styled.View`
    margin: 20px 0;
    align-self: stretch;
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
  ProgressBarLabels: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  `,
};
