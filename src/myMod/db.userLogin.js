let Promise = require("bluebird");
let mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let config = require("./db.connection");
const { resolve, reject } = require("bluebird");

let authenticateUser = async (input) => {
    let username = input.username;
    let password = input.password;
    //console.log([username, password]);

    try {
        let connection = mysql.createConnection(config.user_config);
        await connection.connectAsync();
        let sql = "select username, pass from user_details where username=? and pass=?";
        let result = await connection.queryAsync(sql, [username, password]);
        await connection.endAsync();
        console.log(result[0].username);

        if (username === result[0].username) {

            if (password === result[0].pass) {
                return resolve;
            }
            else {
                return reject;
            }
        }
        else {
            return reject;
        }

    }
    catch (err) {
        console.log("Error in Login Auth : " + err);
    }



}

// let inputJason = {
//     username: "_itskunal",
//     password: "123456789"
// }
// let resp = authenticateUser(inputJason);
// console.log(resp);

module.exports = { authenticateUser }