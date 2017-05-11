
var request = require('request');
var assert = require('chai').assert;


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
                assert.equal(response.statusCode, 200);
                done();
            })

        })
    })

})