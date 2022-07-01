const fs = require("fs");
const path = require("path");

const typeMap = {
  VARCHAR: String,
  "CHARACTER VARYING": String,
  CHARACTER: String,
  CHAR: String,
  TEXT: String,
  SMALLINT: Number,
  INTEGER: Number,
  BIGINT: Number,
  DECIMAL: Number,
  NUMERIC: Number,
  REAL: Number,
  "DOUBLE PRECISION": Number,
  SMALLSERIAL: Number,
  SERIAL: Number,
  BIGSERIAL: Number,
  TIMESTAMP: Date,
  TIME: Date,
  TIME: Date,
  INTERVAL: Date,
  BOOLEAN: Boolean,
};

/**
 * Create db table model based on table creation script.
 * Model cosists of name of column(key) and default value(value).
 * @param {String} scriptsPath - path to direcory with *.sql files.
 * @return {Object} model.
 */
function createModel(scriptsPath) {
  // let model = {'creationScript': scriptsPath};
  let model = {};
  let regexprow = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/;
  let rows = scriptsPath.match(regexprow)[0];
  rows = rows.split(",");
  rows = rows.map((row) => row.replace(/[()]/g, "").trim("\n", "\t", "s"));
  kek = Object.values(rows);
  for (let row of rows) {
    postgreType = Object.keys(typeMap).find((v) =>
      row.toUpperCase().includes(v)
    );

    if (postgreType) {
      let name = row.split(" ")[0];
      model[name] = typeMap[postgreType];
    }
  }
  return model;
}

/**
 * Create array of db table models based on table creation script.
 * Function cuts of last 4 chars of files to get rid of extention(*.txt, *.sql)
 * Model names will be created by name of script files.
 * @param {String} scriptsPath - path to direcory with *.sql files.
 * @return {Array[Object]} array of models.
 */
function compileModelsByScripts(scriptsPath) {
  let files = {};

  for (let filename of fs.readdirSync(scriptsPath)) {
    files[filename] = fs.readFileSync(
      path.resolve(scriptsPath, filename),
      "utf-8"
    );
  }

  let models = {};
  for (let filename in files) {
    models[`${filename.slice(0, -4)}`] = createModel(files[filename]);
  }

  return models;
}

module.exports = compileModelsByScripts;
