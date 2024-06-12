import {useQuery} from '@tanstack/react-query';

import {colors} from '@uoslife/design-system';
import {FlashList} from '@shopify/flash-list';
import {Dimensions, View} from 'react-native';
import {UtilAPI} from '../../../../api/services';
import LibraryRoomItem from './LibraryRoomItem';
import usePullToRefresh from '../../../../hooks/usePullToRefresh';
import {LibraryRoomStatusTabsType} from '../../constants/libraryTabs';
import {LibraryStatusItemType} from '../../../../api/services/util/library/libraryAPI.type';

type Props = {roomType: LibraryRoomStatusTabsType};

const LibraryRoomStatus = ({roomType}: Props) => {
  const {data, refetch} = useQuery({
    queryKey: ['getLibraryRoomStatus', roomType],
    queryFn: () => UtilAPI.getLibraryRoomStatus({type: roomType}),
  });

  const {onRefresh, refreshing} = usePullToRefresh(() => refetch());
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: colors.primaryLighterAlt,
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
          padding: 8,
        }}>
        <FlashList
          data={data?.item}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({item}) => (
            <LibraryRoomItem
              item={item as LibraryStatusItemType}
              boxWidth={Dimensions.get('screen').width / 2 - 20}
            />
          )}
          numColumns={2}
          estimatedItemSize={Dimensions.get('screen').width / 2 - 8}
        />
      </View>
    </View>
  );
};

export default LibraryRoomStatus;
