import {ScrollView, Pressable, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {css} from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {useMutation, useQuery} from '@tanstack/react-query';
import Header from '../../../../../components/molecules/common/header/Header';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';
import BusinessLogic from '../../services/creditService';
import {GraduateCreditNavigationProp} from '../../navigators/types/graduateCredit';
import {CoreAPI} from '../../../../../api/services';
import {useState} from 'react';
import {ApiResponse} from '../../types';
import useUserState from '../../../../../hooks/useUserState';

const GraduateCreditScreen = () => {
  const navigation = useNavigation<GraduateCreditNavigationProp>();
  const inset = useSafeAreaInsets();
  const {user} = useUserState();
  const [data, setData] = useState<ApiResponse | null>(null);

  const graduateCreditMutation = useMutation({
    mutationKey: ['GraduateCredit'],
    mutationFn: () => CoreAPI.createGraduateCredit(),
    onSuccess: data => {
      setData(data);
    },
  });

  const {data: graduateData, isError} = useQuery({
    queryKey: ['GraduateCredit'],
    queryFn: () => CoreAPI.updateGraduateCredit(),
  });
  if (isError || !graduateData) {
    setTimeout(() => {
      graduateCreditMutation.mutate();
    }, 1000);
    return (
      <View>
        <Txt label="Loading" color="black" typograph="headlineLarge" />
      </View>
    );
  }
  if (!data) {
    setData(graduateData);
  }

  const apiData = data ? new BusinessLogic(data as ApiResponse) : null;

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
                (data?.allCredit?.total ?? 0) - (data?.allCredit?.current ?? 0)
              }학점`}
              color="primaryBrand"
              typograph="headlineMedium"
            />
            <Txt label="남았어요." color="grey190" typograph="headlineMedium" />
          </S.FlexRowLayout>
          <Txt
            label={`${data?.allCredit?.current ?? 0}/${
              data?.allCredit?.total ?? 0
            }`}
            color="grey130"
            typograph="bodyMedium"
          />
        </S.HeaderView>
        <S.ProgressBarContainer>
          <ProgressBar
            type="main"
            maxNum={parseInt(`${data?.allCredit?.total ?? 0}`)}
            currentCredit={parseInt(`${data?.allCredit?.current ?? 0}`)}
          />
          <S.ProgressBarLabels>
            <Txt label="0" color="grey60" typograph="labelMedium" />
            <Txt label="130" color="grey60" typograph="labelMedium" />
          </S.ProgressBarLabels>
        </S.ProgressBarContainer>
        <S.MinCreditView>
          <S.FlexRowLayout>
            {(data?.allCredit?.total ?? 0) > (data?.allCredit?.current ?? 0) ? (
              <>
                <Icon color="grey130" name="info" width={20} height={20} />
                <Txt
                  label="아직 최소 학점을 채우지 못했어요"
                  color="grey130"
                  typograph="bodyMedium"
                />
              </>
            ) : null}
          </S.FlexRowLayout>
          <S.FlexRowLayout>
            {apiData
              ?.getFieldsWithIncompleteCredits()
              .map((field, index) => (
                <SubjectDetailButton
                  key={index}
                  label={`${field.label}`}
                  type="subject"
                />
              ))}
          </S.FlexRowLayout>
        </S.MinCreditView>
        <S.HorizontalDividerThin />
        <S.DetailCreditTagContainer>
          {apiData?.tags().map((tag, index) => (
            <S.DetailCreditTag key={index}>
              {tag.total !== 0 ? (
                <S.TagWrapper>
                  <S.TagHeader>
                    <Txt
                      label={tag.label}
                      color="black"
                      typograph="titleSmall"
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate('graduateCredit_detail', {
                          Props: data as ApiResponse,
                        })
                      }>
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
