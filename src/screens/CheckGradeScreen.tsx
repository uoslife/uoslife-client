import {useState, useCallback, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  RefreshControl,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Button, Icon, Txt, colors} from '@uoslife/design-system';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import CardLayout from '../components/molecules/common/cardLayout/CardLayout';
import useModal from '../hooks/useModal';
import useUserState from '../hooks/useUserState';
import {RootNavigationProps} from '../navigators/RootStackNavigator';
import {
  MygradeInfoType,
  MygradeCurrentAverageGradeType,
} from '../api/services/core/mygrade/mygradeAPI.type';
import {CoreAPI} from '../api/services';
import Skeleton from '../components/molecules/common/skeleton/Skeleton';
import Carousel from '../components/molecules/common/carousel/Carousel';
import {
  MYGRADE_ONBOARDING_1,
  MYGRADE_ONBOARDING_2,
  MYGRADE_ONBOARDING_3,
  MYGRADE_ONBOARDING_4,
} from '../assets/images';

const DEVICE_WIDTH = Dimensions.get('window').width;
const ACCURACY_LOW = 1;
const ACCURACY_MIDDLE = 2;
const ACCURACY_HIGH = 3;
const MYGRADE_ONBOARDING_IMAGE_WIDTH = DEVICE_WIDTH;
const MYGRADE_ONBOARDING_IMAGE_HEIGHT = 520;

type AccuracyWeightType =
  | typeof ACCURACY_LOW
  | typeof ACCURACY_MIDDLE
  | typeof ACCURACY_HIGH;

const getAccuracyWeight = (
  accuracy: MygradeInfoType['accuracy'],
): AccuracyWeightType => {
  if (accuracy < 30) return ACCURACY_LOW;
  if (accuracy > 70) return ACCURACY_HIGH;
  return ACCURACY_MIDDLE;
};
const getAccuracyColor = (accuracyWeight: AccuracyWeightType) => {
  switch (accuracyWeight) {
    case ACCURACY_HIGH:
      return colors.primaryBrand;
    case ACCURACY_MIDDLE:
      return colors.secondaryUi;
    case ACCURACY_LOW:
      return colors.red;
    default:
      return colors.primaryBrand;
  }
};

const CourseItem = ({mockData}: {mockData: MygradeInfoType}) => {
  const {courseName, grade, credit, registerCount, accuracy, isPublic} =
    mockData;
  const accuracyWeight = getAccuracyWeight(accuracy);
  const accuracyColor = getAccuracyColor(accuracyWeight);

  return (
    <S.CourseWrapper>
      <S.CourseTextWrapper>
        <Txt label={`${courseName}`} color="grey190" typograph="titleMedium" />
        <Txt label={`학점: ${credit}`} color="grey130" typograph="bodyMedium" />
      </S.CourseTextWrapper>
      {isPublic ? (
        <Txt label={`${grade}`} color="grey160" typograph="titleMedium" />
      ) : (
        <S.CourseRightWrapper>
          <S.PercentageBox accuracyColor={accuracyColor}>
            <Txt
              label={`${accuracy}%`}
              color="white"
              typograph="labelMedium"
              style={{
                fontWeight: `${Platform.OS === 'ios' ? 'bold' : 'normal'}`,
              }}
            />
          </S.PercentageBox>
          <Txt
            label={`${registerCount}명이 이 수업을 등록했어요.`}
            color="grey130"
            typograph="bodySmall"
          />
        </S.CourseRightWrapper>
      )}
    </S.CourseWrapper>
  );
};

const PortalUnauthorizedScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const handleNavigatePortalAuthenticate = async () => {
    return navigation.navigate('StudentId_PortalAuthentication');
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
          label="숨겨진 학점을 보려면 포털 연동을 해주세요!"
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

const MyGradeScreen = () => {
  const inset = useSafeAreaInsets();
  const [openModal, closeModal, Modal] = useModal('BOTTOM_SHEET');
  const {user} = useUserState();
  const {isVerified} = user || {};

  const [mygradeInfo, setMygradeInfo] = useState<MygradeInfoType[] | null>(
    null,
  );
  const [myCurrentAverage, setMyCurrentAverage] =
    useState<MygradeCurrentAverageGradeType | null>(null);
  const [isPending, setIsPending] = useState(false);
  const getMygradeInfo = async () => {
    try {
      const [mygrade, currentAverageGrade] = await Promise.all([
        await CoreAPI.getMygrade(),
        await CoreAPI.getMygradeCurrentAverageGrade(),
      ]);
      setMygradeInfo(mygrade);
      setMyCurrentAverage(currentAverageGrade);
    } catch (error) {
      // console.error(error);
    }
  };
  const getMygradeInfoWithPending = useCallback(async () => {
    setIsPending(true);
    await getMygradeInfo();
    setIsPending(false);
  }, []);

  useEffect(() => {
    getMygradeInfoWithPending();
  }, [getMygradeInfoWithPending]);

  // animation
  const [isVisibleRefreshInfoText, setIsVisibleRefreshInfoText] =
    useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const isFocused = useIsFocused();
  useEffect(() => {
    closeModal();
    if (isPending) return;
    setIsVisibleRefreshInfoText(true);
    Animated.sequence([
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1300,
            useNativeDriver: true,
          }),
          Animated.delay(200),
        ]),
        {iterations: 1},
      ),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1300,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) setIsVisibleRefreshInfoText(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeAnim, isFocused, isPending]);

  // refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsVisibleRefreshInfoText(false);
    setRefreshing(true);
    getMygradeInfo().then(() => setRefreshing(false));
  }, []);
  return (
    <>
      <S.ServiceInformationBox style={{paddingTop: inset.top + 16}}>
        <Txt
          label="나의 숨겨진 학점은?"
          color="primaryLighter"
          typograph="titleSmall"
        />
        <Txt
          label="시대생에서 숨겨진 학점을 확인하세요!"
          color="white"
          typograph="titleLarge"
        />
      </S.ServiceInformationBox>
      {isVerified ? (
        <S.MainContainer
          contentContainerStyle={{rowGap: 12}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="학점을 불러오는 중이에요."
              titleColor={colors.grey130}
            />
          }>
          {isPending ? (
            <S.PendingContainer>
              <Skeleton variant="card" />
              <Skeleton variant="card" />
            </S.PendingContainer>
          ) : (
            <>
              <Animated.View
                style={{
                  opacity: fadeAnim,
                }}>
                <Txt
                  label="끌어당겨 새로고침"
                  color="primaryBrand"
                  typograph="caption"
                  style={{
                    textAlign: 'center',
                    opacity: isVisibleRefreshInfoText ? 1 : 0,
                  }}
                />
              </Animated.View>
              <CardLayout>
                <S.CardLayoutContainer>
                  <Txt
                    label="수강 중인 강의"
                    color="black"
                    typograph="titleLarge"
                  />
                  <S.DescriptionButton>
                    <Button
                      label="설명보기"
                      size="small"
                      variant="text"
                      isFullWidth
                      onPress={openModal}
                    />
                  </S.DescriptionButton>
                  {!mygradeInfo && (
                    <Txt
                      label="공개된 성적이 없어 표시할 수 없어요."
                      color="grey130"
                      typograph="titleSmall"
                    />
                  )}
                  {mygradeInfo &&
                    mygradeInfo.map(item =>
                      item.isPublic ? (
                        <CourseItem key={item.courseName} mockData={item} />
                      ) : null,
                    )}
                  {mygradeInfo && <S.Divider />}
                  {mygradeInfo &&
                    mygradeInfo
                      .sort((a, b) => {
                        return b.accuracy - a.accuracy;
                      })
                      .map(item =>
                        !item.isPublic ? (
                          <CourseItem key={item.courseName} mockData={item} />
                        ) : null,
                      )}
                </S.CardLayoutContainer>
              </CardLayout>
              <CardLayout>
                <S.CardLayoutContainer>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Txt
                      label="현재 평점"
                      color="grey190"
                      typograph="titleLarge"
                    />
                    <Txt
                      label={
                        myCurrentAverage
                          ? `${myCurrentAverage.currentAverageGrade} / 4.5`
                          : '- '
                      }
                      color="grey160"
                      typograph="titleMedium"
                    />
                  </View>
                </S.CardLayoutContainer>
              </CardLayout>
              <CardLayout>
                <S.CardLayoutContainer>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Txt
                      label="공개된 전체 학점"
                      color="grey190"
                      typograph="titleLarge"
                    />
                    <Txt
                      label={
                        myCurrentAverage
                          ? `${
                              parseInt(myCurrentAverage.totalCredit) -
                              parseInt(myCurrentAverage.hiddenCredit)
                            }`
                          : '- '
                      }
                      color="grey160"
                      typograph="titleMedium"
                    />
                  </View>
                </S.CardLayoutContainer>
              </CardLayout>
              <CardLayout>
                <S.CardLayoutContainer>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Txt
                      label="숨겨진 전체 학점"
                      color="grey190"
                      typograph="titleLarge"
                    />
                    <Txt
                      label={
                        myCurrentAverage
                          ? `${myCurrentAverage.hiddenCredit}`
                          : '- '
                      }
                      color="grey160"
                      typograph="titleMedium"
                    />
                  </View>
                </S.CardLayoutContainer>
              </CardLayout>
            </>
          )}
          <S.MainContainerBottomSpacer />
        </S.MainContainer>
      ) : (
        <PortalUnauthorizedScreen />
      )}
      <Modal>
        <S.ModalContainer>
          <S.ModalClearButton onPress={closeModal}>
            <Icon name="clear" width={24} height={24} />
          </S.ModalClearButton>
          <View style={{width: MYGRADE_ONBOARDING_IMAGE_WIDTH}}>
            <Carousel
              imageWidth={MYGRADE_ONBOARDING_IMAGE_WIDTH}
              imageHeight={MYGRADE_ONBOARDING_IMAGE_HEIGHT}
              carouselData={[
                {uri: MYGRADE_ONBOARDING_1},
                {uri: MYGRADE_ONBOARDING_2},
                {uri: MYGRADE_ONBOARDING_3},
                {uri: MYGRADE_ONBOARDING_4},
              ]}
              indicator="BOTTOM"
              autoPlay={false}
            />
          </View>
        </S.ModalContainer>
      </Modal>
    </>
  );
};

