const express = require('express');
const mongoose=require("mongoose");
const multer=require('multer');


//cors not required as of now 
// const cors=require('cors');

const User=require('./models/mongoose');

const app = express();
const bodyparser = require('body-parser');
/*
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

app.use(cors()); */


mongoose.connect('mongodb://localhost:27017/pixelminditsolutions',
{ useNewUrlParser: true,useUnifiedTopology:true },
function(err){
    if(err) console.log(err);
    console.log("database is connected");
});


//storage engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100
    }
})
app.use('/', express.static('upload/images'));
app.post("/", upload.single('avatar'), (req, res) => {

    res.json({
        success: 1,

    })
    const newuser=new User(req.body);
    newuser.save();
   
})



function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);

   


app.listen(4000,()=>console.log("running on 4k"));