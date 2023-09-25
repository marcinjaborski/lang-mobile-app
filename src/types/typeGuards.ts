export const isNotNullable = <T>(obj: T): obj is NonNullable<T> => {
  return obj !== null && obj !== undefined;
};
