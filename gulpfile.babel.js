import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import csslint from 'gulp-csslint';

const BOOTSTRAP_JS_DIR = './bootstrap-sass/assets/javascripts/bootstrap/';
let enabledJs = [
	'modal',
	'collapse'
];

gulp.task('sass', () => {
	gulp.src('./sass/style.scss')
	.pipe(plumber())
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(autoprefixer())
	.pipe(csslint())
	.pipe(gulp.dest('./css'))
	.pipe(csslint.reporter());
});
gulp.task('bootstrapJs', () => {
	let jsFiles = [];

	for (var i in enabledJs) {
		jsFiles.push(BOOTSTRAP_JS_DIR + enabledJs[i] + '.js');
	}

	gulp.src(jsFiles)
		.pipe(concat('bootstrap.js'))
		.pipe(gulp.dest('./js/'));

});
gulp.task('js', ['bootstrapJs'], () => {
	gulp.src(['./js/bootstrap.js', './js/app.js'])
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('watch', () => {
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./js/app.js', ['js']);
});
