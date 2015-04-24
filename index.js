var transform_tools = require('browserify-transform-tools'),
    path = require('path'),
    cwd = process.cwd();


module.exports = transform_tools.makeRequireTransform('fix-node_modules-requires', {
    evaluateArguments: true
}, function(args, opts, done) { 
    var r = args[0];

    if( r[0] != '.' ) { 
        var resolved;
        try { 
            resolved = require.resolve(args[0]);
        } catch(e) { 
            console.warn(e);
            done();
            return;
        }
        if( resolved.indexOf('node_modules') == -1 ) {
            console.warn('should fix', r);
            r = path.relative(path.dirname(opts.file), cwd+'/'+r);
            if( r[0] != '.' ) { 
                r = './' + r;
            }
            console.warn('fixed to', r);
        }
    }

    done(null, 'require("'+r+'")');
});
