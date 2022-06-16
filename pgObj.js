const PgRequest = require("./pgRequest")

/**
 * Db table object.
 * @constructor creates PgObj instance with model of table, table name, pgConnection and !!!names of fields!!!.
 * @model attribute of model of db table
 * @tableName attribute of name of table in database
 * @_pgConnecter attribute of PgConnecter instanse with db coonnection
 * @select function returning PgRequest instanse of select request
 * @update function returning PgRequest instanse of update request
 * @insert function returning PgRequest instanse of insert request
 * @delete function returning PgRequest instanse of delete request
*/ 
class PgObj{
    /**
     * Creates connection for db object.
     * @param {String} tableName - name of table in database.
     * @param {PgConnecter} connecter - db connection  object.
     * @param {Object} model - model of object, based on table creation script.
     * @return {PgObj} this
    */
    constructor(tableName, connecter, model) {
        Object.keys(model).map(key => this[key] = tableName + '.' + key)
        this.tableName = tableName;
        this._pgConnecter = connecter;
        this.model = model
        return this;
      }
    
    /**
     * Starts select request.
     * @param {Object} fields - comma separated elements to select
     * @return {PgRequest} instatnce of PgRequest of current PgObj with request beginning.
    */
    select(...fields) {
        return new PgRequest(this.tableName, this._pgConnecter).select(fields);
    };

    /**
     * Starts update request.
     * @param {Object} fields - elements to update {elemName : newValue, ...}
     * @return {PgRequest} instatnce of PgRequest object of current PgObj with request beginning.
    */
    update(fields) {
        return new PgRequest(this.tableName, this._pgConnecter).update(fields);
    };

    /**
     * Starts insert request.
     * @param {Object} fields - elements to insert {elemName : value, ...}
     * @return {PgRequest} instatnce of PgRequest object of current PgObj with request beginning.
    */
    insert(fields) {
        return new PgRequest(this.tableName, this._pgConnecter).insert(fields);
    };

    /**
     * Starts delete request.
     * @return {PgRequest} instatnce of PgRequest object of current PgObj with request beginning.
    */
    delete() {
        return new PgRequest(this.tableName, this._pgConnecter).delete();
    };
}

module.exports = PgObj