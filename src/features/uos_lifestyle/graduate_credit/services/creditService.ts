import {ApiResponse, FieldData, GroupedFields, LabelsMap} from '../types';
import {GROUP_FIELDS, LABEL_MAPS} from '../configs/constants';
import {BUTTONS_LABEL} from '../configs/constants';
class BusinessLogic {
  fieldsData: FieldData[];

  groupedFields: GroupedFields[];

  labelsMap: LabelsMap;

  constructor(apiResponse: ApiResponse) {
    this.fieldsData = Object.entries(apiResponse)
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => ({
        label: key,
        current: value.current,
        total: value.total,
      }));
    this.groupedFields = GROUP_FIELDS;
    this.labelsMap = LABEL_MAPS;
  }

  calculateSum(fields: string[]): {current: number; total: number} {
    let currentSum = 0;
    let totalSum = 0;

    fields.forEach(field => {
      const found = this.fieldsData.find(item => item.label === field);

      currentSum += found?.current ?? 0; // 옵셔널 체이닝과 널 병합 연산자를 공부해봅시다.
      totalSum += found?.total ?? 0;
    });

    return {current: currentSum, total: totalSum};
  }

  tags() {
    return this.groupedFields.map(fields => {
      const {current, total} = this.calculateSum(fields);
      const label = this.labelsMap[fields[0]];
      return {
        label,
        current,
        total,
        status: current >= total,
      };
    });
  }

  getFieldsWithIncompleteCredits() {
    const result: {
      label: string;
      current: number | null;
      total: number | null;
    }[] = [];

    this.groupedFields.forEach(group => {
      group.forEach(fieldLabel => {
        const field = this.fieldsData.find(item => item.label === fieldLabel);
        const buttonConfig = BUTTONS_LABEL.find(btn => btn.key === fieldLabel);
        if (
          field &&
          buttonConfig &&
          (field.current ?? 0) < (field.total ?? 0)
        ) {
          result.push({...field, label: buttonConfig.label});
        }
      });
    });
    return result;
  }
}

export default BusinessLogic;
