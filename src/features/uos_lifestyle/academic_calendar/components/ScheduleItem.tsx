import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';
import Checkbox from './Checkbox';

type ScheduleItemProps = {
  schedule: ScheduleType;
  editable: boolean;
  checkedIdx: number;
  isChecked: boolean;
  onCheckboxChange: (id: number, isChecked: boolean) => void;
};

const ScheduleItem = ({
  schedule,
  editable,
  onCheckboxChange,
  checkedIdx,
  isChecked,
}: ScheduleItemProps) => {
  const [checked, setChecked] = useState<boolean>(isChecked);
  useEffect(() => {
    onCheckboxChange(checkedIdx, checked);
  }, [checked]);
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
            {'isBookmarked' in schedule &&
              (schedule.isBookmarked ? (
                <AnimatePress variant="scale_up_3" onPress={schedule.onClick}>
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
                <AnimatePress variant="scale_up_3" onPress={schedule.onClick}>
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
            {'onAlarm' in schedule &&
              (schedule.onAlarm ? (
                <AnimatePress variant="scale_up_3" onPress={schedule.onClick}>
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
                <AnimatePress variant="scale_up_3" onPress={schedule.onClick}>
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
            <AnimatePress
              variant="scale_up_3"
              onPress={() => console.log('asdf')}>
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
