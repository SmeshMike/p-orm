const PgRequest = require("./pgRequest");

class GlobObj {
    /**
     * Creates db table object.
     * @param {pgPromise.IDatabase} connecter - db connection  object.
     * @return {PgObj} this
     */
    constructor(connecter) {
      this._pgConnecter = connecter;
      this.fields;
      return this;
    };  

  /**
   * Starts select request.
   * @param {Object} fields - comma separated elements to select
   * @return {PgRequest} instatnce of PgRequest of current PgObj with request beginning.
   */
    select(...fields) {
    this.fields = fields || ["*"];
    return this
  };

  /**
   * Starts select request.
   * @param {Object} fields - comma separated elements to select
   * @return {PgRequest} instatnce of PgRequest of current PgObj with request beginning.
   */
   from(from) {
    return new PgRequest(`(${from.reqstring})`, this._pgConnecter).select(this.fields);
  };
};

module.exports = GlobObj;