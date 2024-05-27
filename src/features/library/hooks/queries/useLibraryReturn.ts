import {useMutation} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {UtilAPI} from '../../../../api/services';
import {ErrorResponseType} from '../../../../api/services/type';
import {ReturnSeatParams} from '../../../../api/services/util/library/libraryAPI.type';
import customShowToast from '../../../../configs/toast';
import useModal from '../../../../hooks/useModal';
import {libraryReservationAtom} from '../../store';
import showLibraryErrorCode from '../../utils/showLibraryErrorCode';
import AnalyticsService from '../../../../services/analytics';
import useUserState from '../../../../hooks/useUserState';

const useLibraryReturn = () => {
  const [{data, refetch}] = useAtom(libraryReservationAtom);
  const {user} = useUserState();
  const [openReturnSheet, closeReturnSheet, ReturnBottomSheet] =
    useModal('BOTTOM_SHEET');

  const returnSeatMutation = useMutation({
    mutationKey: ['reservationSeat'],
    mutationFn: (params: ReturnSeatParams) => UtilAPI.returnSeat(params),
    onError: (error: ErrorResponseType) => {
      showLibraryErrorCode(error.code, 'return');
      closeReturnSheet();
    },
    onSuccess: async () => {
      await AnalyticsService.logAnalyticsEvent('library_return_success', {
        userId: user?.id as number,
      }).finally(() => {
        customShowToast('libraryReservationReturnSuccess');
        closeReturnSheet();
        refetch();
      });
    },
  });

  const handleOnPressReturn = () => {
    if (!data.reservationInfo) return;
    returnSeatMutation.mutate({
      roomId: parseInt(data.reservationInfo.seatRoomNumber),
      seatId: parseInt(data.reservationInfo.seatNo),
    });
  };

  return {
    openReturnSheet,
    closeReturnSheet,
    ReturnBottomSheet,
    handleOnPressReturn,
  };
};

export default useLibraryReturn;
