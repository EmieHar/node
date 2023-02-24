const connexion = require('./mysqlconfig.js')


exports.getAll = function(table, callback) {
    connexion.query(`SELECT * FROM `+ table, function(err,rows) {
       if(err) { console.error(err);} 
        callback(rows)
    })
}

exports.getById = function(table, id, callback) {
    connexion.query(`SELECT * FROM `+ table + ` WHERE id=`+id, function(err,row) {
       if(err) { console.error(err);} 
        callback(row[0])
    })
}