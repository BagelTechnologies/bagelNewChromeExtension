export const arrayRemove = (arr: string[], value: string) => {
  return arr.filter(function (ele) {
    return ele != value;
  });
};
