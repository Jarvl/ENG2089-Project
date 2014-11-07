/**
 * Created by Andrew on 11/6/2014.
 */

var crypto = require('crypto');

/**
 * POST /webhook
 * Update the repo
 */


exports.webhook = function(req, res) {

    // JSON payload from Github
    var jsonPayload= req.body;
    console.log(jsonPayload.ref);

    // Read the signature header from Github
    reqGithubHash = req.header('X-Hub-Signature');
    console.log(reqGithubHash);

    // Define secret (from Github) for SHA1 HMAC Hex Digest
    var secret = 'Every. Single. Night.';

    // Compute the hash using the secret as the key, and the payload as the data to hash
    var computedHash = crypto.createHmac('sha1', secret).update(jsonPayload).digest('hex');
    console.log(computedHash);

    res.status(200).send(jsonPayload);
};

/**
 * GET /webhook
 * Tell people that this is the webhook stuff
 */

exports.index = function (req, res) {
    var jsonResponse = {
        object1: "sometext1",
        object2: "sometext2",
        object3: "sometext3"
    };
    res.json(jsonResponse);
};