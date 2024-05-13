import styled from '@emotion/native';
import {RefreshControl} from 'react-native';
import {useAtom} from 'jotai';
import LibraryUserInfo from '../../../components/molecules/screens/library/main/my_seat/LibraryUserInfo';
import LibrarySeatControl from '../../../components/molecules/screens/library/main/my_seat/LibrarySeatControl';
import usePullToRefresh from '../../../hooks/usePullToRefresh';
import {libraryReservationAtom} from '../../../store/library';

export type MySeatScreenProps = {
  redirectSeatList: () => void;
  openExtendSheet: () => void;
  openReturnSheet: () => void;
};

const MySeatScreen = ({
  redirectSeatList,
  openExtendSheet,
  openReturnSheet,
}: MySeatScreenProps) => {
  const [{refetch}] = useAtom(libraryReservationAtom);
  const {onRefresh, refreshing} = usePullToRefresh(() => refetch());
  return (
    <S.Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <LibraryUserInfo />
      <LibrarySeatControl
        redirectSeatList={redirectSeatList}
        openExtendSheet={openExtendSheet}
        openReturnSheet={openReturnSheet}
      />
    </S.Container>
  );
};

export default MySeatScreen;

const S = {
  Container: styled.ScrollView`
    padding: 0 16px;
    gap: 12px;
    margin-top: 12px;
  `,
};
