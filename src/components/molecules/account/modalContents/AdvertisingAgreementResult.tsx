import styled from '@emotion/native';
import {Button, Txt, colors} from '@uoslife/design-system';
import ModalInformationBox from '../../../overlays/items/ModalInformationBox';

type Props = {
  isAgree: boolean;
  handleClickSubmitModalButton: () => void;
};

const AdvertisingAgreementResult = ({
  isAgree,
  handleClickSubmitModalButton,
}: Props) => {
  const date = new Date();
  return (
    <>
      <S.TopContainer>
        <Txt
          label={`광고성 정보 수신동의 ${isAgree ? '처리' : '거부'} 결과`}
          color={'grey190'}
          typograph={'titleMedium'}
          style={{textAlign: 'center'}}
        />
        <ModalInformationBox
          informationBoxObject={[
            {key: '전송자', value: `${'uoslife'.toUpperCase()}`},
            {
              key: '일시',
              value: `${date.getFullYear()}년 ${
                date.getMonth() + 1
              }월 ${date.getDate()}일`,
            },
            {key: '내용', value: `수신동의 ${isAgree ? '처리' : '거부'} 완료`},
          ]}
        />
        <Txt
          label={`광고성 정보 수신 동의는 MY Page > [앱 설정]에서\n변경 가능합니다.`}
          color={'grey130'}
          typograph={'bodySmall'}
          style={{textAlign: 'center'}}
        />
      </S.TopContainer>
      <S.Divider />
      <Button
        label="확인"
        variant="text"
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
    padding: 24px 16px 16px;
  `,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
};
