// type CreditKinds =
//   | 'allCredit'
//   | 'majorRequirement'
//   | 'majorElective'
//   | 'generalEducationRequirement'
//   | 'GeneralEducationDetail'
//   | 'doubleMajorRequirement'
//   | 'doubleMajorElective'
//   | 'minorRequirement'
//   | 'minorElective';

// interface CreditScore {
//   total: number | null;
//   current: number | null;
// }

// export interface GraduateCreditRes extends Record<CreditKinds, CreditScore> {
//   commonElective: number;
//   updatedAt?: string | null;
// }

// export type SubjectCredit = {
//   courseName: string;
//   courseType: string;
//   courseTotal: number;
//   courseRequirement: number;
// };

// export type SubjectCreditListRes = Array<SubjectCredit>;

type CreditDetails = {
  total: number | null;
  current: number | null;
};

type MinMax = {
  min: number;
  max: number;
};

type CreditCategory = {
  requirement: CreditDetails;
  elective: CreditDetails;
};

type GeneralEducationCategory = CreditCategory & {
  minmax: MinMax;
};

export type GraduateCreditRes = {
  allCredit: CreditDetails;
  commonElective: number;
  major: CreditCategory;
  generalEducation: GeneralEducationCategory;
  doubleMajor: CreditCategory;
  minor: CreditCategory;
  updatedAt: string | null;
};

export type SubjectCredit = {
  courseName: string;
  courseType: 'Requirement' | 'Elective';
  courseTotal: number;
  courseRequirement: number;
};

export type SubjectCreditListRes = Array<SubjectCredit>;
