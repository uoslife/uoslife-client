import {Txt} from '@uoslife/design-system';
import {Platform, View} from 'react-native';
import styled from '@emotion/native';
import {useMutation} from '@tanstack/react-query';
import {getAccuracyWeight, getAccuracyColor} from '../../utils';
import {HiddenGradeCourseType} from '../../../../../api/services/core/hidden_grade/hiddenGradeAPI.type';
import AnimatePress from '../../../../../components/animations/pressable_icon/AnimatePress';
import {CoreAPI} from '../../../../../api/services';

const CourseItem = ({
  data,
  refetch,
}: {
  data: HiddenGradeCourseType;
  refetch: () => void;
}) => {
  const {
    courseName,
    grade,
    credit,
    registerCount,
    accuracy,
    isPublic,
    votes,
    isVoted,
    id,
  } = data;
  const accuracyWeight = getAccuracyWeight(accuracy);
  const accuracyColor = getAccuracyColor(accuracyWeight);
  const {mutate: submitVote} = useMutation({
    mutationKey: ['submitHiddenGradeVote'],
    mutationFn: () => CoreAPI.submitHiddenGradeVote({courseId: id}),
    onSuccess: () => refetch(),
  });
  const {mutate: cancelVote} = useMutation({
    mutationKey: ['cancelHiddenGradeVote'],
    mutationFn: () => CoreAPI.cancelHiddenGradeVote({courseId: id}),
    onSuccess: () => refetch(),
  });

  const handlePressItem = () => {
    if (isPublic) return;

    if (isVoted) cancelVote();
    else submitVote();
  };
  return (
    <AnimatePress
      variant={isPublic ? 'none' : 'scale_down'}
      onPress={handlePressItem}>
      <S.CourseWrapper>
        <S.CourseTextWrapper>
          <Txt
            label={`${courseName}`}
            color="grey190"
            typograph="titleMedium"
          />
          <Txt
            label={`학점: ${credit}`}
            color="grey130"
            typograph="bodyMedium"
          />
        </S.CourseTextWrapper>
        {isPublic ? (
          <Txt label={`${grade}`} color="grey160" typograph="titleMedium" />
        ) : (
          <S.CourseRightWrapper>
            <S.PercentageBox accuracyColor={accuracyColor}>
              <Txt
                label={`${accuracy}%`}
                color="white"
                typograph="labelMedium"
                style={{
                  fontWeight: `${Platform.OS === 'ios' ? 'bold' : 'normal'}`,
                }}
              />
            </S.PercentageBox>
            <View style={{flexDirection: 'row', gap: 3}}>
              <Txt
                label={`투표수: ${votes},`}
                color="grey130"
                typograph="bodySmall"
              />
              <Txt
                label={`누적 등록자: ${registerCount}`}
                color="grey130"
                typograph="bodySmall"
              />
            </View>
          </S.CourseRightWrapper>
        )}
      </S.CourseWrapper>
    </AnimatePress>
  );
};

export default CourseItem;

const S = {
  CourseWrapper: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  CourseTextWrapper: styled.View``,
  CourseRightWrapper: styled.View`
    gap: 1px;
  `,
  PercentageBox: styled.View<{accuracyColor: string}>`
    margin-left: auto;
    padding: 1px 10px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: ${({accuracyColor}) => accuracyColor};
    align-self: center;
  `,
};
