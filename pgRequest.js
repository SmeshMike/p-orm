const {reqStringProcceser} = require("./tools.js")

/**
 * Db request object.
 * @constructor creates PgRequest instance with , table name, pgConnection and names of fields
 * @reqstring attribute of request string
 * @tableName attribute of name of request table
 * @_pgConnecter attribute of PgConnecter instanse with db coonnection
 * @where function returning this, apending 'where part' to request
 * @update function returning this, apending 'update part' to request
 * @insert function returning this, apending 'insert part' to request
 * @delete function returning this, apending 'delete part' to request
 * @crossJoin function returning this, apending 'crossJoin part' to request
 * @innerJoin function returning this, apending 'innerJoin part' to request
 * @leftJoin function returning this, apending 'leftJoin part' to request
 * @rightJoin function returning this, apending 'rightJoin part' to request
 * @fullJoin function returning this, apending 'fullJoin part' to request
 * @selfJoin function returning this, apending 'selfJoin part' to request
 * @groupBy function returning this, apending 'groupBy part' to request
 * @orderBy function returning this, apending 'orderBy part' to request
 * @limit function returning this, apending 'limit part' to request
 * @toStr function returning string of created request
 * @exec function executiong the request and returning result of request
*/ 
class PgRequest{
    /**
     * Creates connection for db object.
     * @param {String} tableName - name of table in database.
     * @param {PgConnecter} connecter - db connection  object.
     * @return {PgRequest} this
    */
    constructor(tableName, connecter) {
        this.reqstring = '';
        this.tableName = tableName;
        this._pgConnecter = connecter;
        return this;
      }

    /**
     * Appends SELECT part to request string in object.
     * @param {Object} values - comma separated elements to select
     * @return {PgRequest} this
    */
    select(...values) {
      values = values.length && ['*']
      this.reqstring+= `SELECT ${values.join(', ')} FROM ${this.tableName} `;
      return this;
    };
    
    /**
     * Appends WHERE part to request string in object.
     * @param {Object} values - comma separated elements for where condition
     * @return {PgRequest} this
    */
    where(...values) {
      this.reqstring += `WHERE ${values.join(' AND ')}`
      return this;
    };
    
    /**
     * Appends UPDATE part to request string in object.
     * @param {Object} values - dict of elements to update {elemName : newValue, ...}
     * @return {PgRequest} this
    */
    update(values) {
      this.reqstring+=` UPDATE ${this.tableName} SET ` +  reqStringProcceser("update",values);
      return this;
    };

    /**
     * Appends INSERT part to request string in object.
     * @param {Object} fields - elements to insert {elemName : value, ...}
     * @return {PgRequest} this PgRequest object
    */
    insert(values) {
      this.reqstring+= ` INSERT INTO ${this.tableName} ` +  reqStringProcceser("insert",values);
      return this;
    };

    /**
     * Appends DELETE part to request string in object.
     * @return {PgRequest} this PgRequest object
    */
    delete() {
      this.reqstring+= ` DELETE FROM ${this.tableName} `;
      return this;
    };
    
    /**
     * Appends CROSS JOIN part to request string in object.
     * @param {PgObj} joinObj - table object to join
     * @param {Object} onCond - comma separated elements expected to be equal in tables
     * @return {PgRequest} this PgRequest object
    */
    crossJoin(joinObj, onCond) {
      this.reqstring+= this.#join("CROSS JOIN", joinObj, onCond);
      return this;
    };

    /**
     * Appends INNER JOIN part to request string in object.
     * @param {PgObj} joinObj - table object to join
     * @param {Object} onCond - comma separated elements expected to be equal in tables
     * @return {PgRequest} this PgRequest object
    */
    innerJoin(joinObj, onCond) {
      this.reqstring+= this.#join("INNER JOIN", joinObj, onCond);
      return this;
    };

    /**
     * Appends LEFT JOIN part to request string in object.
     * @param {PgObj} joinObj - table object to join
     * @param {Object} onCond - comma separated elements expected to be equal in tables
     * @return {PgRequest} this PgRequest object
    */
    leftJoin(joinObj, onCond) {
      this.reqstring+= this.#join("LEFT JOIN", joinObj, onCond);
      return this;
    };

    /**
     * Appends RIGHT JOIN part to request string in object.
     * @param {PgObj} joinObj - table object to join
     * @param {Object} onCond - comma separated elements expected to be equal in tables
     * @return {PgRequest} this PgRequest object
    */
    rightJoin(joinObj, onCond) {
      this.reqstring+= this.#join("RIGHT JOIN", joinObj, onCond);
      return this;
    };

    /**
     * Appends FULL JOIN part to request string in object.
     * @param {PgObj} joinObj - table object to join
     * @param {Object} onCond - comma separated elements expected to be equal in tables
     * @return {PgRequest} this PgRequest object
    */
    fullJoin(joinObj, onCond) {
      this.reqstring+= this.#join("FULL JOIN", joinObj, onCond);
      return this;
    };

    /**
     * Appends SELF JOIN part to request string in object.
     * @param {PgObj} joinObj - table object to join
     * @param {Object} onCond - comma separated elements expected to be equal in tables
     * @return {PgRequest} this PgRequest object
    */
    selfJoin(joinObj, onCond) {
      this.reqstring+= this.#join("SELF JOIN", joinObj, onCond);
      return this;
    };

    /**
     * Inner function for all joins.
     * @param {String} joinType - type of JOIN(FULL JOIN, LEFT JOIN etc.)
     * @param {PgObj} joinObj - table object to join
     * @param {Object} onCond - comma separated elements expected to be equal in tables
     * @return {String} join request part
    */
    #join(joinType, joinObj, ...onCond) {
      return ` ${joinType} ${joinObj.tableName} ON ${onCond.map(x => `${this.tableName}.${x[0]}=${joinObj.tableName}.${x[1]}`)} `;
    };
    
    /**
     * Appends GROUP BY part to request string in object.
     * @param {String} values - comma separated elements of table by which to group by
     * @return {PgRequest} this PgRequest object
    */
    groupBy(...values) {
      this.reqstring+= ` GROUP BY ${values.join(', ')} `;
      return this;
    };
    
    /**
     * Appends ORDER BY part to request string in object.
     * @param {String} values - comma separated elements of table by which to order by
     * @return {PgRequest} this PgRequest object
    */
    orderBy(...values) {
      this.reqstring+= ` ORDER BY ${values.join(', ')} `;
      return this;
    };
    
    /**
     * Appends LIMIT part to request string in object.
     * @param {BigInteger} value - number of rows output limit 
     * @return {PgRequest} this PgRequest object
    */
    limit(value) {
      this.reqstring+= ` LIMIT ${value} `;
      return this;
    };
    
    /**
     * Returns request string.
     * @return {String} this PgRequest request string
    */
    toStr(){
      return this.reqstring + ';';
    };

    /**
     * Executes this PgRequest request string.
     * @return {String} this PgRequest request string return from DB.
    */
    async exec(){
      this.reqstring += ';';
      return await this._pgConnecter.connection.any(this.reqstring)
    };
}



module.exports = PgRequest;