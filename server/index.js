require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const {SERVER_PORT, SESSION_SECRET} = process.env
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(checkForSession)
app.use(express.static(__dirname + '/../build'))

app.listen(SERVER_PORT, () => console.log(`Nothing is broken yet on ${SERVER_PORT}`))

app.get('/api/swag', swagController.read)
app.get('/api/user', authController.getUser)
app.get('/api/search', searchController.search)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)
