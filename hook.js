/**
 * Created by Andrew on 10/30/2014.
 */
// Listen on port 9001
var gith = require('gith').create( 9001 );
// Import execFile, to run our bash script
var execFile = require('child_process').execFile;

gith({
    repo: 'Jarvl/ENG2089-Project'
}).on( 'all', function( payload ) {
    if( payload.branch === 'master' )
    {
        // Exec a shell script
        execFile('/var/www/hook.sh', function(error, stdout, stderr) {
            // Log success in some manner
            console.log( 'exec complete' );
        });
    }
});