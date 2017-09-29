import lazyReq from 'lazyreq';
import gulp from 'gulp';

const is_dev = process.env.NODE_ENV !== 'production';

const $ = lazyReq(require, {
	sourcemaps: 'gulp-sourcemaps',
	sass: 'gulp-sass',
	newer: 'gulp-newer',
	autoprefixer: 'gulp-autoprefixer',
	del: 'del',
	promisify: ['util', 'promisify'],
	exec: ['child_process', 'exec', (e) => $.promisify(e)],
	noop: ['gulp-util', 'noop'],
});

gulp.task('default', ['style', 'site']);

gulp.task('style', () =>
	gulp.src('./style/style.scss')
	 	.pipe($.newer({
			dest: './target/style.css',
			extra: './style/*',
		}))
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			outputStyle: is_dev ? 'nested' : 'compressed',
		}))
		.pipe(is_dev ? $.noop() : $.autoprefixer())
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('./target'))
);

gulp.task('site', () =>
	$.exec('hugo --source ./site')
		.catch(e => {
			console.log(e.stdout);
			throw e;
		})
);

gulp.task('clean', () =>
	$.del('./target')
);

gulp.task('watch', () => {
  gulp.watch(['./style/**'], ['style']);
  gulp.watch(['./site/**'], ['site']);
});
