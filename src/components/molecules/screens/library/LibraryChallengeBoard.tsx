import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import LibraryChallengeItem from './LibraryChallengeItem';
import {ChallengeUserStatusType} from '../../../../configs/utility/libraryChallenge/challengeUserStatus';
import boxShadowStyle from '../../../../styles/boxShadow';

type Props = {
  status: {
    max: ChallengeUserStatusType;
    current: ChallengeUserStatusType;
  };
  setChallengeStatus: React.Dispatch<
    React.SetStateAction<{
      max: ChallengeUserStatusType;
      current: ChallengeUserStatusType;
    }>
  >;
};

const LibraryChallengeBoard = ({status, setChallengeStatus}: Props) => {
  const enabledItemsCount = (() => {
    switch (status.max) {
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

  const challengeItems: Array<{
    label: string;
    hours: number;
    userStatus: ChallengeUserStatusType;
  }> = [
    {label: '시작!', hours: 0, userStatus: 'EGG'},
    {label: '10시간', hours: 10, userStatus: 'BABY'},
    {label: '20시간', hours: 20, userStatus: 'CHICK'},
    {label: '30시간', hours: 30, userStatus: 'JUNGDO'},
    {label: '50시간', hours: 50, userStatus: 'CHEONJAE'},
    {label: '100시간', hours: 100, userStatus: 'MANJAE'},
  ];

  return (
    <S.Container style={{...boxShadowStyle.LibraryShadow}}>
      <S.Row>
        {challengeItems.slice(0, 3).map((item, index) => (
          <LibraryChallengeItem
            key={item.label}
            label={item.label}
            isEnabled={index < enabledItemsCount}
            isCurrent={item.userStatus === status.current}
            onPress={() =>
              setChallengeStatus(prev => {
                return {...prev, current: item.userStatus};
              })
            }
          />
        ))}
      </S.Row>
      <S.Row>
        {challengeItems.slice(3, 6).map((item, index) => (
          <LibraryChallengeItem
            key={item.label}
            label={item.label}
            isEnabled={index + 3 < enabledItemsCount}
            isCurrent={item.userStatus === status.current}
            onPress={() =>
              setChallengeStatus(prev => {
                return {...prev, current: item.userStatus};
              })
            }
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
