const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const router = require('./router.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => console.log(`Warehouse Project started at port ${PORT}`));
