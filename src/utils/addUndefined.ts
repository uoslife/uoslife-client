/**
 * object에 undefined type을 추가합니다.
 * #### Example
 *
 * ```ts
 * type Object = {foo: 1};
 * type ObjectAddedUndefined = AddUndefined<Object> // {foo?: 1}
 * ```
 */
type AddUndefined<T> = {[K in keyof T]?: T[K]};

export default AddUndefined;
