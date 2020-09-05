const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let config = require("./db.connection");

let updateUserData = async (input) => {

    try {
        let connection = mysql.createConnection(config.user_config);
        await connection.connectAsync();
        let sql = "UPDATE user_details SET fname =?, lname =? , username=?, email=?, phone=? WHERE id=?";
        console.log(input);
        let result = await connection.queryAsync(sql, [input.fname, input.lname, input.username, input.email, input.phone, input.id]);
        console.log(result);
        await connection.endAsync();

    }
    catch (err) {
        console.log("Error=> " + err);
    }

}



let updatePassword = async (input) => {

    try {

        let connection = mysql.createConnection(config.user_config);
        await connection.connectAsync();

        console.log(input.username);
        let sql = "update user_details set pass=? WHERE username=?"
        let result = connection.queryAsync(sql, [input.password, input.username]);
        return result;
        connection.endAsync();

    } catch (err) {
        console.log("Error inside function=>" + err);
    }
};


module.exports = { updateUserData, updatePassword };