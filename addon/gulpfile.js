const gulp = require('gulp');

gulp.task('copy', () =>
	gulp
		.src('./ClassicArmory.*')
		.pipe(
			gulp.dest(
				'B:\\World of Warcraft\\_classic_era_\\Interface\\AddOns\\ClassicArmory\\'
			)
		)
);

gulp.task(
	'default',
	gulp.series('copy', () => {
		gulp.watch('./ClassicArmory.*', gulp.series('copy'));
	})
);
