const thirdPartyAPI= require('../thirdPartyAPI');
const getAPIKey= require('../modules/getAPIKey');
const verifyToken= require('../modules/verifyToken');
const upload= require('../modules/upload');
const asyncForEach= require('../modules/asyncForEach');
const db= require('../database');

const express= require('express');
const jwt= require('jsonwebtoken');
const fetch= require('node-fetch');

const app = express();
const router= express.Router();

router.get("/searchByIngredients",async function(req,res){
    var key = req.query.key;
    var ingredients = req.query.ingredients;
    
})

module.exports= router;
