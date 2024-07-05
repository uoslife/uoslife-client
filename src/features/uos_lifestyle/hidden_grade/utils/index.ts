import {colors} from '@uoslife/design-system';
import {MygradeInfoType} from '../../../../api/services/core/hidden_grade/hiddenGradeAPI.type';
import {
  AccuracyWeightType,
  ACCURACY_LOW,
  ACCURACY_HIGH,
  ACCURACY_MIDDLE,
} from '../constants';

export const getAccuracyWeight = (
  accuracy: MygradeInfoType['accuracy'],
): AccuracyWeightType => {
  if (accuracy < 30) return ACCURACY_LOW;
  if (accuracy > 70) return ACCURACY_HIGH;
  return ACCURACY_MIDDLE;
};
export const getAccuracyColor = (accuracyWeight: AccuracyWeightType) => {
  switch (accuracyWeight) {
    case ACCURACY_HIGH:
      return colors.primaryBrand;
    case ACCURACY_MIDDLE:
      return colors.secondaryUi;
    case ACCURACY_LOW:
      return colors.red;
    default:
      return colors.primaryBrand;
  }
};
