const  express = require('express');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const app = express();
const  port = process.env.PORT || 7856;

app.use(express.json());

app.use('/notes', require('./routes/NotesRoutes'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
