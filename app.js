const db= require('./database');
const express= require('express');
const fetch= require('node-fetch');
const request= require('request');
const jwt= require('jsonwebtoken');
const multer= require('multer');
const path= require('path');
const fs= require('fs');

const app= express();
const config= {
    host: 'https://api.spoonacular.com/recipes',
    api_key: ''
};

//MULTER
const upload= multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads')
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

app.listen(3000, () => console.log('Server listening on port 3000'));