// 더미데이터 타입 지정
interface CreditDetails {
  current: number | null;
  total: number | null;
}
// 더미데이터 객체 타입
interface ApiResponse {
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

const dummyData: ApiResponse = {
  allCredit: {
    current: 70,
    total: 130,
  },
  majorRequirement: {
    current: 18,
    total: 24,
  },
  majorElective: {
    current: 18,
    total: 48,
  },
  generalEducationRequirement: {
    current: 14,
    total: 14,
  },
  generalEducationElective: {
    current: 20,
    total: 20,
  },
  doubleMajorRequirement: {
    current: null,
    total: null,
  },
  doubleMajorElective: {
    current: null,
    total: null,
  },
  minorRequirement: {
    current: null,
    total: null,
  },
  minorElective: {
    current: null,
    total: null,
  },
  commonElective: 0,
};

export default dummyData;
