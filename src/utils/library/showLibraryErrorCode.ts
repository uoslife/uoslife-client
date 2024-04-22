import customShowToast from '../../configs/toast';

const showLibraryErrorCode = (
  code: string,
  variant: 'reservation' | 'extend' | 'return',
) => {
  if (code === 'L03') customShowToast('libraryReservationL03Error');
  else if (code === 'L04') customShowToast('libraryReservationL04Error');
  else if (code === 'L05') customShowToast('libraryReservationL05Error');
  else if (code === 'L06') customShowToast('libraryReservationL06Error');
  else if (code === 'L07') customShowToast('libraryReservationL07Error');
  else if (code === 'L08') customShowToast('libraryReservationL08Error');
  else
    switch (variant) {
      case 'reservation':
        customShowToast('libraryReservationUnknownError');
        break;
      case 'extend':
        customShowToast('libraryReservationExtendError');
        break;
      case 'return':
        customShowToast('libraryReservationReturnError');
    }
};

export default showLibraryErrorCode;
