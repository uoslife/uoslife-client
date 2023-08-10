import {TouchableOpacityProps} from 'react-native';
import styled from '@emotion/native';
import {BtnProps} from './Button.type';

export const Button = ({
  label,
  height = 62,
  children,
  onPress,
  justify = 'center',
  type,
  ...props
}: BtnProps) => {
  return (
    <S.buttonWrapper height={height}>
      <S.button type={type} justify={justify} onPress={onPress} {...props}>
        <S.text type={type}>{label}</S.text>
      </S.button>
      {children}
    </S.buttonWrapper>
  );
};

const S = {
  buttonWrapper: styled.View<BtnProps>`
    position: relative;
    width: 100%;
    height: ${({height}) => height};
  `,
  button: styled.TouchableOpacity<BtnProps>`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: ${({justify}) => justify};
    align-items: center;
    border-radius: 15px;
    padding: 19px;
    background-color: ${({type}) =>
      type === 'primary' ? 'cornflowerblue' : 'grey'};
  `,

  text: styled.Text<BtnProps>`
    color: ${({type}) => (type === 'primary' ? 'white' : 'black')};
  `,
};
