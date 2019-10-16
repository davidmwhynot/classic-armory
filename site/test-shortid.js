const shortid = require('shortid');
const fs = require('fs');

const main = async () => {
	const output = fs.createWriteStream('G:\\uids\\ids.0', 'utf8');

	const ids = await generateIds();

	console.log('generated');
	console.log('ids len', ids.length);

	console.log('\n');

	await writeIds(output, ids);

	console.log('wrote');

	console.log('\n');
	console.log('\n');

	console.log('finishing');

	output.end();
};

main();

function generateIds() {
	return new Promise(res => {
		const ids = [];
		const k = 100000;
		for (let i = 0; i < 1000; ++i) {
			for (let j = 0; j < k; ++j) {
				ids[j + i * k] = shortid.generate();
			}
			console.log((i / 1000) * 100);
		}
		console.log('\n');
		res(ids);
	});
}

function writeIds(stream, ids) {
	return new Promise(res => {
		for (const id of ids) {
			stream.write(id + '\n');
		}
		stream.on('finish', () => {
			res();
		});
	});
}

// const dups = findDuplicates(ids);
// console.log('dups', dups);

// for (let i = 0; i < 10; ++i) {
// 	for (let j = 0; j < 10000; ++j) {
// 		const id = shortid.generate();
// 		if (ids.includes(id)) {
// 			console.log('dup', id);
// 			dups.push(id);
// 		} else {
// 			ids.push(id);
// 		}
// 	}
// 	console.log('.');
// }
