/**
 * Adds quotes to value if given value is string and contains special arguments of SQL.
 * @param {Object} value - The author of the book.
 * @return {Boolean} if you need to add qoutes to request.
*/
function ifStringOrDefault(value) {
  return typeof value === "string" && !['CURRENT', '<', '>', '=', 'NULL'].some(el => value.toUpperCase().includes(el));
}

/**
 * Processes objects to append request string depending on type of request.
 * @param {String} type - string name of request type (insert/update).
 * @param {Object} args - dictionary of elements to add to request.
 * @return {String} appending request string.
*/
function reqStringProcceser(type, args) {
  let req = "";
  if (type === "insert") {
    
    let fields = "(" + Object.keys(args).join(',') + ")";
    let values = "(" + Object.values(args).map(value => ifStringOrDefault(value) ? "'" + value + "'" : value).join(',') + ")";

    req += fields + " VALUES " + values + " ";
  } else if (type === "update") {
    req +=Object.keys(args).map(key => ifStringOrDefault(args[key]) ? key+ "='" + args[key] + "'" : key+ "=" +args[key]).join(", ") + " ";
  }
  return req;
}

module.exports = {reqStringProcceser}