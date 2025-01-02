const express = require('express');
const cors = require('cors');
const path = require('path');


const analizePictureRoutes = require("./routes/analizePictureRoutes");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors(
    {
        origin: '*'
    }
));

app.use('/api/analyze', analizePictureRoutes);
app.get('/test', (req, res) => {
    res.send('Hello World!');
});


let port = process.env.PORT || 3100;
console.log(port)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});