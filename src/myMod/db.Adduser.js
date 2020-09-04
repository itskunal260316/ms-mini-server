const Promise = require("bluebird");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let config = require("./db.connection");


let addUser = async (input) => {


    const fname = input.fname;
    const lname = input.lname;
    const username = input.username;
    const email = input.email;
    const password = input.userpass;
    const phone = input.userphone;
    //console.log([fname, lname, username, email, password, phone]);
    try {

        let connection = mysql.createConnection(config.user_config);

        await connection.connectAsync();

        let sql = "insert into user_details (fname, lname, username, email, pass, phone) values (?,?,?,?,?,?)";
        let result = await connection.queryAsync(sql, [fname, lname, username, email, password, phone]);

        await connection.endAsync();

    }
    catch (err) {
        console.log(err);
    }

};




let checkUsername = async (input) => {

    try {
        let connection = mysql.createConnection(config.user_config);
        await connection.connectAsync();
        let sql = "select username from user_details where username=?";
        let res = await connection.queryAsync(sql, [input.username]);
        return res;

    }
    catch (err) {
        console.log("Error =>" + err);
    }


}


let checkEmail = async (input) => {

    try {
        let connection = mysql.createConnection(config.user_config);
        await connection.connectAsync();
        let sql = "select email from user_details where email=?";
        let res = await connection.queryAsync(sql, [input.email]);
        return res;

    }
    catch (err) {
        console.log("Error =>" + err);
    }


}


module.exports = { addUser, checkUsername, checkEmail };
