import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {AnnouncementCategoryOrigin} from '../../../../atoms/announcement';

type TabBtnProps = {
  isSelected: boolean;
  label: string;
  origin: AnnouncementCategoryOrigin;
  selectCategoryOrigin: (origin: AnnouncementCategoryOrigin) => void;
};

const TabButton = ({
  isSelected,
  label,
  origin,
  selectCategoryOrigin,
}: TabBtnProps) => {
  const onPressTabBtn = () => {
    selectCategoryOrigin(origin);
    console.log('origin', origin);
  };

  return (
    <S.Root isSelected={isSelected} onPress={onPressTabBtn}>
      <Txt
        typograph={'bodyMedium'}
        label={label}
        color={isSelected ? 'primaryBrand' : 'black'}
      />
    </S.Root>
  );
};

export default TabButton;

type StyledTabBtnContainerProps = {
  isSelected: boolean;
};

const S = {
  Root: styled.Pressable<StyledTabBtnContainerProps>`
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
