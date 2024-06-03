interface CreditDetails {
  current: number | null;
  total: number | null;
}
// 더미데이터 객체 타입
export interface ApiResponse {
  allCredit: CreditDetails;
  majorRequirement: CreditDetails;
  majorElective: CreditDetails;
  generalEducationRequirement: CreditDetails;
  generalEducationElective: CreditDetails;
  doubleMajorRequirement: CreditDetails;
  doubleMajorElective: CreditDetails;
  minorRequirement: CreditDetails;
  minorElective: CreditDetails;
  commonElective: number;
}

export type FieldData = {
  label: string;
  current: number | null;
  total: number | null;
};

export type GroupedFields = string[]; // 예시 타입, 실제 타입에 맞게 조정 필요

export type LabelsMap = {[key: string]: string}; // 예시 타입, 실제 타입에 맞게 조정 필요
