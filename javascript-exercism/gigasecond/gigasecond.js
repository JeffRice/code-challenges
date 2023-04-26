//
// This is only a SKELETON file for the 'Gigasecond' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
  const GIGASECOND = 10 ** 12
export const gigasecond = (d) => {
  return new Date(Date.UTC(70, 0, 1, 0, 0, 0, d.getTime() + GIGASECOND));
};
