const gulp = require('gulp'),
    concat =require('gulp-concat'), //合併檔案
    cleanCSS = require('gulp-clean-css'), //壓縮css
    uglify = require('gulp-uglify'), //壓縮js
    rename = require('gulp-rename'), //重新命名檔案
    imagemin = require('gulp-imagemin'), //壓縮圖片
    bable = require('gulp-babel'), //轉換ES6
    sass = require('gulp-sass'), //sass轉換
    include = require('gulp-file-include'), //合併檔案
    autoprefixer = require('gulp-autoprefixer'), //prefix
    del = require('del'),
    Config = require('./gulpfile.config.js'),
    browserSync = require('browser-sync').create();
    sass.compiler = require('node-sass');

function pro(){
    function runSass(){
        return gulp.src(Config.sass.src)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(Config.sass.dist));
    }

    function runJs(){
        return gulp.src(Config.js.src)
        .pipe(bable())
        .pipe(uglify())
        .pipe(gulp.dest(Config.js.dist));
    }
    
    function runScripts(done){
        let page_lib = [
            {
                // "name": "index",
                // "lib": ["./src/scripts/modernizr-webp.js","./src/scripts/jquery-3.4.1.min.js"]
            }
        ]
        function output_loop(key){
            return gulp.src(page_lib[key].lib)
            .pipe(concat({
                path: page_lib[key].name + "_lib.js",
                stat: { mode: 0666 }
            }))
            .pipe(gulp.dest(Config.scripts.dist));
        }
        for( var i in page_lib ){
            output_loop(i);
        }
        done();
    }

    gulp.task('pro',gulp.series(runSass,runJs,runScripts),function(done){
        done();
    })
}

module.exports = pro;