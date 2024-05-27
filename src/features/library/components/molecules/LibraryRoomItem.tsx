import styled, {css} from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {LibraryStatusItemType} from '../../../../api/services/util/library/libraryAPI.type';
import boxShadowStyle from '../../../../styles/boxShadow';
import {LibraryRoomStatusNavigationProp} from '../../navigators/types/library';
import customShowToast from '../../../../configs/toast/index';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';

// TODO: 스터디홀, 중도 이외 도서관 예약 기능 추가되면 삭제
const ACCSS_RESTRICTION_ROOM_NUMBER = ['21', '22', '32', '33'];

export type Props = {
  item: LibraryStatusItemType;
  boxWidth: number;
};

const LibraryRoomItem = ({item, boxWidth}: Props) => {
  const navigation = useNavigation<LibraryRoomStatusNavigationProp>();
  const isAccessRestriction = ACCSS_RESTRICTION_ROOM_NUMBER.some(
    i => i === item.room_no,
  );

  const handlePressRoomItem = () => {
    if (isAccessRestriction) {
      customShowToast('preparingLibraryReservationInfo');
      return;
    }
    navigation.navigate('library_seating_chart', {
      roomNumber: item.room_no,
    });
  };

  return (
    <AnimatePress
      style={[
        css`
          display: flex;
          margin: 6px;
          padding: 20px 12px;
          gap: 4px;
          align-items: center;
          border-radius: 12px;
          background-color: ${colors.white};
          flex: 1;
          width: 100%;
        `,
        {...boxShadowStyle.bottomTapShadow, width: boxWidth / 2 - 22},
      ]}
      variant={isAccessRestriction ? 'none' : 'scale_up_3'}
      onPress={handlePressRoomItem}>
      <Txt label={`${item.room_name}`} color="grey190" typograph="titleSmall" />
      <Txt
        label={`잔여 ${item.remain_seat}석 / ${item.total_seat}석`}
        color="grey130"
        typograph="bodyLarge"
      />
      <S.progressBarConatiner>
        <S.progressBarTrail>
          <S.progressBarInner useRate={item.use_rate} />
        </S.progressBarTrail>
      </S.progressBarConatiner>
    </AnimatePress>
  );
};

export default LibraryRoomItem;

const S = {
  Container: styled.View``,
  itemTxtContainer: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  progressBarConatiner: styled.View`
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
  `,
  progressBarTrail: styled.View`
    height: 4px;
    background: ${colors.grey20};
  `,
  progressBarInner: styled.View<{
    useRate: LibraryStatusItemType['use_rate'];
  }>`
    background: ${colors.primaryBrand};

    height: 4px;
    width: ${({useRate}) => `${useRate}%`};
    border-radius: 100px 0 0 100px;
  `,
};
