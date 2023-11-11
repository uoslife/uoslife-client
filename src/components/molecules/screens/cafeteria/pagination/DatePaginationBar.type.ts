import DateUtils from '../../../../../utils/date';

type DatePaginationProps = {
  date: DateUtils;
  displayDate?: string;
  changeCafeteriaByDate: (
    commonDate: string,
    displayDate: string,
  ) => Promise<void>;
};

export default DatePaginationProps;
