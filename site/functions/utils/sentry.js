const Sentry = require('@sentry/node');

Sentry.init({
	dsn: 'https://a26dd2b53458430f834e3244fc77dffe@sentry.io/1784460'
});

module.exports = () => {
	return ({ error, message }) => {
		if (error) {
			Sentry.captureException(error);
		}
		if (message) {
			Sentry.captureMessage(message);
		}
	};
};
