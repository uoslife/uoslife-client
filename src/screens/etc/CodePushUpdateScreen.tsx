import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {useCallback} from 'react';
import {DownloadProgress} from 'react-native-code-push';

const ProgressBar = ({useRate}: {useRate: number}) => {
  return (
    <S.ProgressBarTrail>
      <S.ProgressBarInner useRate={useRate} />
    </S.ProgressBarTrail>
  );
};

const CodePushUpdateScreen = ({
  syncProgress,
}: {
  syncProgress?: DownloadProgress;
}) => {
  const calculateReceivedRate = useCallback(
    (recieved: number, total: number) => Math.floor((recieved / total) * 100),
    [],
  );
  return (
    <S.Container>
      <S.TitleWrapper>
        <Txt
          label="안정적인 사용을 위해 앱을 업데이트 중이에요."
          color="grey190"
          typograph="titleLarge"
        />
        <Txt
          label="재시작 까지 잠시만 기다려 주세요."
          color="grey130"
          typograph="titleSmall"
        />
      </S.TitleWrapper>
      {syncProgress && (
        <ProgressBar
          useRate={calculateReceivedRate(
            syncProgress.receivedBytes,
            syncProgress.totalBytes,
          )}
        />
      )}
    </S.Container>
  );
};

export default CodePushUpdateScreen;

const S = {
  Container: styled.View`
    padding: 0 16px;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 64px;
  `,
  TitleWrapper: styled.View`
    gap: 4px;
    align-items: center;
  `,
  ProgressBarTrail: styled.View`
    height: 4px;
    background-color: ${colors.grey20};
    width: 100%;
  `,
  ProgressBarInner: styled.View<{
    useRate: number;
  }>`
    background-color: ${colors.primaryBrand};

    height: 4px;
    width: ${({useRate}) => `${useRate}%`};
    border-radius: 100px 0 0 100px;
  `,
};
