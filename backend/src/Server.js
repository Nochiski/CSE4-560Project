const {getPerson} =require('../Database/Database.js'); 
const express = require('express');
const cors = require('cors');
const port = 8080;
const app = express();

app.use(cors({
    origin: "*"
  }));
  

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.get('/search', async (req,res) => {
    const {name, nationality, gender, height, weight} = req.query
    const rows = await getPerson(name, nationality, gender, height, weight);
    res.status(200).json(rows);
})

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
