import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {AnnouncementCategoryId} from '../../../../atoms/announcement';

type TabBtnProps = {
  isSelected: boolean;
  label: string;
  categoryId: AnnouncementCategoryId;
  selectCategoryId: (categoryId: AnnouncementCategoryId) => void;
};

const TabButton = ({
  isSelected,
  label,
  categoryId,
  selectCategoryId,
}: TabBtnProps) => {
  const onPressTabBtn = () => selectCategoryId(categoryId);

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
