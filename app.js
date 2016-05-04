var events = require('events');
var async = require('async');
var querystring = require('querystring');
var oauth2 = require('./oauth2-grant');

var getAccessToken = (accessTokenString) => {
    var accessToken = querystring.parse(accessTokenString)
    console.log(accessToken);
}

async.series([
    (callback) => {
        // console.log('Authorization Code Grant');
        oauth2.authorizationCodeGrant(getAccessToken);
        callback();
    },
    (callback) => {
        // console.log('Implicit Grant');
        oauth2.implicitGrant(getAccessToken);
        callback();
    },
    (callback) => {
        // console.log('Resource Owner Password Credentials Grant');
        oauth2.passwordGrant(getAccessToken);
        callback();
    },
    (callback) => {
        // console.log('Client Credentials Grant');
        oauth2.clientCredentialsGrant(getAccessToken);
        callback();
    }
], function(err, results) {
    if (err != null)
        console.log(err);
});
