/**
 * Created by Andrew on 11/6/2014.
 */

var crypto = require('crypto');
var execFile = require('child_process').execFile;


/**
 * POST /webhook
 * Update the repo
 */

exports.webhook = function(req, res) {

    // JSON payload from Github
    var jsonPayload= req.body;

    // Read the signature header from Github
    reqGithubHash = req.header('X-Hub-Signature');
    console.log(reqGithubHash);

    // Define secret (from Github) and stringify the payload to use as data for the SHA1 HMAC Hex Digest
    var secret = 'Every. Single. Night.';
    var data = JSON.stringify(jsonPayload);

    // Compute the hash using the secret as the key, and the payload as the data to hash
    var computedHash = crypto.createHmac('sha1', secret).update(data).digest('hex');
    computedHash = "sha1=" + computedHash;
    console.log(computedHash);

    // Compare the two hashes to see if the secrets matched
    if (reqGithubHash == computedHash) {

        // If the secrets matched and the push was to the master branch, update the local repo and send a '200 OK' response
        if (jsonPayload.ref == "ref/heads/master") {
            // execFile('/var/www/gitpull.sh');
            res.status(200).send("Local repository updated!");
        }
        else {
            res.status(200).send("Local repository not updated! The master branch was not pushed.");
        }
    }
    // If the secrets didn't match, then send a '403 Forbidden' response
    else {
        res.status(403).send("Secrets do not match.");
    }
};


/**
 * GET /webhook
 * Tell people that this is the webhook stuff
 */

exports.index = function (req, res) {
    res.status(200).send("This URL is used for webhooks and webhooks only");
};