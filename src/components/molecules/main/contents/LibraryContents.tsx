import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';

import CardLayout from '../cardLayout/CardLayout';

const LibraryContents = () => {
  return (
    <CardLayout>
      <S.Wrapper>
        <S.LeftArea>
          <S.TimerBackground>
            <Icon name={'time'} width={24} height={24} color={'primaryBrand'} />
          </S.TimerBackground>
          <Txt
            label={'이용 중'}
            color={'primaryBrand'}
            typograph={'bodySmall'}
          />
        </S.LeftArea>
        <S.RightArea>
          <Txt
            label={'중앙도서관 / 0 Zone'}
            color={'grey190'}
            typograph={'bodyLarge'}
          />
          <S.SeatText>
            <Txt label={'14번'} color={'grey190'} typograph={'titleMedium'} />
            <Txt label={'좌석'} color={'grey190'} typograph={'bodyLarge'} />
          </S.SeatText>
        </S.RightArea>
      </S.Wrapper>
    </CardLayout>
  );
};

export default LibraryContents;

const S = {
  Wrapper: styled.Pressable`
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,
  LeftArea: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
  `,
  TimerBackground: styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 24px;
    background-color: ${colors.primaryLighterAlt};
  `,
  SeatText: styled.View`
    display: flex;
    flex-direction: row;
    gap: 4px;
  `,
  RightArea: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
  `,
};
