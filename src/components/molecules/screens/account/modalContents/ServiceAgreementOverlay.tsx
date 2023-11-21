import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import {RootNavigationProps} from '../../../../../navigators/RootStackNavigator';

import BottomSheetCheckItem from '../../../overlays/items/BottomSheetCheckItem';

type OverlayType = 'CHECK_ALL' | 'REQUIRED' | 'OPTIONAL';
type OverlayStatus = {id: number; type: OverlayType; checked: boolean};
type OverlayStatusArray = Array<OverlayStatus>;

const initOverlayStatus: OverlayStatusArray = [
  {id: 0, type: 'CHECK_ALL', checked: false},
  {id: 1, type: 'REQUIRED', checked: false},
  {id: 2, type: 'REQUIRED', checked: false},
  {id: 3, type: 'OPTIONAL', checked: false},
];

type Props = {
  handleClickSubmitBottomSheetButton: (isAdvertismentAgree: boolean) => void;
};

const ServiceAgreementOverlay = ({
  handleClickSubmitBottomSheetButton,
}: Props) => {
  const insets = useSafeAreaInsets();
  const [overlayStatus, setStatus] =
    useState<OverlayStatusArray>(initOverlayStatus);
  const navigation = useNavigation<RootNavigationProps>();

  const getCheckedStatusById = (id: OverlayStatus['id']) =>
    overlayStatus.find(item => item.id === id)!.checked;
  const areAllStatusChecked = () => {
    const requiredStatus = overlayStatus.filter(
      obj => obj.type === 'REQUIRED' || obj.type === 'OPTIONAL',
    );
    return requiredStatus.every(obj => obj.checked);
  };

  const handleClickCheckAllItem = () => {
    const firstItemCheckedStatus = getCheckedStatusById(0);
    setStatus(prev => {
      return prev.map(item => {
        return {...item, checked: !firstItemCheckedStatus};
      });
    });
  };

  const handleClickCheckItem = (id: OverlayStatus['id']) => {
    setStatus(prev => {
      return prev.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      );
    });
  };

  useEffect(() => {
    const isAllRequireChecked = areAllStatusChecked();
    if (isAllRequireChecked)
      setStatus(prev => {
        return prev.map(item =>
          item.id === 0 ? {...item, checked: true} : item,
        );
      });
  }, [getCheckedStatusById(1), getCheckedStatusById(2)]);

  return (
    <S.Container style={{paddingBottom: insets.bottom}}>
      <BottomSheetCheckItem
        checked={getCheckedStatusById(0)}
        title="약관에 모두 동의"
        onToggle={handleClickCheckAllItem}
      />
      <BottomSheetCheckItem
        checked={getCheckedStatusById(1)}
        title="[필수] 개인정보처리방침"
        onToggle={() => handleClickCheckItem(1)}
        onPressForward={() => navigation.navigate('Account_ToSandPolicies')}
      />
      <BottomSheetCheckItem
        checked={getCheckedStatusById(2)}
        title="[필수] 시대생 이용약관"
        onToggle={() => handleClickCheckItem(2)}
        onPressForward={() => navigation.navigate('Account_privacyPolicies')}
      />
      <BottomSheetCheckItem
        checked={getCheckedStatusById(3)}
        title="[선택] 광고 및 마케팅 수신동의 알림"
        supportingText={`각종 시대생 소식 및 이벤트에 대한 정보를\n제공합니다.`}
        onToggle={() => handleClickCheckItem(3)}
      />
      <Button
        label="확인"
        isFullWidth
        isEnabled={areAllStatusChecked()}
        onPress={() =>
          handleClickSubmitBottomSheetButton(getCheckedStatusById(3))
        }
      />
    </S.Container>
  );
};

export default ServiceAgreementOverlay;

const S = {
  Container: styled.View`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};
