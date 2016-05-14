import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

const dirs = {
	src: './src/scss',
	dest: './app/build/css'
};

gulp.task('scss', () => {
	return gulp.src(`${dirs.src}/app.scss`)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(gulp.dest(dirs.dest));
});

gulp.task('watchScss', () => {
	gulp.watch(`${dirs.src}/app.scss`, ['scss']);
});

gulp.task('watch', ['scss', 'watchScss']);

gulp.task('default', ['scss']);