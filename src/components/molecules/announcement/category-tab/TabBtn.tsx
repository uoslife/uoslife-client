import styled from '@emotion/native';
import {ArticleCategoryNum} from '../../../../types/announcement.type';
import {Txt, colors} from '@uoslife/design-system';

type TabBtnProps = {
  isSelected: boolean;
  label: string;
  tabNum: ArticleCategoryNum;
  selectCategoryTabNum: (num: ArticleCategoryNum) => void;
};

const TabBtn = ({
  isSelected,
  label,
  selectCategoryTabNum,
  tabNum,
}: TabBtnProps) => {
  const onPressTabBtn = () => selectCategoryTabNum(tabNum);

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

export default TabBtn;

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
