import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gulpZip from 'gulp-zip';
import del from 'del';
import fs from 'fs';
import semver from 'semver';
import gulpBump from 'gulp-bump';


const dirs = {
	src: './src/scss',
	destCSS: './app/build/css',
	destJS: './app/build/js',
	destAll: './app/build',
	appSrc: './app',
	appDest: './app-zip',
	manifest: './app',
	manifestFile: './app/manifest.json'
};

gulp.task('scss', () => {
	return gulp.src(`${dirs.src}/app.scss`)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(gulp.dest(dirs.destCSS));
});

gulp.task('watchScss', () => {
	gulp.watch(`${dirs.src}/app.scss`, ['scss']);
});

gulp.task('watch', ['scss', 'watchScss']);

gulp.task('zip', () => {
	gulp.src(`${dirs.appSrc}/**/*`)
		.pipe(gulpZip(`StyleMe_${+(new Date())}.zip`))
		.pipe(gulp.dest(dirs.appDest));
});

gulp.task('cleanDest', () => {
	del(`${dirs.destAll}/*`);
});

gulp.task('incVersion', () => {
	
	let manifestConfiguration = JSON.parse(fs.readFileSync(dirs.manifestFile, 'utf8'));
	let newVersion = semver.inc(manifestConfiguration.version, 'patch');

	gulp.src(dirs.manifestFile)
		.pipe(gulpBump({
			version: newVersion
		}))
		.pipe(gulp.dest(dirs.manifest));
});

gulp.task('default', ['scss']);