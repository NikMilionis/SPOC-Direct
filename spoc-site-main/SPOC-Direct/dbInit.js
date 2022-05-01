const mongoose = require("mongoose");
const csvParse = require("csv-parser")
const fs = require('fs');

const results1 = [];
const results2 = [];
const results3 = [];
const results4 = [];


let presList = [];
let vpList = [];
let secrList = [];
let tresList = [];


mongoose.connect('mongodb://localhost:27017/spocDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

//I thought this was america! Why can I make multiple databases at the same
// time to make it more complicated than it should be.'land of the free'

// mongoose.connect('mongodb://localhost:27017/ElectVpDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });
// mongoose.connect('mongodb://localhost:27017/ElectSecrDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });
// mongoose.connect('mongodb://localhost:27017/ElectTresDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });

const presSchema = {
    Votes: Number,
    Candidate: String
}
const vpSchema = {
    Votes: Number,
    Candidate: String
}
const secrSchema = {
    Votes: Number,
    Candidate: String
}
const tresSchema = {
    Votes: Number,
    Candidate: String
}

const Pres = mongoose.model('Pres', presSchema);
const Vp = mongoose.model('Vp', vpSchema);
const Secr = mongoose.model('Secr', secrSchema);
const Tres = mongoose.model('Tres', tresSchema);



fs.createReadStream(__dirname + "/public/js/out2.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results1.push(data)).on('end', () => {
    results1.forEach(function (info) {
        presList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    Pres.insertMany(presList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})


fs.createReadStream(__dirname + "/public/js/vpElect.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results2.push(data)).on('end', () => {
    //console.log(results)
    results2.forEach(function (info) {
        vpList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    Vp.insertMany(vpList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})
fs.createReadStream(__dirname + "/public/js/secrElect.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results3.push(data)).on('end', () => {

    results3.forEach(function (info) {
        secrList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    Secr.insertMany(secrList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})
fs.createReadStream(__dirname + "/public/js/tresElect.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results4.push(data)).on('end', () => {
    //console.log(results)
    results4.forEach(function (info) {
        tresList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    //console.log(carList)
    Tres.insertMany(tresList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})

//const rawdata = fs.readFileSync(__dirname + "/data100.csv");
//const dataString = rawdata.toString()
//const dataParse = JSON.parse(dataString)
//console.log(dataParse)