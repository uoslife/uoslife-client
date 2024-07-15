export const ACCURACY_LOW = 1;
export const ACCURACY_MIDDLE = 2;
export const ACCURACY_HIGH = 3;

export type AccuracyWeightType =
  | typeof ACCURACY_LOW
  | typeof ACCURACY_MIDDLE
  | typeof ACCURACY_HIGH;
