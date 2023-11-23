/** object에 undefined type을 추가합니다. */
type AddUndefined<T> = {[K in keyof T]?: T[K]};

export default AddUndefined;
