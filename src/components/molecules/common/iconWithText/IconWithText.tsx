import styled from '@emotion/native';
import {MotiPressableProps} from 'moti/interactions';
import {Icon, IconsNameType, Txt, colorsType} from '@uoslife/design-system';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';

type Props = {
  iconName: IconsNameType;
  text: string;
  color?: colorsType;
  isClick?: boolean;
} & MotiPressableProps;

const IconWithText = ({
  iconName,
  color,
  text,
  isClick,
  onPress,
  ...props
}: Props) => {
  return (
    <AnimatePress variant="scale_up" onPress={onPress} {...props}>
      <S.Wrapper>
        <Icon
          name={iconName}
          width={24}
          height={24}
          color={isClick ? 'primaryBrand' : 'grey90' ?? color}
        />
        <Txt
          label={text}
          color={isClick ? 'primaryBrand' : 'grey60' ?? color}
          typograph="labelLarge"
        />
      </S.Wrapper>
    </AnimatePress>
  );
};

export default IconWithText;

const S = {
  Wrapper: styled.View`
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  `,
};
