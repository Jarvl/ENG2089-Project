/**
 * Created by Andrew on 11/3/2014.
 */
/**
 * GET /theftorhomage
 * Theft or Homage?
 */

exports.index = function(req, res) {
    res.render('theftorhomage', {
        title: 'Theft or Homage?'
    });
};