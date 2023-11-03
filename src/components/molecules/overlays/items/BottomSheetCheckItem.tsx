import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {GestureResponderEvent} from 'react-native';

export type BottomSheetCheckItemProps = {
  checked: boolean;
  title: string;
  supportingText?: string;
  onToggle: (e: GestureResponderEvent) => void;
  onPressForward?: (e: GestureResponderEvent) => void;
};

const BottomSheetCheckItem = ({
  checked,
  title,
  supportingText,
  onToggle,
  onPressForward,
}: BottomSheetCheckItemProps) => {
  return (
    <S.Root>
      <S.Left onPress={onToggle}>
        <Icon
          name="check"
          color={checked ? 'primaryBrand' : 'grey60'}
          height={24}
          width={24}
        />
      </S.Left>
      <S.Right>
        <S.Descriptions onPress={onToggle}>
          <Txt color="grey190" label={title} typograph="bodyLarge" />
          {supportingText && (
            <Txt color="grey130" label={supportingText} typograph="bodySmall" />
          )}
        </S.Descriptions>
        {!!onPressForward && (
          <S.ForwardArrow onPress={onPressForward}>
            <Icon name="forwardArrow" color="grey130" height={24} width={24} />
          </S.ForwardArrow>
        )}
      </S.Right>
    </S.Root>
  );
};

export default BottomSheetCheckItem;

const S = {
  Root: styled.View`
    width: 100%;
    padding: 8px 16px 8px 8px;

    flex-direction: row;
    gap: 4px;
  `,
  Left: styled.Pressable`
    padding: 8px;
  `,
  Right: styled.Pressable`
    flex: 1;

    flex-direction: row;
    gap: 8px;
    justify-content: space-between;
    align-items: center;

    padding: 8px 0;
  `,
  Descriptions: styled.Pressable`
    flex: 1;

    gap: 8px;
  `,
  ForwardArrow: styled.Pressable``,
};
