const isInteger = (n) => {
  return typeof n === "number" && isFinite(n) && Math.round(n) === n;
};
module.exports = isInteger;
