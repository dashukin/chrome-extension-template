/**
 * @name gulp
 * @property pipe
 * @property on
 */

/**
 * @name webpack
 * @property DefinePlugin
 * @property DedupePlugin
 * @property UglifyJsPlugin
 */

import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import webpack from 'webpack';
import gulpWebpack from 'gulp-webpack';
import webpackConfig from './webpack.config';
import hjson from 'gulp-hjson';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';

// src paths
const appSrcPath = './src/app';
const jsSrcPath = `${appSrcPath}/js/**/*.js`;
const scssSrcPath = `${appSrcPath}/scss/**/*.scss`;
const hjsonSrcPath = `${appSrcPath}/*.hjson`;
const staticFilesSrcFiles = [`${appSrcPath}/**/*`, `!${jsSrcPath}`, `!${scssSrcPath}`, `!${hjsonSrcPath}`];

// build paths
const buildPath = './build';
const appBuildPath = `${buildPath}/app`;
const jsBuildPath = `${appBuildPath}/js`;
const cssBuildPath = `${appBuildPath}/css`;
const zipSrcPath = `${appBuildPath}/**/*`;


gulp.task('clean', () => {
	return del(`${buildPath}/*`);
});

gulp.task('build-manifest', () => {
	return gulp.src(hjsonSrcPath)
		.pipe(hjson({to: 'json', jsonSpace: ' ' }))
		.pipe(gulp.dest(appBuildPath));
});

gulp.task('watch-manifest', () => {
	return gulp.watch(hjsonSrcPath, ['build-manifest']);
});

gulp.task('build-scss', () => {
	return gulp.src(scssSrcPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(cssBuildPath));
});

gulp.task('watch-scss', () => {
	return gulp.watch(scssSrcPath, ['build-scss']);
});

gulp.task('build-js:dev', () => {
	return gulp.src(jsSrcPath)
		.pipe(gulpWebpack(webpackConfig))
		.pipe(gulp.dest(jsBuildPath));
});

gulp.task('watch-js:dev', () => {

	let devWatchConfig = Object.create(webpackConfig);
	devWatchConfig.watch = true;

	return gulp.src(jsSrcPath)
		.pipe(gulpWebpack(devWatchConfig))
		.pipe(gulp.dest(jsBuildPath));
});

gulp.task('build-js:prod', () => {

	let prodConfig = Object.create(webpackConfig);

	prodConfig.plugins = prodConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	)

	return gulp.src(jsSrcPath)
		.pipe(gulpWebpack(prodConfig))
		.pipe(gulp.dest(jsBuildPath));
});

gulp.task('watch-js', () => {
	return gulp.watch(jsSrcPath, ['watch-js:dev']);
});

gulp.task('zip', () => {
	return gulp.src(zipSrcPath)
		.pipe(zip('app-' + +(new Date) + '.zip'))
		.pipe(gulp.dest(buildPath));
});

gulp.task('build-static', () => {
	return gulp.src(staticFilesSrcFiles)
		.pipe(gulp.dest(appBuildPath));
});

gulp.task('watch-static', () => {
	return gulp.watch(staticFilesSrcFiles, ['build-static'])
});

gulp.task('start-dev', () => {
	runSequence(
		'clean',
		['build-manifest', 'build-scss', 'build-js:dev'],
		'build-static',
		['watch-manifest', 'watch-scss', 'watch-js'],
		'watch-static'
	);
});

gulp.task('build', () => {
	runSequence(
		'clean',
		['build-manifest', 'build-scss', 'build-js:prod'],
		'build-static',
		'zip'
	);
});