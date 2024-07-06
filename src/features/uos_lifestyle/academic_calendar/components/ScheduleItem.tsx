import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';
import Checkbox from './Checkbox';
import {ScheduleTabEnum} from '../constants';
import {ISchedule} from '../api/academicCalendarAPI.type';

type ScheduleItemProps = {
  schedule: ISchedule;
  editable: boolean;
  checkedIdx: number;
  isChecked: boolean;
  tabType: string;
  onCheckboxChange: (id: number) => void;
  bookmarkHandler?: (param: number, flag: boolean) => void;
  notificationHandler?: (
    param: number,
    date: string,
    isNotification: boolean,
  ) => void;
  delNotificationHandler?: (notificationId: number[]) => void;
};

const ScheduleItem = ({
  schedule,
  editable,
  onCheckboxChange,
  checkedIdx,
  isChecked,
  tabType,
  bookmarkHandler,
  notificationHandler,
  delNotificationHandler,
}: ScheduleItemProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isNotificated, setIsNotificated] = useState<boolean>(false);
  const copyToClipboard = async () => {
    Clipboard.setString(
      `${schedule.title}\n${schedule.startDate}~${schedule.endDate}`,
    );
  };
  useEffect(() => {
    onCheckboxChange(schedule.scheduleId);
  }, [checked]);
  useEffect(() => {
    setChecked(false);
  }, [editable]);

  useEffect(() => {
    if (tabType === ScheduleTabEnum.ALL) {
      if (schedule.isBookmarked === undefined) return;
      setIsBookmarked(schedule.isBookmarked);
    }
    if (tabType === ScheduleTabEnum.MY_SCHEDULE) {
      if (schedule.setNotification === undefined) return;
      setIsNotificated(schedule.setNotification);
    }
  }, [schedule, tabType]);

  useEffect(() => {
    if (isChecked) return;
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <S.ScheduleItemContainer editable={editable}>
      {editable && (
        <S.CheckboxContainer>
          <Checkbox isChecked={checked} onCheckStateChange={setChecked} />
        </S.CheckboxContainer>
      )}
      <S.DescriptionContainer>
        <Txt color="grey190" typograph="labelLarge" label={schedule.title} />
        <Txt
          color="grey190"
          typograph="bodyLarge"
          label={`${schedule.startDate} - ${schedule.endDate}`}
        />
      </S.DescriptionContainer>
      <S.IconContainer>
        {!editable && (
          <>
            {tabType === ScheduleTabEnum.ALL &&
              (isBookmarked ? (
                <AnimatePress
                  variant="scale_up_3"
                  onPress={() => {
                    if (!bookmarkHandler) return;
                    setIsBookmarked(!isBookmarked);
                    bookmarkHandler(schedule.scheduleId, schedule.isBookmarked);
                  }}>
                  <S.Icon>
                    <S.Img
                      source={require('../assets/bookmark_border_on.png')}
                    />
                    <Txt
                      color="primaryBrand"
                      typograph="labelMedium"
                      label="담기"
                    />
                  </S.Icon>
                </AnimatePress>
              ) : (
                <AnimatePress
                  variant="scale_up_3"
                  onPress={() => {
                    if (!bookmarkHandler) return;
                    setIsBookmarked(!isBookmarked);
                    bookmarkHandler(schedule.scheduleId, schedule.isBookmarked);
                  }}>
                  <S.Icon>
                    <S.Img
                      source={require('../assets/bookmark_border_off.png')}
                    />
                    <Txt
                      color="primaryLight"
                      typograph="labelMedium"
                      label="담기"
                    />
                  </S.Icon>
                </AnimatePress>
              ))}
            {tabType === ScheduleTabEnum.MY_SCHEDULE &&
              (isNotificated ? (
                <AnimatePress
                  variant="scale_up_3"
                  onPress={() => {
                    if (!delNotificationHandler) return;
                    if (schedule.notificationIds === undefined) return;
                    setIsNotificated(!isNotificated);
                    delNotificationHandler(schedule.notificationIds);
                  }}>
                  <S.Icon>
                    <S.Img source={require('../assets/notifications_on.png')} />
                    <Txt
                      color="primaryBrand"
                      typograph="labelMedium"
                      label="알림"
                    />
                  </S.Icon>
                </AnimatePress>
              ) : (
                <AnimatePress
                  variant="scale_up_3"
                  onPress={() => {
                    if (!notificationHandler) return;
                    if (schedule.setNotification === undefined) return;
                    setIsNotificated(!isNotificated);
                    notificationHandler(
                      schedule.scheduleId,
                      schedule.startDate,
                      schedule.setNotification,
                    );
                  }}>
                  <S.Icon>
                    <S.Img
                      source={require('../assets/notifications_off.png')}
                    />
                    <Txt
                      color="primaryLight"
                      typograph="labelMedium"
                      label="알림"
                    />
                  </S.Icon>
                </AnimatePress>
              ))}
            <AnimatePress variant="scale_up_3" onPress={copyToClipboard}>
              <S.Icon>
                <S.Img source={require('../assets/copy.png')} />
                <Txt color="grey190" typograph="labelMedium" label="복사" />
              </S.Icon>
            </AnimatePress>
          </>
        )}
      </S.IconContainer>
    </S.ScheduleItemContainer>
  );
};

export default ScheduleItem;

const S = {
  CheckboxContainer: styled.View``,
  ScheduleItemContainer: styled.View<{editable?: boolean}>`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 12px;
    padding-left: 16px;
    justify-content: ${props =>
      props.editable ? 'flex-start' : 'space-between'};
    align-items: center;

    border-radius: 16px;
    border: 1px solid ${colors.grey40};
    background: #fff;
    성적열람제한해제수강지도기간(학업계획서,복학생상담)

    ${props => props.editable && `gap: 16px;`}
  `,
  DescriptionContainer: styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  `,
  IconContainer: styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
  `,
  Icon: styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Img: styled.Image``,
};
