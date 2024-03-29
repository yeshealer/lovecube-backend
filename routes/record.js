const express = require("express")
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/saveData").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        toFirstName: req.query.toFirstName,
        toLastName: req.query.toLastName,
        toNickName: req.query.toNickName,
        describe: req.query.describe,
        finalCardImage: req.body.finalCardImage,
        fromFirstName: req.query.fromFirstName,
        fromLastName: req.query.fromLastName,
        fromNickName: req.query.fromNickName,
        inscription: req.query.inscription,
        moreMessage: req.query.moreMessage,
        msgFinalCard: req.query.msgFinalCard,
        occasion: req.query.occasion,
        topCardImage: req.body.topCardImage,
        yourMail: req.query.yourMail,
        isFinalImage: req.query.isFinalImage,
        currentTime: Date.now()
    }
    db_connect.collection("collection").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    })
})

recordRoutes.route("/readData").get(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect.collection("collection").find({ yourMail: req.query.yourMail }).project({ finalCardImage: 0 }).toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
    })
})

recordRoutes.route("/getDataById").get(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect.collection("collection").find({ _id: ObjectId(req.query.uniqueId) }).toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
    })
})

recordRoutes.route("/updateEmail").post(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect.collection("collection").updateOne({ _id: ObjectId(req.query.uniqueId) }, [{ $set: { yourMail: req.query.yourMail } }], function (err, res) {
        if (err) throw err;
        response.json(res);
    })
})

recordRoutes.route("/updateFinalImage").post(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect.collection("collection").updateOne({ _id: ObjectId(req.query.uniqueId) }, [{ $set: { finalCardImage: req.body.finalCardImage } }], function (err, res) {
        if (err) throw err;
        response.json(res);
    })
})

module.exports = recordRoutes;