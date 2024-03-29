// Import modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Import Routes
const toyRoute = require('./routes/toy.route.js')
const userRoute = require('./routes/user.route.js')
const reviewRoute = require('./routes/review.route.js')

// app initiation
const app = express()
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true // enable set cookie
}));
app.use(cookieParser());
app.use(session({
    secret: 'Three can keep a secret if two of them are dead.',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.static('public'));
// Use routes
toyRoute(app);
userRoute(app);
reviewRoute(app);

app.get('/', (req, res) => {
    res.send('Hello Toy Backend!')
})

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Toy app listening on port ${PORT}`))