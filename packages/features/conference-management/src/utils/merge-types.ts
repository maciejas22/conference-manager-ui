export type CommonProperties<T, U> = {
  [K in keyof T & keyof U]: T[K];
};

export type UniqueProperties<T, U> = {
  [K in Exclude<keyof T, keyof U>]?: T[K];
} & {
  [K in Exclude<keyof U, keyof T>]?: U[K];
};

export type MergeTypes<T, U> = CommonProperties<T, U> & UniqueProperties<T, U>;