export default MyGradeScreen;

const S = {
  ServiceInformationBox: styled.View`
    padding: 0 16px;
    padding-bottom: 24px;
    align-items: center;
    border-radius: 0 0 18px 18px;
    gap: 6px;
    background-color: ${colors.primaryBrand};
    justify-content: flex-end;
    height: 164px;
  `,
  MainContainer: styled.ScrollView`
    flex: 1;
    flex-direction: column;
    padding: 6px 16px;
  `,
  MainContainerBottomSpacer: styled.View`
    height: 120px;
  `,
  CardLayoutContainer: styled.View`
    padding: 20px 18px;
    gap: 22px;
  `,
  CourseWrapper: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  CourseTextWrapper: styled.View``,
  CourseRightWrapper: styled.View`
    gap: 1px;
  `,
  PercentageBox: styled.View<{accuracyColor: string}>`
    margin-left: auto;
    padding: 1px 10px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: ${({accuracyColor}) => accuracyColor};
    align-self: center;
  `,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
  DescriptionButton: styled.Pressable`
    position: absolute;
    top: 17px;
    right: 8px;
    align-items: flex-end;
  `,
  PortalUnauthorizedScreenContainer: styled.View`
    padding: 24px 20px 150px;
    flex: 1;
    gap: 30px;
    justify-content: center;
  `,
  PendingContainer: styled.View`
    padding-top: 29px;
    gap: 12px;
  `,
  ModalContainer: styled.View`
    padding: 32px 0 128px;
  `,
  ModalClearButton: styled.TouchableOpacity`
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 6px;
  `,
};
