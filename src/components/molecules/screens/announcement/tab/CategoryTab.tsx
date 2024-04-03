import React from 'react';
import {useAtom} from 'jotai';
import styled from '@emotion/native';

import TabButton from './TabButton';
import {
  AnnouncementOriginEnum,
  AnnouncementOriginNameType,
  AnnouncementOrigins,
} from '../../../../../configs/announcement';
import announcementCurrentOriginAtom from '../../../../../store/announcement/announcementCurrentOrigin';

type Props = {
  tabPressAdditionalAction?: (origin: AnnouncementOriginNameType) => void;
};

const CategoryTab = ({tabPressAdditionalAction}: Props) => {
  const [currentOrigin, setCurrentOrigin] = useAtom(
    announcementCurrentOriginAtom,
  );

  const handlePressTab = (origin: AnnouncementOriginNameType) => {
    setCurrentOrigin(origin);
    tabPressAdditionalAction?.(origin);
  };

  return (
    <S.Container>
      {AnnouncementOrigins.map(origin => (
        <TabButton
          key={origin}
          label={AnnouncementOriginEnum[origin]}
          isSelected={origin === currentOrigin}
          onPress={() => handlePressTab(origin)}
        />
      ))}
    </S.Container>
  );
};

export default CategoryTab;

const S = {
  Container: styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  `,
};
