import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {ScheduleTabType} from '../../constants';

type Props = {tabType: ScheduleTabType};
const ScheduleList = ({tabType}: Props) => {
  return (
    <S.Container>
      <Txt label={tabType} color="black" typograph="titleMedium" />
    </S.Container>
  );
};

export default ScheduleList;

const S = {
  Container: styled.View`
    padding: 16px;
  `,
};
