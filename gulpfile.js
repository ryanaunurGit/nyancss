var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglifyjs = require('gulp-uglify');
var uglifycss = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-string-replace');
var pump = require('pump');
var banner = require('gulp-banner');
var pkg = require('./package.json');

var path = {
	css: ['css/nyancss.css'],
	js: ['js/nyancss.js']
};

var comment = '/*\n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright 2017, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';

gulp.task('css', function() {
 return gulp.src(path.css)
 	.pipe(sourcemaps.init())
 	.pipe(banner(comment, {
        pkg: pkg
    }))
	.pipe(prefix({
	    browsers: ["> 0%"]
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(rename("nyan.css"))
	.pipe(gulp.dest("release/css/"))
	.pipe(uglifycss())
	.pipe(rename("nyan.css"))
	.pipe(gulp.dest("release/css/"));
});

gulp.task('js', function(cb) {
 pump([
 	gulp.src(path.js),
 	sourcemaps.init(),
 	banner(comment, {
        pkg: pkg
    }),
 	sourcemaps.write('.'),
	gulp.dest('release/js/'),
	rename("nyan.min.js"),
	uglifyjs(),
	gulp.dest("release/js/")
 ], cb)
});


