const express= require('express');
const request= require('request');
const multer= require('multer');
const path= require('path');
const fs= require('fs');

const app= express();

//MULTER
const upload= multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname.split('.')[0]+''+path.extname(file.originalname))
        },
    }),
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('');

let imgType= true;

const checkFileType = (file, cb) => {
    let extName= path.extname(file.originalname);

    if (extName === '.jpg' || extName === '.png') {
        imgType= true;

        return cb(null, true);
    } else {
        imgType= false;

        cb(null, false);
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', require('./routes/jonsu'));

app.get('/', (req, res) => res.send('Online!'));

app.listen(process.env.PORT || 3000, () => console.log(`Server running`));