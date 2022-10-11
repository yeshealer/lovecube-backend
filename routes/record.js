const express = require("express")
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/saveData").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        toFirstName: req.body.toFirstName,
        toLastName: req.body.toLastName,
        toNickName: req.body.toNickName,
        describe: req.body.describe,
        finalCardImage: req.body.finalCardImage,
        fromFirstName: req.body.fromFirstName,
        fromLastName: req.body.fromLastName,
        fromNickName: req.body.fromNickName,
        inscription: req.body.inscription,
        moreMessage: req.body.moreMessage,
        msgFinalCard: req.body.msgFinalCard,
        occasion: req.body.occasion,
        topCardImage: req.body.topCardImage,
        yourMail: req.body.yourMail,
        currentTime: Date.now()
    }
    db_connect.collection("collection").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    })
})

recordRoutes.route("/readData").get(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect.collection("collection").find({ yourMail: req.body.yourMail }).toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
    })
})

module.exports = recordRoutes;