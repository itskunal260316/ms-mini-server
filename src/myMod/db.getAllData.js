const Promise = require("bluebird");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let config = require("./db.connection");

let fetchUserData = async (input) => {
    username = input.username;
    try {
        let connection = mysql.createConnection(config.user_config);
        await connection.connectAsync();
        let sql = "select fname, lname, username, email, phone, id from user_details where username=?";
        let result = await connection.queryAsync(sql, [username]);
        await connection.endAsync();
        console.log(result[0]);
        return result;
    }
    catch (err) {
        console.log("Error =>" + err);
    }
}

module.exports = { fetchUserData }