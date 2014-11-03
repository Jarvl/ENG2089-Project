/**
 * GET /deaths
 * Home page.
 */

exports.index = function(req, res) {
    res.render('deaths', {
        title: 'Three Tragic Deaths'
    });
};