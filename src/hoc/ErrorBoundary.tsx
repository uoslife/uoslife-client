/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {Component, ErrorInfo, ReactNode} from 'react';
import {css} from '@emotion/react';
import {View} from 'react-native';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return {hasError: true};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <S.Container>
          <View>
            <View
              style={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
              `}>
              <Txt
                label="알 수 없는 오류가 발생했어요."
                color="grey190"
                typograph="titleLarge"
              />
              <Txt
                label="서비스 이용에 불편을 드려 죄송합니다."
                color="grey130"
                typograph="titleSmall"
              />
            </View>
          </View>
          {/* <S.Button onClick={async () => await uoslifeBridge.goBack()}>
            <Txt label="돌아가기" color="primaryBrand" typograph="bodyLarge" />
          </S.Button> */}
        </S.Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const S = {
  Container: styled.View`
    background-color: ${colors.primaryLighter};
    height: 100vh;
    padding: 96px 12px 68px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,
};
