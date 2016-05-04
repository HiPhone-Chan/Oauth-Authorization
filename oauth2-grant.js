var request = require('request');
var querystring = require('querystring');
var async = require('async');
var clientConst = require('./client.constant');

var request = request.defaults({
    jar: true
});

var authorizationCodeGrant = function(getAccessToken) {
    async.waterfall([

        (callback) => {
            var url = clientConst.url + '/authorize?response_type=code&client_id=' + clientConst.clientId;

            request(url, (err, resp, body) => {
                var reg = /name='_csrf' value='(.*)' \/>/;
                var match = reg.exec(body);
                callback(null, match[1]);
            }).auth(clientConst.username, clientConst.password);
        },
        (csrf, callback) => {
            var url = clientConst.url + '/authorize';
            request.post(url, (err, resp, body) => {
                var location = resp.headers.location;
                callback(null, location);
            }).form({
                user_oauth_approval: true,
                _csrf: csrf,
                'scope.read': true,
                'scope.write': true,
                'scope.trust': true
            });
        },
        (location, callback) => {
            var reg = /(.*)\?code=(.*)/;
            var match = reg.exec(location);
            var redirectUri = match[1];
            var code = match[2];

            var url = clientConst.url + '/token';

            request.post(url, (err, resp, body) => {
                callback(null, body);
            }).form({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: clientConst.clientId
            }).auth(clientConst.clientId, clientConst.clientSecret);

        }

    ], (err, result) => {
        if (err != null) {
            console.log(err);
        }
        getAccessToken(result);
    });
}


var implicitGrant = function(getAccessToken) {
    async.waterfall([

        (callback) => {
            var url = clientConst.url + '/authorize?response_type=token&client_id=' + clientConst.clientId;

            request(url, (err, resp, body) => {
                var reg = /name='_csrf' value='(.*)' \/>/;
                var match = reg.exec(body);
                callback(null, match[1]);
            }).auth(clientConst.username, clientConst.password);
        },
        (csrf, callback) => {
            var url = clientConst.url + '/authorize';
            request.post(url, (err, resp, body) => {
                var location = resp.headers.location;
                callback(null, location);
            }).form({
                user_oauth_approval: true,
                _csrf: csrf,
                'scope.read': true,
                'scope.write': true,
                'scope.trust': true
            });
        },
        (location, callback) => {
            var reg = /(.*)#(.*)/;
            var match = reg.exec(location);
            callback(null, match[2]);
        }

    ], (err, result) => {
        if (err != null) {
            console.log(err);
        }
        getAccessToken(result);
    });
}

var passwordGrant = function(getAccessToken) {
    var options = {
        url: clientConst.url + '/token',
        form: {
            grant_type: 'password',
            username: clientConst.username,
            password: clientConst.password
        }
    };
    request.post(options, (err, resp, body) => {
        getAccessToken(body);
    }).auth(clientConst.clientId, clientConst.clientSecret);
}

var clientCredentialsGrant = function(getAccessToken) {
    var options = {
        url: clientConst.url + '/token',
        form: {
            grant_type: 'client_credentials'
        }
    };

    request.post(options, (err, resp, body) => {
        getAccessToken(body);
    }).auth(clientConst.clientId, clientConst.clientSecret);
}

module.exports = {
    authorizationCodeGrant: authorizationCodeGrant,
    implicitGrant: implicitGrant,
    passwordGrant: passwordGrant,
    clientCredentialsGrant: clientCredentialsGrant
}
