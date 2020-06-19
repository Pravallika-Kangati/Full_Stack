const meterRouter = (app, fs) => {
	// variables
	const dataPath = './data/metering_data.json';

	// READ
	app.get('/meter_data', (req, res) => {
		fs.readFile(dataPath, 'utf8', (err, data) => {
			if (err) {
				throw err;
			}
			return res.status(200).send(JSON.parse(data));
		});
	});
};

module.exports = meterRouter;
