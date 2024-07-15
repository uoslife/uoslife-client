export type CreditDetails = {
  current: number | null;
  total: number | null;
};

export type MinMax = {
  min: number;
  max: number;
};

export type ApiResponse = {
  allCredit: CreditDetails;
  commonElective: number;
  major: {
    requirement: CreditDetails;
    elective: CreditDetails;
  };
  generalEducation: {
    requirement: CreditDetails;
    elective: CreditDetails;
    minmax: MinMax;
  };
  doubleMajor: {
    requirement: CreditDetails;
    elective: CreditDetails;
  };
  minor: {
    requirement: CreditDetails;
    elective: CreditDetails;
  };
  updatedAt: string | null;
};

export type FieldData = {
  label: string;
  current: number | null;
  total: number | null;
};

export type GroupedFields = string[];

export type LabelsMap = {[key: string]: string};

export type ErrorResponseType = {
  code: string;
  message: string;
  status: number;
};

export type ButtonConfig = {
  label: string;
  key: string;
};

export type CreditDetail = {
  requirement: CreditDetails;
  elective: CreditDetails;
};

export type SubjectCredit = {
  requirement: CreditDetails;
  elective: CreditDetails;
};

export type GeneralEducationDetail = {
  courseName: string;
  courseType: 'Requirement' | 'Elective';
  courseTotal: number;
  courseRequirement: number;
};

export type GeneralEducationDetailList = Array<GeneralEducationDetail>;
