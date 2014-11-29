/**
 * GET /deaths
 * Three Tragic Deaths
 */

exports.index = function(req, res) {
    res.render('deaths', {
        title: 'Three Tragic Deaths'
    });
};