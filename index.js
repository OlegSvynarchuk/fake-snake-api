const express = require('express')
const cors = require('cors')




const app = express()
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.json())


app.use('/', require('./routes/register.js'))
app.use('/', require('./routes/login.js'))
app.use('/', require('./routes/verifyplayer.js'))
app.use('/', require('./routes/updatescore.js'))
app.use('/', require('./routes/gettopscores.js'))

const port = process.env.PORT ||  8000

app.listen(port, () => {
    console.log('snake api running')
})