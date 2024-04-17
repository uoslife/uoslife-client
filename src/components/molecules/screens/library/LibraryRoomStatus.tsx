import {useQuery} from '@tanstack/react-query';
import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import {useState} from 'react';
import {UtilAPI} from '../../../../api/services';
import LibraryRoomItem from './LibraryRoomItem';
import usePullToRefresh from '../../../../hooks/usePullToRefresh';
import {LibraryRoomStatusTabsType} from '../../../../configs/utility/libraryTabs';
import {LibraryStatusItemType} from '../../../../api/services/util/library/libraryAPI.type';

type Props = {roomType: LibraryRoomStatusTabsType};

const LibraryRoomStatus = ({roomType}: Props) => {
  const {data, refetch} = useQuery({
    queryKey: ['getLibraryRoomStatus', roomType],
    queryFn: () => UtilAPI.getLibraryRoomStatus({type: roomType}),
  });

  const {onRefresh, refreshing} = usePullToRefresh(() => refetch());
  const [width, setWidth] = useState(0);
  return (
    <S.Container
      data={data?.item}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({item}) => (
        <LibraryRoomItem
          item={item as LibraryStatusItemType}
          boxWidth={width}
        />
      )}
      numColumns={2}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}
    />
  );
};

export default LibraryRoomStatus;

const S = {
  Container: styled.FlatList`
    padding: 8px 10px;
    background-color: ${colors.primaryLighterAlt};
  `,
};
