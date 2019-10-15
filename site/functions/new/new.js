// import
const mongoose = require('mongoose');
const shortid = require('shortid');

const { get } = require('axios');
const { Parser } = require('xml2js');

const Character = require('./CharacterModel');

// config
// const Schema = mongoose.Schema;
// const uri = `mongodb+srv://${process.env.GNAMEVOTING_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;
// console.log('uri', uri);

// connect
// mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		// const req = event.body;
		const req = JSON.parse(event.body);
		console.log('req');
		console.log(req);

		const parser = new Parser();

		const keys = Object.keys(req);

		const resData = {
			items: {}
		};

		for (const key of keys) {
			const val = req[key];
			console.log(val);
			if (val !== null) {
				const wowheadRes = await get(
					'https://classic.wowhead.com/item=' + val + '&xml'
				);
				const data = await parser.parseStringPromise(wowheadRes.data);
				// console.log(data.wowhead.item);
				resData.items[key.replace(/Slot/, '').toLowerCase()] =
					data.wowhead.item[0];
			} else {
				resData.items[key.replace(/Slot/, '').toLowerCase()] = null;
			}
		}

		// const query1 = Vote.where({ id });
		// const vote1 = await query1.findOne();

		// const query2 = Vote.where({ ip: event.headers['x-forwarded-for'] });
		// const vote2 = await query2.findOne();

		// console.log('vote1', vote1);
		// console.log('vote2', vote2);
		// if (vote1 !== null || vote2 !== null) {
		// 	return {
		// 		statusCode: 200,
		// 		body: JSON.stringify({ error: 'You may only vote once.' })
		// 	};
		// } else {
		// 	const newVote = new Vote({
		// 		id,
		// 		ip: event.headers['x-forwarded-for'],
		// 		vote: req.vote
		// 	});

		// 	const savedVote = await newVote.save();

		// 	console.log('savedVote', savedVote);

		// 	return { statusCode: 200, body: JSON.stringify({ success: true }) };
		// }

		return { statusCode: 200, body: JSON.stringify(resData) };
	} catch (err) {
		console.error(err);
		return {
			statusCode: 200,
			body: JSON.stringify({ error: err.message })
		};
	}
};
