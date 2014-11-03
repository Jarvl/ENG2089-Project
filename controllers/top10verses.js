/**
 * Created by Andrew on 11/3/2014.
 */
/**
 * GET /top10verses
 * Home page.
 */

exports.index = function(req, res) {
    res.render('top10verses', {
        title: 'Top 10 Deepest Verses in Hip-Hop History'
    });
};