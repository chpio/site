import lazyReq from 'lazyreq';
import gulp from 'gulp';

const is_dev = process.env.NODE_ENV !== 'production';

const $ = lazyReq(require, {
	sourcemaps: 'gulp-sourcemaps',
	sass: 'gulp-sass',
	newer: 'gulp-newer',
	autoprefixer: 'gulp-autoprefixer',
	del: 'del',
	exec: ['child_process', 'exec'],
});

gulp.task('default', ['style', 'site']);

gulp.task('style', () =>
	gulp.src('./style/style.scss')
	 	.pipe($.newer({
			dest: './public/style.css',
			extra: './style/*',
		}))
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			outputStyle: is_dev ? 'nested' : 'compressed',
		}))
		.pipe($.autoprefixer())
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('./public'))
);


gulp.task('site', () =>
	$.exec('hugo')
);

gulp.task('clean', () =>
	$.del('./public')
);
