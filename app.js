const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    

const { redirect_url } = require('./controllers/url');

const url_router = require('./routes/url');
app.use('/url', url_router);
app.get('/:code', redirect_url);




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}:`);
});
