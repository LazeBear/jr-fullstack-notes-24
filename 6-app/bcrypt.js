// playground

const bcrypt = require('bcryptjs');

const password = '12';

// const salt = bcrypt.genSaltSync(12);
const salt = '$2b$12$tNBr9gUK4JkCQn48KXxHSO';
// console.log(salt);
const hashed = bcrypt.hashSync(password, salt);

console.log(hashed);

// 123 + $2b$12$tNBr9gUK4JkCQn48KXxHSO
// $2b$12$tNBr9gUK4JkCQn48KXxHSOrDy/KSBhs8P2sdAfCfcGXVGZIinp1uO

// 12 + $2b$12$tNBr9gUK4JkCQn48KXxHSO
// $2b$12$tNBr9gUK4JkCQn48KXxHSOZe7Vs8efzJjq5agQBlB/SXEG31ku4cO

// (12 + $2b$12$tNBr9gUK4JkCQn48KXxHSO) hash * 12 -> $2b$12$tNBr9gUK4JkCQn48KXxHSOrDy/KSBhs8P2sdAfCfcGXVGZIinp1uO

// const result = bcrypt.compareSync('12', hashed);
// console.log(result);

// $2b$12$tNBr9gUK4JkCQn48KXxHSO rDy/KSBhs8P2sdAfCfcGXVGZIinp1uO
// $2b$12$tNBr9gUK4JkCQn48KXxHSO rDy/KSBhs8P2sdAfCfcGXVGZIinp1uO

// $2b$12$0yycgyj0efGB4jp/SAj8auC2U.Bg38Mfp65bgXnAH.HBN/HzoJmke
// $2b$12$1q8mQ79jmrnFVReXcj47HOuFGgxBm60jBTOjMaEMcb2pith33hXJi
