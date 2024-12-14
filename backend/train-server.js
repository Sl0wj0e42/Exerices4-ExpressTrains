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

app.get('/stations', (req, res) => {
    //let request = new XMLHttpRequest();
    
    /*request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let elem = document.getElementById("tabTrains");
            let trains = JSON.parse(this.responseText);
            let rows = "";

            for (let i=0; i < trains.trains.length; i++) {
                let train = trains.trains[i];

                let stop = train.stops[train.stops.length-1];

               rows += "<tr>" + "<td>" + train.departs +  "</td>" + "<td>" + stop.name + "</td>" + "<td>" + train.platform + "</td>" + "</tr>";
            }

            let sendTrains = {"tabTrains" : rows};
            res.render("stations", sendTrains);
        };
    };*/

    let url = "https://web.socem.plymouth.ac.uk/COMP3006/trains/trains";
    let response = axios.get(url); // Use axios to fetch data

    let trains = response.data;
    //let rows = "";

    /*for (let i = 0; i < trains.trains.length; i++) {
        let train = trains.trains[i];
        let stop = train.stops[train.stops.length - 1];

        rows += "<tr>" + 
            "<td>" + train.departs + "</td>" + 
            "<td>" + stop.name + "</td>" + 
            "<td>" + train.platform + "</td>" + 
            "</tr>";
    }*/

    let sendTrains = { "tabTrains": trains };
    res.render("stations", sendTrains);
});