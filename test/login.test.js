
var request = require('request');
var assert = require('chai').assert;

describe('login test', function () {
    it('login successful',function(done){
        var user = {
            username: 'user10',
            password: '123'
        };
        request.post('http://localhost:3000/login', {form: user}, function(err, response, body){
            if(err) throw err;
            assert.equal(body, 'Found. Redirecting to /');
            done();
        })
    })
})

