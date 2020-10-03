const SRC_DIR = './src/';
const DIST_DIR = './';
const DIST_FILES = DIST_DIR + '**';

const Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES, 
    css: {  
        dir: SRC_DIR + 'css',
        src: SRC_DIR + 'css/**/*.css',
        dist: DIST_DIR + 'css'
    },  
    sass: {  
        dir: SRC_DIR + 'sass',
        src: SRC_DIR + 'sass/**/*.{sass,scss}',
        dist: DIST_DIR + 'css'
    },  
    js: {  dir: SRC_DIR + 'js',
        src: SRC_DIR + 'js/**/*.js',
        dist: DIST_DIR + 'js',
        build_name: 'build.js'
    },
    scripts: {  dir: SRC_DIR + 'scripts',
        src: SRC_DIR + 'scripts/**/*.js',
        dist: DIST_DIR + 'scripts'            
    },
    img: {  
        dir: SRC_DIR + 'images',
        src: SRC_DIR + 'images/**/*',
        dist: DIST_DIR + 'images'
    }  
};

module.exports = Config;