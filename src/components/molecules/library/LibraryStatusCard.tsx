import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import Card from '../../card/Card';
import {LibraryStatusType} from '../../../api/services/util/library/libraryAPI.type';
import LibraryRoomItem from './LibraryRoomItem';

type Props = LibraryStatusType;

const LibraryStatusCard = ({type, item}: Props) => {
  return (
    <Card title={type.korName}>
      {item.map((item, i) => (
        <S.CardItemWrapper key={item.room_no}>
          {i !== 0 && <S.Divider />}
          <LibraryRoomItem item={item} />
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
