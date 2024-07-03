export type HiddenGradeInfoType = {
  courses: Array<HiddenGradeCourseType>;
  hiddenGradeSummary: {
    hiddenCredit: number;
    openCredit: number;
    averageGrade: number;
    totalCredit: number;
    totalGrade: number;
    semesterCredit: number;
  };
};
export type HiddenGradeCourseType = {
  id: number;
  courseName: string;
  grade: string;
  credit: number;
  registerCount: number;
  accuracy: number;
  isPublic: boolean;
  isVoted: boolean;
  votes: number;
};

export type HiddenGradeCurrentAverageGradeType = {
  currentAverageGrade: string;
  totalCredit: string;
  hiddenCredit: string;
};

export type GetHiddenGradeRes = HiddenGradeInfoType;
export type UpdateHiddenGradeRes = HiddenGradeInfoType;

export type SubmitHiddenGradeVoteParams = {courseId: number};
export type SubmitHiddenGradeVoteRes = HiddenGradeCourseType;
export type CancelHiddenGradeVoteParams = {courseId: number};
export type CancelHiddenGradeVoteRes = HiddenGradeCourseType;
