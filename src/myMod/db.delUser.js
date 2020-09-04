const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let config = require("./db.connection");

let delUSer = async (input) => {
    try {
        username = input.username;
        let connection = mysql.createConnection(config.user_config);
        await connection.connectAsync();
        let sql = "delete from user_details where username=?";
        await connection.queryAsync(sql, [username]);
        await connection.endAsync();
    }
    catch (err) {
        console.log("Error =>" + err);
    }
}

module.exports = { delUSer };