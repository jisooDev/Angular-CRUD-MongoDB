const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-Parser')
const mongoDb = require('./database/db')

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database Successfully')
}, error =>{
    console.log('Dabase error:'+ error)
})

const bookRoute = require('./routes/book.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

//Static diredtory path
app.use(express.static(path.join(__dirname, 'dist/')))
//Base route
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// API root
app.use('/api',bookRoute);

// PORT
const port = process.env.PORT || 8000

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})


// 404 Handler
app.use((req,res,next)=>{
    next(createError(404));
})

//error handler
app.use(function(err,req,res,next){
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})