const jsonColorizer = require('json-colorizer');

module.exports = (o, ...s) => {
	console.log(...s);
	console.log(jsonColorizer(JSON.stringify(o, null, '\t')));
};
