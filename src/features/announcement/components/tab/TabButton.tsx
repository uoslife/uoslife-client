import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';

type TabButtonProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

const TabButton = ({isSelected, label, onPress}: TabButtonProps) => {
  return (
    <S.Container isSelected={isSelected} onPress={onPress}>
      <AnimatePress variant="scale_up" onPress={onPress}>
        <Txt
          typograph="bodyMedium"
          label={label}
          color={isSelected ? 'primaryBrand' : 'black'}
        />
      </AnimatePress>
    </S.Container>
  );
};

export default TabButton;

const S = {
  Container: styled.Pressable<Pick<TabButtonProps, 'isSelected'>>`
    height: 48px;
    flex: 1;

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
