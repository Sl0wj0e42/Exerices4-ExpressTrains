let port = 8080;
let express = require('express');
let app = express();
let path = require('path');
let axios = require('axios');

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log('Running on port: ' + port);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/stations', async (req, res) => { // Use async for this route handler
    try {
        let url = "https://web.socem.plymouth.ac.uk/COMP3006/trains/trains";
        let response = await axios.get(url); // Await the axios call
        let trains = response.data; // Access the response data

        if (!trains) {
            return res.status(500).send('No train data received from the API.');
        }

        let rows = "";

        for (let i = 0; i < trains.trains.length; i++) {
            let train = trains.trains[i];
            let stop = train.stops[train.stops.length - 1];

            rows += `<tr> 
                        <td>${train.departs}</td> 
                        <td>${stop.name}</td>
                        <td>${train.platform}</td>
                    </tr>`;
        };
        
        res.render("stations", { tabTrains: rows });
    } catch (error) {
        console.error('Error fetching train data:', error);
        res.status(500).send('Error fetching train data');
    }
});