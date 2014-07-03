var async = require("async");
var mongoose = require('mongoose');

var urlstring = "mongodb://localhost/HelloMongoose";
console.log("node js server started");
mongoose.connect(urlstring, function (err) {
    if(err)
        console.log("error connection to DB"+err);
    else
        console.log("successfully connected to the server");
});


async.waterfall([function (callback) {
        var igDatabase = new mongoose.Schema({
            name: String,
            age: Number,
            gender: String,
            mobile: String,
            address: {type: Object},
            dep_name: String,
            salary: Number
        });
        var igModel = mongoose.model("Intelligrape", igDatabase);
        callback(null,igModel);
    },
        function (igModel, callback) {
            var newUser = new igModel({
                name: "sandeep kumar",
                age: 25,
                gender: 'male',
                mobile: '9555082881',
                address: {
                    houseNo: 'g138',
                    sector: 22,
                    city: 'noida',
                    state: 'UP',
                    pin: 201301
                },
                dep_name: 'Ninja',
                salary: 10000
            });
            callback(null, newUser, igModel);
        },

        function (newUser, igModel, callback) {
            newUser.save(function (err) {
                if (err)
                    throw new err;
                else
                    console.log("a new user is saved");
            });
            callback(null,igModel)
        },
        function (igModel, callback) {
            igModel.find({}).exec(function (err, result) {
                if (err)
                    throw new err;
                else {
                    console.log("--------result after saving new user: --------\n"+result);
                }
            });
            callback(null, igModel);
        },
        function (igModel, callback) {
            igModel.update({name: "sandeep kumar"}, { mobile: "9632149xyz" }, {multi: true}, function (err) {
                if (err)
                    throw new err;
                else
                    console.log("record is updated successfully");
            });
            callback(null,igModel);
        },
        function (igModel, callback) {
            igModel.find({}).exec(function (err, result) {
                if (err)
                    throw new err;
                else {
                    console.log("--------result after updating record---------\n"+result);
                }
            });
            callback(null, igModel);
        },
        function (igModel, callback) {
            igModel.remove({name: "sandeep kumar"}, function (err) {
                if (err)
                    throw new err;
                else
                    console.log("record is removed successfully");
            });
            callback(null,igModel);
        },
        function (igModel, callback) {
            igModel.find({}).exec(function (err, result) {
                if (err)
                    throw new err;
                else {
                    console.log("----------result after removing record-------");
                    console.log(result);
                }
            });
            callback(null, "waterfall module work suceessfully ");
        }
    ],
    function (err, results) {
        console.log(results);
    }
);
