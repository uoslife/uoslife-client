import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import HeaderProps from './Header.type';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';

const Header = ({
  label,
  onPressBackButton,
  isDisableBackButton = false,
  children,
  ...props
}: HeaderProps) => {
  return (
    <S.HeaderContainter {...props}>
      <S.LeftWrapper>
        {!isDisableBackButton && (
          <AnimatePress onPress={onPressBackButton} variant="scale_up">
            <Icon name="backArrow" width={24} height={24} color="grey130" />
          </AnimatePress>
        )}
        {!!label && (
          <Txt label={label} color="grey190" typograph="titleLarge" />
        )}
      </S.LeftWrapper>
      {children}
    </S.HeaderContainter>
  );
};

export default Header;

const S = {
  HeaderContainter: styled.View`
    width: 100%;
    padding: 6px 20px 6px 8px;
    flex-direction: row;
    align-items: center;

    border-bottom-width: 1px;
    border-color: ${colors.grey40};
    border-style: solid;
  `,
  LeftWrapper: styled.View`
    padding: 8px;
    flex-direction: row;
    gap: 16px;
    align-items: center;
  `,
};
