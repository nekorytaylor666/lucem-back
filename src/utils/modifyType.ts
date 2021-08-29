export type Modify<
  T,
  R extends {
    [key in keyof T]?: any;
  },
> = Omit<T, keyof R> & R;
