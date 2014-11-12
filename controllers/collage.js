/**
 * Created by Andrew on 11/11/2014.
 */

/**
 * GET /collage
 * Home page.
 */

exports.index = function(req, res) {
    res.render('collage', {
        title: 'Album Collage'
    });
};