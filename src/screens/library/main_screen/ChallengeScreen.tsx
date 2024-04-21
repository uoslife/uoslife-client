import styled, {css} from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {RefreshControl} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import LibraryChallengeBoard from '../../../components/molecules/screens/library/LibraryChallengeBoard';
import {
  ChallengeUserStatusDesEnum,
  ChallengeUserStatusEnum,
  ChallengeUserStatusType,
} from '../../../configs/utility/libraryChallenge/challengeUserStatus';
import {UtilAPI} from '../../../api/services';
import usePullToRefresh from '../../../hooks/usePullToRefresh';

export const ChallengUserStatusImgEnum: {
  [key in ChallengeUserStatusType]: any;
} = {
  EGG: require('../../../assets/images/iroomae_egg.png'),
  BABY: require('../../../assets/images/iroomae_baby.png'),
  CHICK: require('../../../assets/images/iroomae_chick.png'),
  JUNGDO: require('../../../assets/images/iroomae_jungdo.png'),
  CHEONJAE: require('../../../assets/images/iroomae_cheonjae.png'),
  MANJAE: require('../../../assets/images/iroomae_manjae.png'),
};

const ChallengeScreen = () => {
  const {data: challengeData, refetch} = useQuery({
    queryKey: ['getChallengeData', 'MONTH', 'UOSLIFE'],
    queryFn: () =>
      UtilAPI.getMyLibraryRanking({
        duration: 'MONTH',
        major: 'UOSLIFE',
      }),
  });

  const {refreshing, onRefresh} = usePullToRefresh(refetch);

  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeUserStatusType>('EGG');

  useEffect(() => {
    if (challengeData?.time != null) {
      const {time} = challengeData;
      if (time < 10) setChallengeStatus('EGG');
      else if (time >= 10 && time < 20) setChallengeStatus('BABY');
      else if (time >= 20 && time < 30) setChallengeStatus('CHICK');
      else if (time >= 30 && time < 50) setChallengeStatus('JUNGDO');
      else if (time >= 50 && time < 100) setChallengeStatus('CHEONJAE');
      else if (time >= 100) setChallengeStatus('MANJAE');
    }
  }, [challengeData]);

  return (
    <S.Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <S.CharacterBox>
        <S.ImageContainer source={ChallengUserStatusImgEnum[challengeStatus]} />
        <S.TextBox>
          <Txt
            label={ChallengeUserStatusEnum[challengeStatus]}
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
              label={`${challengeData?.time ?? 0}시간 달성!`}
              color="primaryBrand"
              typograph="titleSmall"
            />
            <Txt
              label={ChallengeUserStatusDesEnum[challengeStatus]}
              color="grey190"
              typograph="bodyMedium"
            />
          </View>
        </S.TextBox>
      </S.CharacterBox>
      <LibraryChallengeBoard status={challengeStatus} />
    </S.Container>
  );
};

export default ChallengeScreen;

const S = {
  Container: styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: #f7faff;
    padding-left: 28px;
    padding-right: 28px;
    padding-top: 20px;
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
};
