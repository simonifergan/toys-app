const mongoService = require('./mongo.service');

const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    login,
    signup,
    getById,
    update,
    remove
}

const usersCollection = 'users';

function query() {
    sortBy = {
        username: 1
    }

    return mongoService.connect()
        .then(db => db.collection(usersCollection)
            .find({})
            .sort(sortBy)
            .toArray()
        );

}

function login(credentials) {

    return mongoService.connect()
        .then(db => db.collection(usersCollection)
            .findOne(credentials)
        )
        .then(user => {
            if (!user) return null;
            delete user.password;
            return user;
        });
}

function getById(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection(usersCollection).findOne({ _id }));
}

function signup(user) {
    console.log(user.username)
    return mongoService.connect()
        .then(db =>
            db.collection(usersCollection).findOne({ username: user.username })
                .then(res => {
                    if (!res) return db.collection(usersCollection).insertOne(user)
                    else throw ('Username already taken');
                }))
        .then(mongoRes => {
            delete user.password;
            return user;
        });
}

function update(user) {
    const strId = user._id;
    user._id = new ObjectId(user._id);

    return mongoService.connect()
        .then(db => db.collection(usersCollection).updateOne({ _id: user._id }, { $set: user }))
        .then(mongoRes => {
            user._id = strId;
            return user;
        });
}

function remove(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection(usersCollection).remove({ _id }));
}

