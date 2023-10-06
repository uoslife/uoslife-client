import {Button, colors} from '@uoslife/design-system';
import BottomSheetCheckItem, {
  BottomSheetCheckItemProps,
} from '../items/BottomSheetCheckItem';
import styled from '@emotion/native';

type BottomSheetCheckContentProps = {
  buttonEnabled: boolean;
  firstItemProps: BottomSheetCheckItemProps;
  otherItemPropsList: BottomSheetCheckItemProps[];
};

const BottomSheetCheckContent = ({
  buttonEnabled,
  firstItemProps,
  otherItemPropsList,
}: BottomSheetCheckContentProps) => {
  return (
    <S.Root>
      <S.ItemsWrapper>
        <S.FirstItemContainer
          style={{
            borderBottomColor: colors.grey40,
            borderBottomWidth: 1,
          }}>
          <BottomSheetCheckItem {...firstItemProps} />
        </S.FirstItemContainer>
        <S.OtherItemsContainer>
          {otherItemPropsList.map((otherItemProps, i) => (
            <BottomSheetCheckItem key={i} {...otherItemProps} />
          ))}
        </S.OtherItemsContainer>
      </S.ItemsWrapper>
      <S.ButtonWrapper>
        <Button
          label={'Button'}
          size={'large'}
          isEnabled={buttonEnabled}
          isFullWidth
        />
      </S.ButtonWrapper>
    </S.Root>
  );
};

export default BottomSheetCheckContent;

const S = {
  Root: styled.View``,
  ItemsWrapper: styled.View`
    padding: 16px 16px 0 16px;
  `,
  ButtonWrapper: styled.View`
    width: 100%;
    padding: 8px 16px;
  `,
  FirstItemContainer: styled.View``,
  OtherItemsContainer: styled.View``,
};
