/**
 * Created by Andrew on 11/3/2014.
 */
/**
 * GET /theftorhomage
 * Home page.
 */

exports.index = function(req, res) {
    res.render('theftorhomage', {
        title: 'Theft or Homage?'
    });
};