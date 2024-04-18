import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import {Platform} from 'react-native';
import LibraryChallengeItem from './LibraryChallengeItem';

const LibraryChallengeBoard = () => {
  return (
    <S.Container>
      <S.Row>
        <LibraryChallengeItem label="시작!" isEnabled />
        <LibraryChallengeItem label="10시간" isEnabled />
        <LibraryChallengeItem label="20시간" isEnabled={false} />
      </S.Row>
      <S.Row>
        <LibraryChallengeItem label="30시간" isEnabled={false} />
        <LibraryChallengeItem label="50시간" isEnabled={false} />
        <LibraryChallengeItem label="100시간" isEnabled={false} />
      </S.Row>
    </S.Container>
  );
};

export default LibraryChallengeBoard;

const S = {
  Container: styled.View`
    width: 100%;
    background-color: ${colors.white};
    border-radius: 20px;
    ${Platform.select({
      ios: {
        shadowColor: 'rgba(70, 134, 255, 0.1)',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    })}
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Row: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};
