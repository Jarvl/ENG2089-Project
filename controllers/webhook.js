/**
 * Created by Andrew on 11/6/2014.
 */

// Library for computing the sha1 hash
var crypto = require('crypto');
// Library for synchronously executing a shell command (because child_process.exec is asynchronous which sucks for this application)
var sh = require('execSync');


/**
 * POST /webhook
 * Update the repo
 */

exports.webhook = function(req, res) {

    // JSON payload from Github
    var jsonPayload= req.body;

    // Read the signature header that contains the sha1 hash from Github
    reqGithubHash = req.header('X-Hub-Signature');

    // Define secret (specified on Github) and stringify the payload to use for the SHA1 HMAC Hex Digest function
    var secret = 'Every. Single. Night.';
    var data = JSON.stringify(jsonPayload);

    // Compute the hash using the secret as the key, and the payload as the data to hash
    var computedHash = crypto.createHmac('sha1', secret).update(data).digest('hex');
    computedHash = "sha1=" + computedHash;

    // Compare the two hashes to see if the secrets matched
    if (reqGithubHash == computedHash) {

        // This makes sure that a push to the master branch will update the server (This can obviously be changed)
        if (jsonPayload.ref == "refs/heads/master") {

            // Execute the shell command
            var code = sh.run('cd /var/www && git pull');
            console.log('return code ' + code);

            // Tell Github that everything went peachy
            res.status(200).send("Local repository updated!");
        }
        else {
            // If the branch is not master, tell Github, but still send a 200 status
            res.status(200).send("Local repository not updated! The master branch was not changed.");
        }
    }
    // If the secrets didn't match, then send a '403 Forbidden' response
    else {
        res.status(403).send("Secrets do not match.");
    }
};


/**
 * GET /webhook
 * This is not a GET URL
 * If someone tries to GET this page,
 * Just tell them there's nothing here for them
 */

exports.index = function (req, res) {
    res.status(200).send("This URL is used for webhooks and webhooks only!");
};