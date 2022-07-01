// This nodule contains functions that supports requests creation
//  Here you can find type conversion for SQL, object processing for SQL functions, etc.

/**
 * Returns wrapped values into COUNT()
 * @param {Object} values - comma separated values to count
 * @return {String}  return wrapped values
 */
function count(...values) {
  return `${values.map((x) => `COUNT(${x})`).join(", ")} `;
}

/**
 * Returns wrapped values into MAX()
 * @param {Object} values - comma separated values to get max of
 * @return {String}  return wrapped values
 */
function max(...values) {
  return `${values.map((x) => `MAX(${x})`).join(", ")} `;
}

/**
 * Returns wrapped values into MIN()
 * @param {Object} values - comma separated values to get min of
 * @return {String}  return wrapped values
 */
function min(...values) {
  return `${values.map((x) => `MIN(${x})`).join(", ")} `;
}

/**
 * Returns wrapped values into AVG()
 * @param {Object} values - comma separated values to get avg of
 * @return {String}  return wrapped values
 */
function avg(...values) {
  return `${values.map((x) => `AVG(${x})`).join(", ")} `;
}

/**
 * Returns wrapped values into SUM()
 * @param {Object} values - comma separated values to get sum of
 * @return {String}  return wrapped values
 */
function sum(...values) {
  return `${values.map((x) => `SUM(${x})`).join(", ")} `;
}

/**
 * Returns wrapped values into DISTINCT()
 * @param {Object} values - comma separated values to get distinct
 * @return {String}  return wrapped values
 */
function distinct(...values) {
  return `${values.map((x) => `DISTINCT ${x}`).join(", ")} `;
}

/**
 * Auxillary function for date part convertion into SQL format
 * @param {Object} value - year, month, day, hour or second
 * @return {String}  sting format of date part
 */
function twoDigits(d) {
  if (0 <= d && d < 10) return "0" + d.toString();
  if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
  return d.toString();
}

/**
 * Converts this date into SQL format
 * @return {String}  sting format of date
 */
Date.prototype.dbDate = function () {
  return (
    "'" +
    this.getFullYear() +
    "-" +
    twoDigits(1 + this.getMonth()) +
    "-" +
    twoDigits(this.getDate()) +
    "'"
  );
};

/**
 * Converts this date time into SQL format
 * @return {String}  sting format of time
 */
Date.prototype.dbTime = function () {
  return (
    "'" +
    twoDigits(this.getHours()) +
    ":" +
    twoDigits(this.getMinutes()) +
    ":" +
    twoDigits(this.getSeconds()) +
    "'"
  );
};

module.exports = { count, max, min, avg, sum, distinct };
