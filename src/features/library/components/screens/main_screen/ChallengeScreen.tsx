import styled, {css} from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {RefreshControl} from 'react-native-gesture-handler';
import {useEffect, useMemo, useState} from 'react';
import {
  ChallengeUserStatusDesEnum,
  ChallengeUserStatusEnum,
  ChallengeUserStatusType,
} from '../../../constants/libraryChallenge/challengeUserStatus';
import usePullToRefresh from '../../../../../hooks/usePullToRefresh';
import {changeHourFromMin} from '../../../utils/libraryRanking';
import GuidePopup from '../../../../../components/molecules/common/GuidePopup/GuidePopup';
import boxShadowStyle from '../../../../../styles/boxShadow';
import useUserState from '../../../../../hooks/useUserState';
import customShowToast from '../../../../../configs/toast';
import UtilityService from '../../../../../services/utility';
import LibraryChallengeBoard from '../../molecules/LibraryChallengeBoard';

export const ChallengUserStatusImgEnum: {
  [key in ChallengeUserStatusType]: any;
} = {
  EGG: require('../../../../../assets/images/iroomae_egg.png'),
  BABY: require('../../../../../assets/images/iroomae_baby.png'),
  CHICK: require('../../../../../assets/images/iroomae_chick.png'),
  JUNGDO: require('../../../../../assets/images/iroomae_jungdo.png'),
  CHEONJAE: require('../../../../../assets/images/iroomae_cheonjae.png'),
  MANJAE: require('../../../../../assets/images/iroomae_manjae.png'),
};

const ChallengeScreen = () => {
  const {user} = useUserState();
  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(false);

  const isGraduateUser = useMemo(
    () => user?.identity.type === '졸업생',
    [user?.identity.type],
  );

  const closeGuidePopup = () => {
    setIsGuidePopupOpen(false);
  };

  const {data: challengeData, refetch} = useQuery({
    queryKey: ['getChallengeData', 'MONTH', '시대생'],
    queryFn: () =>
      UtilityService.getMyLibraryRanking({
        duration: 'MONTH',
        major: '시대생',
      }),
  });

  const {refreshing, onRefresh} = usePullToRefresh(refetch);

  const [challengeStatus, setChallengeStatus] = useState<{
    max: ChallengeUserStatusType;
    current: ChallengeUserStatusType;
  }>({max: 'EGG', current: 'EGG'});

  useEffect(() => {
    if (isGraduateUser) customShowToast('libraryChallengeGraduateUserInfo');

    if (challengeData?.time != null) {
      const timeInHours = challengeData.time / 60;
      if (timeInHours < 10) setChallengeStatus({max: 'EGG', current: 'EGG'});
      else if (timeInHours >= 10 && timeInHours < 20)
        setChallengeStatus({max: 'BABY', current: 'BABY'});
      else if (timeInHours >= 20 && timeInHours < 30)
        setChallengeStatus({max: 'CHICK', current: 'CHICK'});
      else if (timeInHours >= 30 && timeInHours < 50)
        setChallengeStatus({max: 'JUNGDO', current: 'JUNGDO'});
      else if (timeInHours >= 50 && timeInHours < 100)
        setChallengeStatus({max: 'CHEONJAE', current: 'CHEONJAE'});
      else if (timeInHours >= 100)
        setChallengeStatus({max: 'MANJAE', current: 'MANJAE'});
    }
  }, [challengeData, isGraduateUser]);

  useEffect(() => {
    if (challengeStatus.max === 'EGG') {
      setIsGuidePopupOpen(true);
    }
  }, [challengeStatus]);

  return (
    <S.Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <S.CharacterBox>
        <S.ImageContainer
          source={ChallengUserStatusImgEnum[challengeStatus.current]}
        />
        {isGuidePopupOpen && (
          <GuidePopup
            label="도서관 누적 이용시간이 늘어날수록 루매가 성장해요."
            tail="CENTER"
            onPress={closeGuidePopup}
            style={css`
              position: absolute;
              top: 0px;
              bottom: 40px;
              ${boxShadowStyle.bottomTapShadow};
            `}
            theme="SECONDARY"
          />
        )}
        <S.TextBox>
          <Txt
            label={ChallengeUserStatusEnum[challengeStatus.current]}
            color="grey190"
            typograph="headlineMedium"
          />
          <View
            style={css`
              display: flex;
              align-items: center;
              gap: 4px;
            `}>
            <Txt
              label={ChallengeUserStatusDesEnum[challengeStatus.current]}
              color="grey190"
              typograph="bodyMedium"
            />
          </View>
        </S.TextBox>
      </S.CharacterBox>

      <S.CardContainer style={{...boxShadowStyle.LibraryShadow}}>
        <S.CardLeftWrapper>
          <Icon name="alarm" width={20} height={20} />
          <Txt label="이번달 이용시간" color="grey90" typograph="titleSmall" />
        </S.CardLeftWrapper>

        <Txt
          label={`${changeHourFromMin(challengeData?.time ?? 0)}`}
          color="primaryBrand"
          typograph="headlineMedium"
        />
      </S.CardContainer>

      <LibraryChallengeBoard
        status={challengeStatus}
        setChallengeStatus={setChallengeStatus}
      />
    </S.Container>
  );
};

export default ChallengeScreen;

const S = {
  Container: styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: #f7faff;
    padding: 20px 28px;
  `,
  CharacterBox: styled.View`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  `,
  TextBox: styled.View`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  ImageContainer: styled.Image`
    width: 200px;
    height: 200px;
  `,
  CardContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 16px;
    border-radius: 20px;
    background: ${colors.white};
    margin-bottom: 20px;
  `,
  CardLeftWrapper: styled.View`
    gap: 4px;
    flex-direction: row;
  `,
};
