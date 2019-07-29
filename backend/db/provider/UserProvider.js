const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
var db = mongo.connect('mongodb://127.0.0.1/Pidrun');

class UserProvider {
    getUser() {

    }
}