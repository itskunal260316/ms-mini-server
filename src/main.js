const Promise = require("bluebird");
const mysql = require("mysql");
const express = require("express");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);


const addUser = require("./myMod/db.Adduser");
const authUser = require("./myMod/db.userLogin");
const getUdata = require("./myMod/db.getAllData");
const updateUser = require("./myMod/db.updateUser");
const deleteUser = require("./myMod/db.delUser");
const userMsg = require("./myMod/db.saveUserMsg");

const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/usernameValid", async (req, res) => {

    try {

        const input = req.body;
        console.log("Input Value from user = " + input);
        let recData = await addUser.checkUsername(input)
        res.send(recData);

    } catch (err) {
        res.json("false");
        console.log("Error =>" + err);
    }

});


app.post("/usernameEmail", async (req, res) => {

    try {

        const input = req.body;
        console.log("Input Value from user = " + input);
        let recData = await addUser.checkEmail(input)
        res.send(recData);

    } catch (err) {
        res.json("false");
        console.log("Error =>" + err);
    }

});

app.post("/adduser", async (req, res) => {

    try {

        const input = req.body;
        let recData = await addUser.addUser(input)
        const resjson = { message: "Registration done" };
        res.json("UserAdded");

    } catch (err) {
        console.log("Error =>" + err);
    }

});



app.post("/login", async (req, res) => {

    try {

        const input = req.body;
        if (await authUser.authenticateUser(input)) {
            res.json("true");
        }
        else {
            res.json("false");
        }

    } catch (err) {
        console.log("Error =>" + err);
        res.json(err);
    }

});



app.post("/getAllData", async (req, res) => {

    try {

        const input = req.body;
        let result = await getUdata.fetchUserData(input);
        if (result) {
            res.json(result);
        }

    } catch (err) {
        console.log("Error =>" + err);
        res.json(err);
    }

});



app.post("/updateUser", async (req, res) => {

    try {

        const input = req.body;
        console.log(input);
        await updateUser.updateUserData(input);
        res.json("updated");

    } catch (err) {
        console.log("Error =>" + err);
        res.json(err);
    }

});



app.post("/delData", async (req, res) => {

    try {

        const input = req.body;
        console.log(input);
        await deleteUser.delUSer(input);
        res.json("deleted");

    } catch (err) {
        console.log("Error =>" + err);
        res.json(err);
    }

});


app.post("/saveMsg", async (req, res) => {

    try {

        const input = req.body;
        let resp = await userMsg.saveMsg(input);
        res.send(resp);

    } catch (err) {
        console.log("Error =>" + err);
    }

});


app.post("/changePassword", async (req, res) => {

    try {
        const input = req.body;
        console.log(input);
        let resp = await updateUser.updatePassword(input);
        res.send(resp);

    } catch (err) {

        console.log("Error in main=>" + err);
    }


});




app.listen(5700);