import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {AnnouncementCategoryNameType} from '../../../../../atoms/announcement';

type TabButtonProps = {
  label: AnnouncementCategoryNameType;
  isSelected: boolean;
  onPress: () => void;
};

const TabButton = ({isSelected, label, onPress}: TabButtonProps) => {
  return (
    <S.Container isSelected={isSelected} onPress={onPress}>
      <Txt
        typograph="bodyMedium"
        label={label}
        color={isSelected ? 'primaryBrand' : 'black'}
      />
    </S.Container>
  );
};

export default TabButton;

const S = {
  Container: styled.Pressable<Pick<TabButtonProps, 'isSelected'>>`
    height: 48px;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({isSelected}) =>
      isSelected &&
      `
      padding: 14px 0;
      border-bottom-width: 2px; 
      border-bottom-color: ${colors.primaryBrand};
      `}
  `,
};
