export type KyJsonResponse<T> = Promise<T>;

export type ServiceFunc<Params = unknown, Res = unknown> = (
  params: Params,
) => KyJsonResponse<Res>;
