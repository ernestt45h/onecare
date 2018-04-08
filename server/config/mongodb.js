/**
 * Created by Quasar on 4/1/2018.
 */

var mongodb = function(dbhost, db, dbport, dbuser, dbpass){

    console.log('dbhost', dbhost)
    console.log('db', db)

    if (!dbhost) throw 'Database host name not provided'
    if (!dbport) dbport = 27017
    if (!db) throw 'Database name not provided'

    if (dbuser && dbpass){
        return 'mongodb://' + dbuser + ':' +dbpass + '@' + dbhost + ':' + dbport + '/' + db
    }else {
        return 'mongodb://' + dbhost + ':' + dbport + '/' + db
    }
}

module.exports = mongodb