import {useState} from 'react';
import {useAtom} from 'jotai';
import styled from '@emotion/native';
import {Button, Icon, colors} from '@uoslife/design-system';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnimatePress from '../../../../../components/animations/pressable_icon/AnimatePress';
import GuidePopup from '../../../../../components/molecules/common/GuidePopup/GuidePopup';
import useUserState from '../../../../../hooks/useUserState';
import {LibraryNavigationProp} from '../../../navigators/types/library';
import boxShadowStyle from '../../../../../styles/boxShadow';
import {libraryReservationAtom} from '../../../store';
import {MySeatScreenProps} from '../../screens/main_screen/MySeatScreen';

const LibrarySeatControl = ({
  redirectSeatList,
  openExtendSheet,
  openReturnSheet,
}: MySeatScreenProps) => {
  const {user} = useUserState();
  const navigation = useNavigation<LibraryNavigationProp>();

  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(false);
  const closeGuidePopup = () => {
    setIsGuidePopupOpen(false);
  };
  const [{data}] = useAtom(libraryReservationAtom);
  return (
    <View>
      {!user?.isVerified && (
        <View style={{gap: 12}}>
          <S.InformationWrapper>
            {isGuidePopupOpen && (
              <GuidePopup
                label="포털 계정을 연동하면 좌석을 발권할 수 있어요!"
                tail="RIGHT"
                onPress={closeGuidePopup}
                style={{...boxShadowStyle.bottomTapShadow, bottom: 40}}
                theme="SECONDARY"
              />
            )}
            <AnimatePress
              variant="scale_up_3"
              onPress={() => setIsGuidePopupOpen(prev => !prev)}>
              <S.IconWrapper style={{...boxShadowStyle.bottomTapShadow}}>
                <Icon color="grey190" name="info" width={24} height={24} />
              </S.IconWrapper>
            </AnimatePress>
          </S.InformationWrapper>
          <Button
            label="포털 계정 연동하기"
            isFullWidth
            isRounded
            onPress={() => navigation.navigate('library_portal_authentication')}
          />
        </View>
      )}
      {user?.isVerified && (
        <View style={{marginTop: 32}}>
          {data.reservationInfo ? (
            <View style={{gap: 12}}>
              <Button
                label="좌석 연장하기"
                isFullWidth
                isRounded
                onPress={openExtendSheet}
              />
              <Button
                label="좌석 반납하기"
                isFullWidth
                isRounded
                onPress={openReturnSheet}
              />
            </View>
          ) : (
            <View>
              <Button
                label="좌석 발권하기"
                isFullWidth
                isRounded
                onPress={redirectSeatList}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default LibrarySeatControl;

const S = {
  InformationWrapper: styled.View`
    align-items: flex-end;
    right: 20px;
  `,
  IconWrapper: styled.View`
    width: 40px;
    height: 40px;
    background: ${colors.secondaryBrand};
    border-radius: 100px;
    justify-content: center;
    align-items: center;
  `,
};
