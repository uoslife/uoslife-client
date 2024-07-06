import {useState, useEffect, useRef} from 'react';
import {Animated, Dimensions, RefreshControl, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Button, Icon, Txt, colors} from '@uoslife/design-system';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSuspenseQuery} from '@tanstack/react-query';
import {
  MYGRADE_ONBOARDING_1,
  MYGRADE_ONBOARDING_2,
  MYGRADE_ONBOARDING_3,
  MYGRADE_ONBOARDING_4,
} from '../../../assets/images';
import CardLayout from '../../../components/molecules/common/cardLayout/CardLayout';
import Carousel from '../../../components/molecules/common/carousel/Carousel';
import useModal from '../../../hooks/useModal';
import useUserState from '../../../hooks/useUserState';
import Header from '../../../components/molecules/common/header/Header';
import Skeleton from '../../../components/molecules/common/skeleton/Skeleton';
import PortalUnauthorizedScreen from './components/screens/PortalUnauthorizedScreen';
import CourseItem from './components/molecules/CourseItem';
import {HiddenGradeService} from './services';
import usePullToRefresh from '../../../hooks/usePullToRefresh';
import boxShadowStyle from '../../../styles/boxShadow';
import HiddenGradeGuidePopup from './components/molecules/HiddenGradeGuidePopup';
import storage from '../../../storage';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MYGRADE_ONBOARDING_IMAGE_WIDTH = DEVICE_WIDTH;
const MYGRADE_ONBOARDING_IMAGE_HEIGHT = 520;

const HiddenGradeScreen = () => {
  const inset = useSafeAreaInsets();
  const [openModal, closeModal, Modal] = useModal('BOTTOM_SHEET');
  const {user} = useUserState();
  const {isVerified} = user || {};
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const isFirstAccess = useRef(true);
  const {data, isPending, refetch} = useSuspenseQuery({
    queryKey: ['updateHiddenGrade', isFirstAccess],
    queryFn: () => HiddenGradeService.getHiddenGrade(isFirstAccess.current),
  });

  useEffect(() => {
    isFirstAccess.current = false;
  }, []);

  const {onRefresh, refreshing} = usePullToRefresh(() => refetch());

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

  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(
    !storage.getBoolean('isNotHiddenGradeGuidePopupOpen'),
  );
  const closeGuidePopup = () => {
    setIsGuidePopupOpen(false);
    storage.set('isNotHiddenGradeGuidePopupOpen', true);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="숨은 학점 확인하기"
        onPressBackButton={() => navigation.goBack()}
      />
      <S.ServiceInformationBox>
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
                  {!data && (
                    <Txt
                      label="공개된 성적이 없어 표시할 수 없어요."
                      color="grey130"
                      typograph="titleSmall"
                    />
                  )}
                  {data &&
                    data.courses.map(item =>
                      item.isPublic ? (
                        <CourseItem
                          key={item.id}
                          data={item}
                          refetch={refetch}
                        />
                      ) : null,
                    )}
                  {data?.courses && <S.Divider />}
                  {data && isGuidePopupOpen && (
                    <HiddenGradeGuidePopup
                      label="클릭해서 성적 입력 여부를 투표할 수 있어요!"
                      onPress={closeGuidePopup}
                      style={{...boxShadowStyle.bottomTapShadow}}
                    />
                  )}
                  {data?.courses &&
                    data.courses
                      .sort((a, b) => {
                        return b.id - a.id;
                      })
                      .sort((a, b) => {
                        return b.accuracy - a.accuracy;
                      })
                      .map(item =>
                        !item.isPublic ? (
                          <CourseItem
                            key={item.id}
                            data={item}
                            refetch={refetch}
                          />
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
                        data?.hiddenGradeSummary.averageGrade
                          ? `${data?.hiddenGradeSummary.averageGrade} / 4.5`
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
                        data?.hiddenGradeSummary.openCredit
                          ? `${data.hiddenGradeSummary.openCredit}`
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
                        data?.hiddenGradeSummary.hiddenCredit
                          ? `${data?.hiddenGradeSummary.hiddenCredit}`
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
                      label="이번 학기 수강 학점"
                      color="grey190"
                      typograph="titleLarge"
                    />
                    <Txt
                      label={
                        data?.hiddenGradeSummary.semesterCredit
                          ? `${data?.hiddenGradeSummary.semesterCredit}`
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
          <S.MainContainerBottomSpacer style={{height: insets.bottom + 12}} />
        </S.MainContainer>
      ) : (
        <PortalUnauthorizedScreen />
      )}
      <Modal>
        <View style={{paddingTop: 32, paddingBottom: insets.bottom}}>
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
        </View>
      </Modal>
    </View>
  );
};

export default HiddenGradeScreen;

const S = {
  ServiceInformationBox: styled.View`
    margin: 0 8px;
    padding: 24px;
    align-items: center;
    border-radius: 28px;
    gap: 6px;
    background-color: ${colors.primaryBrand};
    justify-content: center;
  `,
  MainContainer: styled.ScrollView`
    flex-direction: column;
    padding: 6px 16px;
  `,
  MainContainerBottomSpacer: styled.View``,
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

  PendingContainer: styled.View`
    padding-top: 29px;
    gap: 12px;
  `,
  ModalContainer: styled.View`
    padding-top: 32px;
  `,
  ModalClearButton: styled.TouchableOpacity`
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 6px;
  `,
};
