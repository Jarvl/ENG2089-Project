/**
 * Created by Andrew Jarvis on 11/6/2014.
 */

// Module for computing the sha1 hash
var crypto = require('crypto');
// Module for synchronously executing a shell command (because child_process.exec is asynchronous which sucks for this application)
var sh = require('execSync');
// Module for reading the file containing the secret
fs = require('fs');

/**
 * POST /webhook
 * Remember to define the post request in app.js
 * Remember to define bodyparser middleware in app.js
 *
 * Purpose of this code: Update the repo when a json payload is posted to this page
 * defining a push to the master branch.
 *
 * HUGE NOTE: The URL of your webhook NEEDS to be CSRF whitelisted in app.js, or the
 * webhook will not work at all.
 *
 * Middleware for CSRF Whitelisting (taken from sahat/hackathon-starter):
 *
 * var csrfExclude = ['/yourwebhookurl'];
 *
 * app.use(function(req, res, next) {
 *   // CSRF protection.
 *   if (_.contains(csrfExclude, req.path)) return next();
 *   csrf(req, res, next);
 * });
 *
 * ANOTHER HUGE NOTE: Do NOT store your webhook secret in this file. If your file
 * is available on Github, anyone and everyone can see your secret, which is a no-no.
 * For my webhook, I keep the secret in a text file and add that file to my .gitignore
 * until I find a better way to store it.
 *
 * Protip for storing your secret in, say, a .txt file: Making a file via command line
 * will for some reason add an extra return to the file, which will cause the two hashes
 * to be different. I recommend using a text editor to make the file, saving it, then
 * uploading it to your server.
 *
 * THIS SHOULD ONLY BE USED IN A DEVELOPMENT ENVIRONMENT
 */

exports.webhook = function(req, res) {

    // Store JSON payload sent from Github and stringify it to use for the SHA1 HMAC Hex Digest function
    var jsonPayload= req.body;
    var jsonPayloadString = JSON.stringify(jsonPayload);

    // Read the signature header that contains the sha1 hash from Github
    var reqGithubHash = req.header('X-Hub-Signature');

    // Read the file with the secret. The relative directory for fs.readFileSync is the process.cwd() (The directory where the server file was launched)
    var secret = fs.readFileSync('secret.txt', 'utf-8');

    // Compute the hash using the secret as the key, and the payload as the data to hash
    var computedHash = crypto.createHmac('sha1', secret).update(jsonPayloadString).digest('hex');
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
 * Remember to define the GET request in app.js
 * If someone tries to GET this page,
 * Just tell them there's nothing here for them
 */

exports.index = function (req, res) {
    res.status(200).send("This URL is used for webhooks and webhooks only!");
};