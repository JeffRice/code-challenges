//
// This is only a SKELETON file for the 'Armstrong Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isArmstrongNumber = (d) => {
return String(d).split('').map((v) => Math.pow(v, String(d).length)).reduce((acc, c) => acc + c,  0) === d
};

