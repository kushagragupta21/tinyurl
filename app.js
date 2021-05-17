require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

const port = process.env.PORT|| 5000
mongoose.connect('mongodb://localhost/urlShortner',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async(req, res) =>{
    const shortUrls =await ShortUrl.find();
    res.render('index',{shortUrls: shortUrls})
})
app.post('/postUrls', async (req, res) =>{
   await ShortUrl.create({ full: req.body.fullURL});
   res.redirect('/')
})

app.get('/:shortUrl',async (req, res) =>{
   const shorturl = await ShortUrl.findOne({short: req.params.shortUrl })

   if(shorturl == null) return res.sendStatus(404);

   shorturl.clicks++
   shorturl.save() // To update clicks in databse

   res.redirect(shorturl.full);
})

app.listen(port);