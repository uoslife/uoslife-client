import {LibraryRoomStatusScreenProps} from '../../../navigators/types/library';

const LibraryRoomStatusScreen = ({
  route: {params},
}: LibraryRoomStatusScreenProps) => {
  const initialRoomType = (params?.roomType ?? 'CENTRAL') satisfies
    | 'ECONOMY'
    | 'LAW'
    | 'CENTRAL';

  return <></>;
};

export default LibraryRoomStatusScreen;
