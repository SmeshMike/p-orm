const fs = require('fs');
const path = require('path')

const types = ["INT","INTEGER", "VARCHAR", "DATE", "TIME"]

/**
 * Create db table model based on table creation script.
 * Model cosists of name of column(key) and default value(value).
 * @param {String} scriptsPath - path to direcory with *.sql files.
 * @return {Object} model.
*/
function createModel(scriptsPath){
    let model = {'creationScript': scriptsPath};
    let regexprow = /\(([^)]+)\)/;
    let rows = scriptsPath.match(regexprow)[0];
    rows = rows.split(',');
    rows = rows.map(row => row.replace(/[()]/g, "").trim('\n','\t','\s'))
      
   for(let row in rows){
       let rowElements = rows[row].split(' ');
        if(rowElements.find(elem => types.includes(elem.toUpperCase())))
        {
            let defPos = Object.keys(rowElements).find(key => rowElements[key].toUpperCase() === "DEFAULT");
            if(defPos)
                if(rowElements.find(elem => elem.toUpperCase() === "INTEGER" || elem.toUpperCase() === "INT"))
                    model[rowElements[0]] = parseInt(rowElements[parseInt(defPos)+1]);
                else if(rowElements.find(elem => elem.toUpperCase() === 'VARCHAR'))
                    model[rowElements[0]] = rowElements[parseInt(defPos)+1].replace(/\'/g, "");
                else
                    model[rowElements[0]] = null;
            else
                model[rowElements[0]] = null;
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
function compileModelsByScripts(scriptsPath){
    let files = {};

    for(let filename of fs.readdirSync(scriptsPath))
    {
        files[filename] = fs.readFileSync(path.resolve(scriptsPath,filename),'utf-8');
    }

    let models = {}
    for(let filename in files){
        models[`${filename.slice(0, -4)}`] = createModel(files[filename]);
    }

    return models
}

module.exports = compileModelsByScripts;