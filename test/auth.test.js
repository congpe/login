
var request = require('request');
var config = require('../config.json');
var bcrypt = require('bcryptjs');
var assert = require('chai').assert;
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

describe('services test', function(){
    describe('authentication', function(){
        it('authentication should be successful', function(done){
            var name = 'user2';
            var password = '123'
            db.users.findOne({ username: name }, function (err, user) {
                if (err) throw err;
                assert.isTrue(bcrypt.compareSync(password, user.hash))
                done();
            });
        })
    })
})



