export interface CreditDetails {
  current: number | null;
  total: number | null;
}

export interface ApiResponse {
  allCredit: CreditDetails;
  commonElective: number;
  major: {
    requirement: CreditDetails;
    elective: CreditDetails;
  };
  generalEducation: {
    requirement: CreditDetails;
    elective: CreditDetails;
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
}

export type FieldData = {
  label: string;
  current: number | null;
  total: number | null;
};

export type GroupedFields = string[]; // 예시 타입, 실제 타입에 맞게 조정 필요

export type LabelsMap = {[key: string]: string}; // 예시 타입, 실제 타입에 맞게 조정 필요

export type ErrorResponseType = {
  code: string;
  message: string;
  status: number;
};

export type ButtonConfig = {
  label: string;
  key: keyof ApiResponse;
};

// 변수명 고치자
export type CreditDetail = {
  requirement: CreditDetails;
  elective: CreditDetails;
};

export type SubjectCredit = {
  requirement: CreditDetails;
  elective: CreditDetails;
};
