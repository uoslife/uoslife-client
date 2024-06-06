import {ApiResponse, FieldData, GroupedFields, LabelsMap} from '../types';
import {GROUP_FIELDS, LABEL_MAPS} from '../configs/constants';

class BusinessLogic {
  fieldsData: FieldData[];

  groupedFields: GroupedFields[];

  labelsMap: LabelsMap;

  constructor(apiResponse: ApiResponse) {
    this.fieldsData = Object.entries(apiResponse).map(([key, value]) => ({
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
}

export default BusinessLogic;
