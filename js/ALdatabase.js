var db

function errorHandler(error) {
    console.error("SQL error: " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "ReviewAppDB";
        var version = "1.0";
        var displayName = "DB for review app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database ...");

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        function txFunction(tx) {

            function successDropCallback() {
                console.info("Success: table dropped successfully");
            }
            var options = [];

            var sql = "DROP TABLE IF EXISTS type;";

            tx.executeSql(sql, options, successDropCallback, errorHandler);


            var sql = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";


            function successCallback() {
                console.info("Success: table created successfully");
            }

            function callback() {
                console.info("Success: row created successfully");
            }

            tx.executeSql(sql, options, successCallback, errorHandler);

            var sql = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(sql, options, successCallback, errorHandler);

            var sql = "INSERT INTO type(name) VALUES('Others');";
            tx.executeSql(sql, options, callback , errorHandler);
            var sql = "INSERT INTO type(name) VALUES('Canadian');";
            tx.executeSql(sql, options, callback , errorHandler);
            var sql = "INSERT INTO type(name) VALUES('Asian');";
            tx.executeSql(sql, options, callback , errorHandler);
            var sql = "INSERT INTO type(name) VALUES('European');";
            tx.executeSql(sql, options, callback , errorHandler);
            var sql = "INSERT INTO type(name) VALUES('Australian');";
            tx.executeSql(sql, options, callback , errorHandler);


        }

        function successTransaction() {
            console.info("Success: Create table transaction is successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS type;";
            var options = [];

            function successCallback() {
                console.info("Success: table dropped successfully");
            }

            tx.executeSql(sql, options, successCallback, errorHandler  );

            var sql = "DROP TABLE IF EXISTS review;";

            tx.executeSql(sql, options, successCallback, errorHandler  );

        }
        function successTransaction() {
            console.info("Success: drop table transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction );
    }
};