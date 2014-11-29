/**
 * Created by Andrew on 11/3/2014.
 */

/**
 * GET /rugged
 * It Ain't Always Rugged
 */

exports.index = function(req, res) {
    res.render('rugged', {
        title: "It Ain't Always Rugged"
    });
};