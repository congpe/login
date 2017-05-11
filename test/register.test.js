
var request = require('request');
var config = require('../config.json');
var assert = require('chai').assert;
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

describe('register test', function(){
    function makeName()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    var name = makeName();
    var data = {
        firstName: 'huang',
        lastName: 'wei',
        username: name,
        password: '234'
    };

    it('register function tested!', function(done) {
        request.post('http://localhost:3000/register', {form: data}, function (err, response, body) {
            if (err) throw err;
            assert.equal(body, 'Found. Redirecting to /login');
            request.post('http://localhost:3000/register', {form: data}, function (err, response, body){
                if(err) throw err;
                assert.notEqual(response.statusCode, 302);
                db.users.remove({username: data.username});
                done();
            })

        })
    })

})