/**
 * Created by Andrew on 11/6/2014.
 */

var sha1 = require('sha1');

/**
 * POST /webhook
 * Update the repo
 */


exports.webhook = function(req, res) {
    var jsonPayload = req.body;
    console.log(jsonPayload.ref);
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