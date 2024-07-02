import React, {Suspense, useEffect, useState} from 'react';
import {
  ScrollView,
  Pressable,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {useMutation, useQuery} from '@tanstack/react-query';
import Header from '../../../../../components/molecules/common/header/Header';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';
import BusinessLogic from '../../services/creditService';
import {GraduateCreditNavigationProp} from '../../navigators/types/graduateCredit';
import {CoreAPI} from '../../../../../api/services';
import {ApiResponse, ErrorResponseType} from '../../types';
import useUserState from '../../../../../hooks/useUserState';
import {GraduateCreditRes} from '../../../../../api/services/core/graduateCredit/graduateCreditAPI.type';
import {SUBJECT_BUTTON_LABEL} from '../../configs/constants';

const GraduateCreditScreen = () => {
  const navigation = useNavigation<GraduateCreditNavigationProp>();
  const inset = useSafeAreaInsets();
  const {user} = useUserState();
  const [graduateCreditData, setGraduateCreditData] =
    useState<GraduateCreditRes>();

  const LoadingIndicator = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={colors.primaryBrand} />
    </View>
  );
  const {
    data: generalCredit,
    isLoading,
    isError,
  } = useQuery<GraduateCreditRes>({
    queryKey: ['getGraduateCredit'],
    queryFn: () => CoreAPI.getAllGraduateCredit(),
  });

  const graduateCreditMutation = useMutation({
    mutationKey: ['setGraduateCredit'],
    mutationFn: () => CoreAPI.createGraduateCredit(),
    onSuccess: data => {
      setGraduateCreditData(data);
    },
    onError: (error: ErrorResponseType) => {
      // TODO: Error 처리 필요
      // 인증 정보 없을 때 처리
      console.error('post error: ', error);
    },
  });

  useEffect(() => {
    if (isError) {
      graduateCreditMutation.mutate();
    } else {
      setGraduateCreditData(generalCredit);
    }
  }, [generalCredit, graduateCreditData]);

  const parsedResponse = graduateCreditData
    ? new BusinessLogic(graduateCreditData)
    : null;

  if (isLoading || !graduateCreditData) {
    return <LoadingIndicator />;
  }
  return (
    <ScrollView bounces={false}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="이수 학점 확인하기"
        onPressBackButton={() => navigation.goBack()}
      />

      <S.GraduateCreditScreen>
        <SubjectDetailButton
          type="major"
          label={`${user?.identity.department}`}
        />
        <S.HeaderView>
          <Txt
            label={`${user?.name}님은 졸업까지`}
            color="grey190"
            typograph="titleMedium"
          />
          <S.FlexRowLayout>
            <Txt
              label={`${
                (graduateCreditData?.allCredit?.total ?? 0) -
                (graduateCreditData?.allCredit?.current ?? 0)
              }학점`}
              color="primaryBrand"
              typograph="headlineMedium"
            />
            <Txt label="남았어요." color="grey190" typograph="headlineMedium" />
          </S.FlexRowLayout>
          <Txt
            label={`${graduateCreditData?.allCredit?.current ?? 0}/${
              graduateCreditData?.allCredit?.total ?? 0
            }`}
            color="grey130"
            typograph="bodyMedium"
          />
        </S.HeaderView>
        <S.ProgressBarContainer>
          <ProgressBar
            type="main"
            maxNum={parseInt(`${graduateCreditData?.allCredit?.total ?? 0}`)}
            currentCredit={parseInt(
              `${graduateCreditData?.allCredit?.current ?? 0}`,
            )}
          />
          <S.ProgressBarLabels>
            <Txt label="0" color="grey60" typograph="labelMedium" />
            <Txt label="130" color="grey60" typograph="labelMedium" />
          </S.ProgressBarLabels>
        </S.ProgressBarContainer>
        <S.MinCreditView>
          <S.FlexRowLayout>
            {(graduateCreditData?.allCredit?.total ?? 0) >
            (graduateCreditData?.allCredit?.current ?? 0) ? (
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
              .map((field, index) => (
                <SubjectDetailButton
                  key={index}
                  label={`${field.label as keyof typeof SUBJECT_BUTTON_LABEL}`}
                  type="subject"
                  data={graduateCreditData}
                />
              ))}
          </S.FlexRowLayout>
        </S.MinCreditView>
        <S.HorizontalDividerThin />
        <S.DetailCreditTagContainer>
          {parsedResponse?.tags().map((tag, index) => (
            <S.DetailCreditTag key={index}>
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
  HeaderView: styled.View`
    margin-top: -8px;
    margin-bottom: 8px;
  `,
  MinCreditView: styled.View`
    display: flex;
    gap: 8px;
    margin: -12px 0px;
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
  `,
  ProgressBarContainer: styled.View`
    gap: 4px;
  `,
  HorizontalDividerThin: styled.View`
    margin: 20px 0px;
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
