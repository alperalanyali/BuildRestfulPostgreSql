const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config()
const port  = process.env.PORT;
const  morgan = require('morgan');
const app = express()
const db = require('./queries')
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({
    extended:true
}))
app.get('/',(req,res)=>{
    res.json({Welcome:'How to  create api with nodejs,express,postgresql'})
})

app.get('/countries',db.getCountries)
app.get('/countries/:id',db.getCountriesById)
app.get('/countries/search/:search',db.findCountriesBySearchKey)
app.post('/countries',db.createCountries)
app.put('/countries/:id',db.updateCountries)
app.delete('/countries/:id',db.deleteCountriesById)
app.listen(port,()=>{
    console.log(`Server is listening to ${port} port`);
})