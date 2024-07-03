import {CoreAPI} from '../../../../api/services';
import {IErrorResponse} from '../../../../api/services/type';

export class HiddenGradeService {
  static async getHiddenGrade(isFirstAccess: boolean) {
    try {
      if (isFirstAccess) return await CoreAPI.getHiddenGrade();
      const res = await this.updateHiddenGrade();
      return res;
    } catch (error) {
      const err = error as IErrorResponse;
      if (err.code === 'M01') {
        return await this.updateHiddenGrade();
      }
      return null;
    }
  }

  static async updateHiddenGrade() {
    try {
      return await CoreAPI.updateHiddenGrade();
    } catch (error) {
      return null;
    }
  }
}
