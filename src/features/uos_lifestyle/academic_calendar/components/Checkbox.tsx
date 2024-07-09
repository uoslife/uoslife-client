import styled from '@emotion/native';
import {Icon, colors} from '@uoslife/design-system';

type CheckboxProps = {
  isChecked: boolean;
  onCheckStateChange: (isChecked: boolean) => void;
};

const Checkbox = ({isChecked, onCheckStateChange}: CheckboxProps) => {
  const handleCheckboxPress = () => {
    onCheckStateChange(!isChecked);
  };

  return (
    <S.CheckboxContainer isChecked={isChecked} onPress={handleCheckboxPress}>
      {isChecked && <Icon name="check" color="white" height={18} width={18} />}
    </S.CheckboxContainer>
  );
};

export default Checkbox;

const S = {
  CheckboxContainer: styled.Pressable<{isChecked: boolean}>`
    width: 24px;
    height: 24px;
    background-color: ${({isChecked}) =>
      isChecked ? colors.primaryBrand : colors.white};
    ${props =>
      props.isChecked
        ? `border: 1px solid ${colors.primaryBrand};`
        : `border: 1px solid ${colors.grey60};`}
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
