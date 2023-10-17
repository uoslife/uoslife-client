import styled from '@emotion/native';
import Card from '../../card/Card';
import {LibraryStatusType} from '../../../api/services/util/library/libraryAPI.type';
import LibraryRoomItem from './LibraryRoomItem';
import {colors} from '@uoslife/design-system';

type Props = LibraryStatusType;

const LibraryStatusCard = ({type, item}: Props) => {
  return (
    <Card title={type.korName}>
      {item.map((item, i) => (
        <S.CardItemWrapper>
          {i !== 0 && <S.Divider />}
          <LibraryRoomItem key={item.seat_no_s} item={item} />
        </S.CardItemWrapper>
      ))}
    </Card>
  );
};

export default LibraryStatusCard;

const S = {
  CardItemWrapper: styled.View`
    padding: 0 16px;
  `,
  Divider: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.grey20};
  `,
};
