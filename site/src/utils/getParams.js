// parses GET paramaters in the browsers URL
// returns the paramaters in "object.property" form

export default function() {
	const req = new URLSearchParams(window.location.search);

	const params = {};

	for (const key of req.keys()) {
		const vals = req.getAll(key);
		params[key] = vals.length > 1 ? vals : vals[0] ? vals[0] : null;
	}

	return params;
}
