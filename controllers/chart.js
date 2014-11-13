/**
 * Created by Andrew on 11/12/2014.
 */

/**
 * GET /chart
 * Home page.
 */

exports.index = function(req, res) {
    res.render('chart', {
        title: 'Lyrical Chart'
    });
};