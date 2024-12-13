let port = 8080;
let express = require('express');
let app = express();
let path = require('path');

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log('Running on port: ' + port);
});