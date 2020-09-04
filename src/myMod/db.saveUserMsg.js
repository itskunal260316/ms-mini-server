const Promise = require("bluebird");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let config = require("./db.connection");


let saveMsg = async (input) => {


    const name = input.name;
    const email = input.email;
    const phone = input.phone;
    const message = input.msg;
    //console.log([fname, lname, username, email, password, phone]);
    try {

        let connection = mysql.createConnection(config.user_config);

        await connection.connectAsync();

        let sql = "insert into user_messages (name, email, phone, message) values (?,?,?,?)";
        let result = await connection.queryAsync(sql, [name, email, phone, message]);
        await connection.endAsync();
        return result;

    }
    catch (err) {
        console.log(err);
    }

};

module.exports = { saveMsg };
