const meterRouter = (app, fs) => {
// variables
const dataPath = "./data/metering_data.json";

// READ
app.get("/meter_data/:Serial", (req, res) => {

    // Reading isbn from the URL
    const serial = req.params.Serial;
    fs.readFile(dataPath, "utf8", (err, data) => {
        if(err){
            throw err;
        }
        // json data
        var jsonData = data;

        //create empty json object
        var searchData = [];

        // parse json
        var jsonParsed = JSON.parse(jsonData);

        const meterReading = jsonParsed.map((meter) => {
            if(meter.Serial === serial){
                searchData.push(meter);
            }
            return searchData;
        });
        return res.status(200).json(searchData);
    });
    });
};

module.exports = meterRouter;