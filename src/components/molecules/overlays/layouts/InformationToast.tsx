import {Txt, colors, Icon} from '@uoslife/design-system';
import styled from '@emotion/native';
type UseToastParams = {
  toastType: 'ERROR' | 'COMPLETE';
  children?: React.ReactNode;
};
const InformationToast = ({toastType, children}: UseToastParams) => {
  switch (toastType) {
    case 'ERROR':
      return (
        <S.ToastContainer background={colors.red}>
          <Icon name="clear" width={24} height={24} color="white" />
          <Txt
            label={children ? children.toString() : ''}
            color="white"
            typograph="labelMedium"
          />
        </S.ToastContainer>
      );
    case 'COMPLETE':
      return (
        <S.ToastContainer background={colors.secondaryBrand}>
          <Icon name="checkCircle" width={24} height={24} color="grey190" />
          <Txt
            label={children ? children.toString() : ''}
            color="grey190"
            typograph="labelMedium"
          />
        </S.ToastContainer>
      );
  }
};
export default InformationToast;

interface ToastContainerProps {
  background: string;
}

const S = {
  ToastContainer: styled.View<ToastContainerProps>`
    width: auto;
    flex-direction: row;
    background: ${props => props.background};
    border-radius: 40px;
    gap: 8px;
    padding: 4px 8px;
    align-items: center;
  `,
  ImageContainer: styled.Image`
    width: 24px;
    height: 24px;
  `,
};
