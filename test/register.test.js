var request = require('request');
var config = require('../config.json');
var assert = require('chai').assert;
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

describe('register test', function(){
    var data = {
        firstName: 'huang',
        lastName: 'wei',
        username: 'user0',
        password: '234'
    };

    it('username already exist', function(done){
        db.users.findOne(
            {username: data.username},
            function (err, user) {
                if (err) throw err;
                assert.isObject(user)
                done();
            });
    })

    it('new user registered!', function(done) {
        db.users.findOne(
            {username: data.username},
            function (err, user) {
                if (err) throw err;

                if (user) {
                    // username already exists
                    data.username += 'test';
                }
                request.post('http://localhost:3000/register', {form: data}, function (err, httpResponse, body) {
                    if (err) throw err;
                    assert.equal(body, 'Found. Redirecting to /login')
                    db.users.remove({username: data.username});
                    done();
                })
            });

    })

})