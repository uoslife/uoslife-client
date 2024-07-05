// type CreditKinds =
//   | 'allCredit'
//   | 'majorRequirement'
//   | 'majorElective'
//   | 'generalEducationRequirement'
//   | 'generalEducationElective'
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

interface CreditDetails {
  total: number | null;
  current: number | null;
}
type CreditCategory = {
  requirement: CreditDetails;
  elective: CreditDetails;
};

export interface GraduateCreditRes {
  allCredit: CreditDetails;
  commonElective: number;
  major: CreditCategory;
  generalEducation: CreditCategory;
  doubleMajor: CreditCategory;
  minor: CreditCategory;
  updatedAt: string | null;
}

export type SubjectCredit = {
  courseName: string;
  courseType: 'Requirement' | 'Elective';
  courseTotal: number;
  courseRequirement: number;
};

export type SubjectCreditListRes = Array<SubjectCredit>;
