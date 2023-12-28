export type MygradeInfoType = {
  courseName: string;
  grade?: string;
  credit: number;
  registerCount: number;
  accuracy: number;
  isPublic: boolean;
};

export type MygradeCurrentAverageGradeType = {
  currentAverageGrade: string;
  totalCredit: string;
  hiddenCredit: string;
};

export type GetMygradeParams = undefined;
export type GetMygradeRes = Array<MygradeInfoType>;
export type GetMygradeCurrentAverageGradeParams = undefined;
export type GetMygradeCurrentAverageGradeRes = MygradeCurrentAverageGradeType;

export const mockDataArray: Array<MygradeInfoType> = [
  {
    courseName: '시대생의 이해1',
    grade: '4.5',
    credit: 3,
    registerCount: 20,
    accuracy: 59,
    isPublic: true,
  },
  {
    courseName: '시대생의 이해2',
    grade: '4.5',
    credit: 3,
    registerCount: 20,
    accuracy: 59,
    isPublic: true,
  },
  {
    courseName: '시대생의 이해3',
    grade: '4.0',
    credit: 3,
    registerCount: 20,
    accuracy: 89,
    isPublic: false,
  },
  {
    courseName: '시대생의 이해4',
    grade: '4.0',
    credit: 2,
    registerCount: 14,
    accuracy: 58,
    isPublic: false,
  },
];
