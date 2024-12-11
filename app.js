const  express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// Load environment variables from a .env file
dotenv.config();
const app = express();
const  port = process.env.PORT || 7856;


app.use(cookieParser())

app.use(express.json());

app.use(session({
    secret: 'votre_secret', // Remplacez par une clé secrète
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true si vous utilisez HTTPS
}));

app.use('/notes', require('./routes/NotesRoutes'));

app.use('/users', require('./routes/UserRoutes'));




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
