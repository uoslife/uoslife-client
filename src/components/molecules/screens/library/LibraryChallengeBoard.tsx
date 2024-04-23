import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import LibraryChallengeItem from './LibraryChallengeItem';
import {ChallengeUserStatusType} from '../../../../configs/utility/libraryChallenge/challengeUserStatus';
import boxShadowStyle from '../../../../styles/boxShadow';

type Props = {status: ChallengeUserStatusType};

const LibraryChallengeBoard = ({status}: Props) => {
  const enabledItemsCount = (() => {
    switch (status) {
      case 'EGG':
        return 1;
      case 'BABY':
        return 2;
      case 'CHICK':
        return 3;
      case 'JUNGDO':
        return 4;
      case 'CHEONJAE':
        return 5;
      case 'MANJAE':
        return 6;
      default:
        return 0;
    }
  })();

  const challengeItems = [
    {label: '시작!', hours: 0},
    {label: '10시간', hours: 10},
    {label: '20시간', hours: 20},
    {label: '30시간', hours: 30},
    {label: '50시간', hours: 50},
    {label: '100시간', hours: 100},
  ];

  return (
    <S.Container style={{...boxShadowStyle.LibraryShadow}}>
      <S.Row>
        {challengeItems.slice(0, 3).map((item, index) => (
          <LibraryChallengeItem
            key={item.label}
            label={item.label}
            isEnabled={index < enabledItemsCount}
          />
        ))}
      </S.Row>
      <S.Row>
        {challengeItems.slice(3, 6).map((item, index) => (
          <LibraryChallengeItem
            key={item.label}
            label={item.label}
            isEnabled={index + 3 < enabledItemsCount}
          />
        ))}
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 52px;
  `,
  Row: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};
