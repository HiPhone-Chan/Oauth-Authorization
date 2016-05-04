var clientId = 'test';
var clientSecret = 'mySecretOAuthSecret';

module.exports = {
    url: 'http://localhost:8080/oauth',
    username: 'admin',
    password: 'admin',
    clientId: clientId,
    clientSecret: clientSecret,
    authorization: new Buffer(clientId + ':' + clientSecret).toString('base64')
};
