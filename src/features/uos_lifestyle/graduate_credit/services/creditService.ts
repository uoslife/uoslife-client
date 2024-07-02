import {ApiResponse, GroupedFields, LabelsMap} from '../types';
import {GROUP_FIELDS, LABEL_MAPS, BUTTONS_LABEL} from '../configs/constants';

class BusinessLogic {
  private apiResponse: ApiResponse;
  private groupedFields: GroupedFields[];
  private labelsMap: LabelsMap;

  constructor(apiResponse: ApiResponse) {
    this.apiResponse = apiResponse;
    this.groupedFields = GROUP_FIELDS;
    this.labelsMap = LABEL_MAPS;
  }

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

  public tags() {
    return this.groupedFields.map(fields => {
      const {current, total} = this.calculateSum(fields);
      const baseLabel = fields[0].split('.')[0];
      const label = this.labelsMap[baseLabel];
      return {
        label,
        current,
        total,
        status: current >= total,
      };
    });
  }

  public getRemainingSubect() {
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
    console.log('result: ', result);
    return result;
  }
}

export default BusinessLogic;
