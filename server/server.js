const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
}

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.listen(port);

console.log(`Server started at port ${port}`);