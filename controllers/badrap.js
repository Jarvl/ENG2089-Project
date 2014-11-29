/**
 * Created by Andrew on 11/29/2014.
 */

/**
 * GET /badrap
 * Bad Rap
 */

exports.index = function(req, res) {
    res.render('badrap', {
        title: 'Bad Rap'
    });
};