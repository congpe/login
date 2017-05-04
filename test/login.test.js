var request = require('request');
var config = require('../config.json');
var assert = require('chai').assert;
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

describe('login test', function () {
    it('login successful',function(done){
        var user = {
            username: 'user2',
            password: '123'
        };
        request.post('http://localhost:3000/login', {form: user}, function(err, httpResponse, body){
            if(err) throw err;
            assert.equal(body,'Found. Redirecting to /')
            done();
        })
    })
})

