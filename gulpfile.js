'use strict'

var gulp = require('gulp'),
	gp = require('gulp-load-plugins')(),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync').create(),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = ('gulp-autoprefixer');

// Работа с Pug
gulp.task('pug', function() {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(gp.plumber())
		.pipe(gp.pug({
			pretty: true
		}))
		.pipe(gulp.dest('build'))
		.on('end',browserSync.reload);
});

// Работа с Sass
gulp.task('sass', function() {
	return gulp.src('src/static/sass/main.sass')
		.pipe(sourcemaps.init())
		.pipe(gp.plumber())
		.pipe(gp.sass({}))
		.pipe(gp.autoprefixer({
			browsers: ['last 10 versions']
		}))

		.on("error", notify.onError(function(error) {
			return "Message to the notifier: " + error.message;
		}))
		.pipe(gp.csso())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/static/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Browsersync
gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: 'build'
		}
	});
});

// Работа с JS
gulp.task('scripts', function() {
	return gulp.src([
			// Библиотеки
			'build/static/libs/magnific/jquery.magnific-popup.min.js',
			'build/static/libs/bxslider/jquery.bxslider.min.js',
			'build/static/libs/maskedinput/maskedinput.js',
			'build/static/libs/slick/slick.min.js',
			'build/static/libs/validate/jquery.validate.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/static/js'))
		.pipe(browsersync.reload({
			stream: true
		}));
});

gulp.task('watch',function () {
	gulp.watch('src/pug/**/*.pug',gulp.series('pug'));
	gulp.watch('src/static/sass/*.sass',gulp.series('sass'))
});

gulp.task('default',gulp.series(
	gulp.parallel('pug','sass'),
	gulp.parallel('watch','serve')
));
