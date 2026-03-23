require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');



var app = express();
const allowedOrigins = [
	process.env.CLIENT_ORIGIN || 'http://localhost:5173'
];

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'dev-session-secret-change-me',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: false
		}
	})
);
app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin);
	}
	res.header('Vary', 'Origin');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	next();
})

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/products', require('./routes/productsRoute'));
app.use('/auth', require('./routes/authRoute'));
app.use('/users', require('./routes/usersRoute'));
app.use('/categories', require('./routes/categoriesRoute'));
app.use('/carts', require('./routes/cartsRoute'));


module.exports = app;
