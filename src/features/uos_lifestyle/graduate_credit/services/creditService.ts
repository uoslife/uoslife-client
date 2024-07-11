import {
  ApiResponse,
  GroupedFields,
  LabelsMap,
  GeneralEducationDetailList,
} from '../types';
import {GROUP_FIELDS, LABEL_MAPS, BUTTONS_LABEL} from '../configs/constants';

class BusinessLogic {
  private apiResponse: ApiResponse;
  // 교양 세부정보
  private necessarySubjectCredit: GeneralEducationDetailList;
  private groupedFields: GroupedFields[];
  private labelsMap: LabelsMap;

  constructor(
    apiResponse: ApiResponse,
    necessarySubjectCredit: GeneralEducationDetailList,
  ) {
    this.apiResponse = apiResponse;
    this.necessarySubjectCredit = necessarySubjectCredit;
    this.groupedFields = GROUP_FIELDS;
    this.labelsMap = LABEL_MAPS;
  }

  // 과목 종류에 따른 학점 리턴
  private getSubjectCredit(field: string): {current: number; total: number} {
    switch (field) {
      case 'allCredit':
        return {
          current: this.apiResponse.allCredit.current ?? 0,
          total: this.apiResponse.allCredit.total ?? 0,
        };
      case 'commonElective':
        return {
          current: this.apiResponse.commonElective ?? 0,
          total: 0,
        };
      case 'major.requirement':
        return {
          current: this.apiResponse.major.requirement.current ?? 0,
          total: this.apiResponse.major.requirement.total ?? 0,
        };
      case 'major.elective':
        return {
          current: this.apiResponse.major.elective.current ?? 0,
          total: this.apiResponse.major.elective.total ?? 0,
        };
      case 'generalEducation.requirement':
        return {
          current: this.apiResponse.generalEducation.requirement.current ?? 0,
          total: this.apiResponse.generalEducation.requirement.total ?? 0,
        };
      case 'generalEducation.elective':
        return {
          current: this.apiResponse.generalEducation.elective.current ?? 0,
          total: this.apiResponse.generalEducation.elective.total ?? 0,
        };
      case 'generalEducation.minmax':
        return {
          current: 0,
          total: this.apiResponse.generalEducation.minmax.max,
        };
      case 'doubleMajor.requirement':
        return {
          current: this.apiResponse.doubleMajor.requirement.current ?? 0,
          total: this.apiResponse.doubleMajor.requirement.total ?? 0,
        };
      case 'doubleMajor.elective':
        return {
          current: this.apiResponse.doubleMajor.elective.current ?? 0,
          total: this.apiResponse.doubleMajor.elective.total ?? 0,
        };
      case 'minor.requirement':
        return {
          current: this.apiResponse.minor.requirement.current ?? 0,
          total: this.apiResponse.minor.requirement.total ?? 0,
        };
      case 'minor.elective':
        return {
          current: this.apiResponse.minor.elective.current ?? 0,
          total: this.apiResponse.minor.elective.total ?? 0,
        };
      default:
        return {current: 0, total: 0};
    }
  }

  // 선택, 필수 합산
  private calculateSum(fields: string[]): {current: number; total: number} {
    return fields.reduce(
      (sums, field) => {
        const {current, total} = this.getSubjectCredit(field);
        return {
          current: sums.current + current,
          total: sums.total + total,
        };
      },
      {current: 0, total: 0},
    );
  }

  // label이 미이수 과목 포함되었는지 확인
  private isCompletedCreditStatus(
    label: string,
    inCompletedSubject: {
      label: string;
      current: number | null;
      total: number | null;
    }[],
  ): boolean {
    return inCompletedSubject.some(subject => subject.label === label);
  }

  public tags() {
    const inCompletedSubject = this.getInCompletedSubjects();
    return this.groupedFields.map(fields => {
      const {current, total} = this.calculateSum(fields);
      const baseLabel = fields[0].split('.')[0];
      const label = this.labelsMap[baseLabel];

      // generalEducation의 경우 minmax.min을 total로 설정
      const adjustedTotal =
        baseLabel === 'generalEducation'
          ? this.apiResponse.generalEducation.minmax.min
          : total;

      // 필수, 선택 모두 이수 했는지 확인
      // 전공 | 교양 | 복전 | 부전 중 필수, 선택 중 하나라도 total > current면 false
      let status = true;
      switch (baseLabel) {
        case 'major':
          status =
            !this.isCompletedCreditStatus('전공 필수', inCompletedSubject) &&
            !this.isCompletedCreditStatus('전공 선택', inCompletedSubject);
          break;
        case 'doubleMajor':
          status =
            !this.isCompletedCreditStatus(
              '복수전공 필수',
              inCompletedSubject,
            ) &&
            !this.isCompletedCreditStatus('복수전공 선택', inCompletedSubject);
          break;
        case 'minor':
          status =
            !this.isCompletedCreditStatus('부전공 필수', inCompletedSubject) &&
            !this.isCompletedCreditStatus('부전공 선택', inCompletedSubject);
          break;
        case 'generalEducation':
          status =
            !this.isCompletedCreditStatus('교양 필수', inCompletedSubject) &&
            !this.isCompletedCreditStatus('교양 선택', inCompletedSubject);
          break;
        default:
          status = true;
          break;
      }

      return {
        label,
        current,
        total: adjustedTotal,
        status,
      };
    });
  }

  // 미이수 과목 리턴
  public getInCompletedSubjects() {
    const result: {
      label: string;
      current: number | null;
      total: number | null;
    }[] = [];

    this.groupedFields.forEach(group => {
      group.forEach(field => {
        const {current, total} = this.getSubjectCredit(field);
        const buttonConfig = BUTTONS_LABEL.find(btn => btn.key === field);
        if (buttonConfig && current < total) {
          result.push({
            label: buttonConfig.label,
            current,
            total,
          });
        }
      });
    });
    // 교양 세부 정보에 의한 이수 판별 로직 추가
    this.necessarySubjectCredit.forEach(subject => {
      if (subject.courseRequirement > subject.courseTotal) {
        if (subject.courseType === 'Elective') {
          result.push({
            label: '교양 선택',
            current: subject.courseTotal,
            total: subject.courseRequirement,
          });
        } else {
          result.push({
            label: '교양 필수',
            current: subject.courseTotal,
            total: subject.courseRequirement,
          });
        }
      }
    });
    return result;
  }
}

export default BusinessLogic;
