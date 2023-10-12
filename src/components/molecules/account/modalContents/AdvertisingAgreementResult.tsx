import styled from '@emotion/native';
import {Button, Txt} from '@uoslife/design-system';
import ModalInformationBox from '../../../overlays/items/ModalInformationBox';

type Props = {
  isAgree: boolean;
  handleClickSubmitModalButton: () => void;
};

const AdvertisingAgreementResult = ({
  isAgree,
  handleClickSubmitModalButton,
}: Props) => {
  return (
    <>
      <S.TopContainer>
        <Txt
          label={`광고성 정보 수신동의 ${isAgree ? '처리' : '거부'} 결과`}
          color={'grey190'}
          typograph={'titleMedium'}
        />
        <ModalInformationBox
          informationBoxObject={[{key: '전송자', value: 'uoslife'}]}
        />
        <Txt
          label={`광고성 정보 수신 동의는 MY Page > [앱 설정]에서\n변경 가능합니다.`}
          color={'grey130'}
          typograph={'bodySmall'}
        />
      </S.TopContainer>
      <Button
        label="확인"
        variant="outline"
        isFullWidth
        onPress={handleClickSubmitModalButton}
      />
    </>
  );
};

export default AdvertisingAgreementResult;

const S = {
  TopContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};
