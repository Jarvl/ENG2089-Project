/**
 * Created by Andrew on 11/12/2014.
 */

//var LineByLineReader = require('line-by-line')

/**
 * GET /chart
 * Home page.
 */

//lr = new LineByLineReader('big_file.txt');


exports.index = function(req, res) {
    res.render('chart', {
        title: 'Lyrical Chart'
    });
};