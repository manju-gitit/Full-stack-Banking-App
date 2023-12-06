const MongoClient = require('mongodb').MongoClient;

//const url = 'mongodb://localhost:27017';
//const url = 'mongodb://mongo:27017';

const url = "mongodb+srv://curiosity:Testing@manjus-monogdb-cluster.qvghlgy.mongodb.net/?retryWrites=true&w=majority";
// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('manjus-app');
});

// create user account using the collection.insertOne function
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, role: ""};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc)
        });
    })
}

// create user account using the collection.insertOne function
function updateToAdmin(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .updateOne(
                { email: email },
                { $set: { role: "admin" } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}


// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
                        .collection('users')
                        .find({})
                        .toArray(function(err, docs) {
                            err ? reject(err) : resolve(docs);
        });
    })
}

module.exports = { create, updateToAdmin, findOne, find, update, all };