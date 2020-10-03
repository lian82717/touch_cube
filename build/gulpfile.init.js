var gulp = require('gulp');
var mkdirp = require('mkdirp');
var Config = require('./gulpfile.config.js');
function init() {
    gulp.task('init', function (done) {
        var dirs = [Config.css.dir, Config.sass.dir, Config.js.dir, Config.img.dir,Config.scripts.dir];
        dirs.forEach(dir => {
            mkdirp.sync(dir);
        });
        done();
    });
}
module.exports = init;