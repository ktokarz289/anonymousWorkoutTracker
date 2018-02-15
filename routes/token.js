var express = require('express');
var router = express.Router();

const { OAuth2Client } = require('google-auth-library');

const keys = require('../keys/google_identity.json');
const oAuth2Client = new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
  );

router.post('/signin', function(req, res, next) {
    oAuth2Client.verifyIdToken({
        idToken: req.body.idtoken,
        audience: keys.web.client_id
    }, 
    function(e, login) {
        var payload = login.getPayload();
        var userid = payload.sub;
    });
});

module.exports = router;