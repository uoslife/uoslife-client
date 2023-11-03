import styled from '@emotion/native';
import {Button} from '@uoslife/design-system';
import BottomSheetToggleItem, {
  BottomSheetToggleItemProps,
} from '../items/BottomSheetToggleItem';

type BottomSheetToggleContentProps = {
  toggleItemPropsList: BottomSheetToggleItemProps[];
  buttonEnabled: boolean;
};

const BottomSheetToggleContent = ({
  toggleItemPropsList,
  buttonEnabled,
}: BottomSheetToggleContentProps) => {
  return (
    <S.Root>
      <S.ItemsWrapper>
        {toggleItemPropsList.map((toggleProps, i) => (
          <BottomSheetToggleItem key={i} {...toggleProps} />
        ))}
      </S.ItemsWrapper>
      <S.ButtonWrapper>
        <Button
          label="Button"
          size="large"
          isEnabled={buttonEnabled}
          isFullWidth
        />
      </S.ButtonWrapper>
    </S.Root>
  );
};

const S = {
  Root: styled.View``,
  ItemsWrapper: styled.View`
    padding: 16px 24px 12px 24px;
  `,
  ButtonWrapper: styled.View`
    padding: 8px 16px;
  `,
};
