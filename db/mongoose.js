require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
mongoose.connection
  .once("open", function () {
    console.log("DB Connected!");
  })
  .on("error", function (error) {
    console.log("Error is: ", error);
  });
