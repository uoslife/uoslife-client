import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';
import Checkbox from './Checkbox';
import {ScheduleTabEnum} from '../constants';
import {ISchedule} from '../api/academicCalendarAPI.type';
import customShowToast from '../../../../configs/toast';
import useModal from '../../../../hooks/useModal';
import AnalyticsService from '../../../../services/analytics';
import useUserState from '../../../../hooks/useUserState';

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
    startDate: string,
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
  const {user} = useUserState();
  const [checked, setChecked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isNotificated, setIsNotificated] = useState<boolean>(false);
  const [isNotiInactive, setIsNotiInactive] = useState<boolean>(false);
  const copyToClipboard = async () => {
    Clipboard.setString(
      `${schedule.title}\n${schedule.startDate}~${schedule.endDate}`,
    );
    customShowToast('clipboardCopy');
    AnalyticsService.logAnalyticsEvent('clipboard_copy', {
      userId: user?.id as number,
    });
  };
  useEffect(() => {
    onCheckboxChange(schedule.scheduleId);
  }, [checked]);
  useEffect(() => {
    setChecked(false);
  }, [editable]);

  useEffect(() => {
    if (!schedule) return;
    if (tabType === ScheduleTabEnum.ALL) {
      if (schedule.isBookmarked === undefined) return;
      setIsBookmarked(schedule.isBookmarked);
    }
    if (tabType === ScheduleTabEnum.MY_SCHEDULE) {
      if (schedule.setNotification === undefined) return;
      setIsNotificated(schedule.setNotification);
    }
    const standardDateStr = schedule.startDate;
    const formattedStandardDateStr = standardDateStr.split('.').join('-');
    const standardDate = new Date(formattedStandardDateStr); // KST
    const scheduleReflectTime =
      standardDate.getTime() -
      standardDate.getTimezoneOffset() * 60 * 1000 +
      9 * 60 * 60 * 1000;
    const today = new Date();
    const utcToday = today.getTime() - today.getTimezoneOffset() * 60 * 1000;
    // UTC 기준으로 설정된 시간을 확인
    const utcDate = new Date(utcToday);
    const scDate = new Date(scheduleReflectTime);
    const result = scDate.getTime() - utcDate.getTime();
    const flag = result / 1000 / 60 / 60;
    if (flag <= 9) setIsNotiInactive(true);
    else setIsNotiInactive(false);
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
                    customShowToast('deleteBookmark');
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
                    customShowToast('addBookmark');
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
                    customShowToast('deleteNotification');
                  }}>
                  <S.Icon>
                    {isNotiInactive ? (
                      <S.Img
                        source={require('../assets/notifications_inactive.png')}
                      />
                    ) : (
                      <S.Img
                        source={require('../assets/notifications_on.png')}
                      />
                    )}
                    <Txt
                      color={isNotiInactive ? 'grey90' : 'primaryBrand'}
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

                    const standardDateStr = schedule.startDate;
                    const formattedStandardDateStr = standardDateStr
                      .split('.')
                      .join('-');
                    const standardDate = new Date(formattedStandardDateStr); // KST
                    const scheduleReflectTime =
                      standardDate.getTime() -
                      standardDate.getTimezoneOffset() * 60 * 1000 +
                      9 * 60 * 60 * 1000;
                    const today = new Date();
                    const utcToday =
                      today.getTime() - today.getTimezoneOffset() * 60 * 1000;

                    const utcDate = new Date(utcToday);
                    const scDate = new Date(scheduleReflectTime);
                    const result = scDate.getTime() - utcDate.getTime();
                    const flag = result / 1000 / 60 / 60;
                    if (flag <= 9) return;
                    setIsNotificated(!isNotificated);
                    notificationHandler(
                      schedule.scheduleId,
                      schedule.startDate,
                      schedule.setNotification,
                    );
                    customShowToast('addNotification');
                  }}>
                  <S.Icon>
                    {isNotiInactive ? (
                      <S.Img
                        source={require('../assets/notifications_inactive.png')}
                      />
                    ) : (
                      <S.Img
                        source={require('../assets/notifications_off.png')}
                      />
                    )}
                    <Txt
                      color={isNotiInactive ? 'grey90' : 'primaryLight'}
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
