export type KyJsonResponse<T> = Promise<T>;

export type ServiceFunc<Params = unknown | undefined, Res = unknown> = (
  params: Params,
) => KyJsonResponse<Res>;

export type ServiceFuncWithoutParams<Res = unknown> = () => KyJsonResponse<Res>;

export interface IErrorResponse extends Error {
  code: ErrorCode;
  status: number;
  date: Date;
}

export type ErrorCode =
  | 'C01'
  | 'C02'
  | 'C03'
  | 'C04'
  | 'U01'
  | 'U02'
  | 'U03'
  | 'U04'
  | 'U05'
  | 'U06'
  | 'U07'
  | 'U08'
  | 'U09'
  | 'CS01'
  | 'T01'
  | 'T02'
  | 'D01'
  | 'T03'
  | 'T04'
  | 'T05'
  | 'T06'
  | 'N01'
  | 'N02'
  | 'N03'
  | 'V01'
  | 'V02'
  | 'V03'
  | 'V04'
  | 'V05'
  | 'V06'
  | 'V07'
  | 'E01'
  | 'E02'
  | 'J01'
  | 'S01'
  | 'S02'
  | 'S03'
  | 'S04'
  | 'S05'
  | 'S06'
  | 'A01'
  | 'A02'
  | 'M01'
  | 'M02'
  | 'M03'
  | 'M04'
  | 'M05'
  | 'LH01'
  | 'LH02'
  | 'CA01'
  | 'A03'
  | 'B01'
  | 'L01'
  | 'L02'
  | 'L03'
  | 'L04'
  | 'L05'
  | 'L06'
  | 'L07'
  | 'L08'
  | 'CR01'
  | 'CR02'
  | 'R01'
  | 'R02'
  | 'UR01';
