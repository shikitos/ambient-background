type ClassNames = Array<string | boolean | null | undefined>;

export const concatClassNames = (...classNames: ClassNames) => {
  return classNames.filter((i) => i).join(' ');
};
