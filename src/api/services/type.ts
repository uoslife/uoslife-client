export type KyJsonResponse<T> = Promise<T>;

export type ServiceFunc<Params = unknown | undefined, Res = unknown> = (
  params?: Params,
) => KyJsonResponse<Res>;

export type ErrorResponseType = {
  code: string;
  message: string;
  status: number;
};
