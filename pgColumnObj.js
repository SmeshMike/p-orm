/**
 * Class of object that might be contained in database.
 * @constructor creates PgObj instance with model of table, table name, pgConnection and !!!names of fields!!!.
 * @lt creates "less than" expression for SQL request
 * @gt creates "greater than" expression for SQL request
 * @lte creates "less than or equal" expression for SQL request
 * @gte creates "greater than or equal" expression for SQL request
 * @eq creates "equal" expression for SQL request
 * @ne creates "not equal" expression for SQL request
 * @like creates "like" expression for SQL request
 */
class PgColumnObj {
  /**
   * Creates PgColumnObj object.
   * @param {Object} value - value of object.
   * @param {Object} type - type of object.
   * @return {PgString} this
   */
  constructor(value, type) {
    this.value = value;
    this.type = typeof type();
    return this;
  };

  /**
   * Returns "less than" expression with this string and value
   * @param {Object} value - value to compare with
   * @return {String}  return sting expression
   */
  lt = function (value) {
    isTypeOf(value, this.type);
    value = prepareStringForRequest(value);
    return this + "<" + value;
  };

  /**
   * Returns "greater than" expression with this string and value
   * @param {Object} value - value to compare with
   * @return {String}  return sting expression
   */
  gt = function (value) {
    isTypeOf(value, this.type);
    value = prepareStringForRequest(value);
    return this.value + ">" + value;
  };

  /**
   * Returns "less than or equal" expression with this string and value
   * @param {Object} value - value to compare with
   * @return {String}  return sting expression
   */
  lte = function (value) {
    isTypeOf(value, this.type);
    value = prepareStringForRequest(value);
    return this.value + "<=" + value;
  };

  /**
   * Returns "greater than or equal" expression with this string and value
   * @param {Object} value - value to compare with
   * @return {String}  return sting expression
   */
  gte = function (value) {
    isTypeOf(value, this.type);
    value = prepareStringForRequest(value);
    return this.value + ">=" + value;
  };

  /**
   * Returns "equal" expression with this string and value
   * @param {Object} value - value expected to be equal
   * @return {String}  return sting expression
   */
  eq = function (value) {
    isTypeOf(value, this.type);
    value = prepareStringForRequest(value);
    let sign = value === null ? " IS " : "=";
    return this.value + sign + value;
  };

  /**
   * Returns "not equal" expression with this string and value
   * @param {Object} value - value expected to be not equal
   * @return {String}  return sting expression
   */
  ne = function (value) {
    value = prepareStringForRequest(value);
    let sign = value === null ? " IS NOT " : "<>";
    return this.value + sign + value;
  };

  /**
   * Returns "like" expression with this string and value
   * @param {Object} value - value expected to be alike
   * @return {String}  return sting expression
   */
  like = function (value) {
    value = prepareStringForRequest(value);
    return this.value + `LIKE %${value}%`;
  };
}

/**
 * Checks if type of object same with expected and throws TypeError if it isn't
 * @param {Object} a - object to check
 * @param {Object} bType - type to check for
 * @return {String} returns value
 */
function isTypeOf(a, bType) {
  let aType = typeof a;
  if (aType !== bType) throw TypeError(`${aType} is not equal to ${bType}`);
};

/**
 * Adds quotes to value if it is a string
 * @param {Object} value - number of rows output limit
 * @return {String} returns value
 */
function prepareStringForRequest(value) {
  return typeof value === "string" ? "'" + value + "'" : value;
};

module.exports = PgColumnObj;
