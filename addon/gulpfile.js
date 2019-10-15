const gulp = require('gulp');

gulp.task('copy', () => {
	return gulp
		.src('./ClassicArmory.*')
		.pipe(
			gulp.dest(
				'D:\\Program Files\\World of Warcraft\\_classic_\\Interface\\AddOns\\ClassicArmory\\'
			)
		);
});

gulp.task(
	'default',
	gulp.series('copy', () => {
		gulp.watch('./ClassicArmory.*', gulp.series('copy'));
	})
);
