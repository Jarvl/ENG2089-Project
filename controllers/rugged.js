/**
 * Created by Andrew on 11/3/2014.
 */
/**
 * GET /rugged
 * Home page.
 */

exports.index = function(req, res) {
    res.render('rugged', {
        title: "It Ain't always Rugged"
    });
};