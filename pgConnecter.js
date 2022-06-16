const pgp = require("pg-promise")();

/**
 * DB connection object.
 * @constructor creates PgConnecter instance
 * @connection - pg-promise connection to DB
*/
class PgConnecter{

  /**
   * Creates object with DB connection.
  */
  constructor() {
    this.connection;
  }

  /**
   * Creates connection for DB object.
   * @param {String} uri - path to direcory with *.sql files.
   * @return {Boolean} true if connection created.
  */
  async connect(uri) {
    const db = pgp(uri);
    await db
      .connect()
      .catch(function (error) {
        console.log("ERROR:", error.message);
      });
    this.connection = db;
    return true;
  };
}

module.exports = PgConnecter;
