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

const config= {
    host: 'https://api.spoonacular.com/mealplanner/generate',
    api_key: '816d476582ca48809294ef256fce7450'
};

router.get("/meal",async function(req,res){
    const token= req.header('x-access-token');
    const verified= verifyToken(token,true);
    var targetCalories = req.query.targetCalories;
    var timeFrame = req.query.timeFrame;
    let results= [];
    let recipes;
    if(targetCalories==undefined&&timeFrame==undefined)
    {
        let fetchAPI= await fetch(`
            ${config.host}?apiKey=${config.api_key}`
        );
        recipes= await fetchAPI.json();
    }
    else if(targetCalories!=undefined&&timeFrame==undefined)
    {
        let fetchAPI= await fetch(`
            ${config.host}?apiKey=${config.api_key}&targetCalories=${targetCalories}`
        );
        recipes= await fetchAPI.json();
    }
    else if(targetCalories!=undefined&&timeFrame==undefined)
    {
        let fetchAPI= await fetch(`
            ${config.host}?apiKey=${config.api_key}&timeFrame=${timeFrame}`
        );
        recipes= await fetchAPI.json();
    }
    else{
        let fetchAPI= await fetch(`
            ${config.host}?apiKey=${config.api_key}&targetCalories=${targetCalories}&timeFrame=${timeFrame}`
        );
        recipes= await fetchAPI.json();
    }
    res.send(recipes);
})

router.get("/similiar",async function(req,res){
    const token= req.header('x-access-token');
    const verified= verifyToken(token,true);
    var id = req.query.id;
    var limit = req.query.limit;
    if(id==undefined)
    {
        res.send("Id harus diisi");
    }
    else if(limit!=undefined)
    {
        let results= [];
        let fetchAPI= await fetch(`
            ${thirdPartyAPI.host}/${id}/similar?apiKey=${config.api_key}&number=${limit}`
        );
        let recipes= await fetchAPI.json();
        res.send(recipes);
    }
    else{
        let fetchAPI= await fetch(`
            ${thirdPartyAPI.host}/${id}/similar?apiKey=${config.api_key}`
        );
        let recipes= await fetchAPI.json();
        //console.log(fetchAPI);
        res.send(recipes);
    }
})

router.get("/myRecipe",async function(req,res){
    const token= req.header('x-access-token');
    const verified= verifyToken(token,true);
    var id_users = req.body.id_users;
    let query = `select * from recipes where id_users = ${id_users}`;
    let hasil = await db.executeQuery(query);
    if(hasil)
    {
        res.send(hasil.rows);
    }
    else
    {
        res.status(404).send("Resep tidak ditemukan");
    }
})

router.delete("/myRecipe",async function(req,res){
    const token= req.header('x-access-token');
    const verified= verifyToken(token,true);
    var id_users = req.body.id_users;
    var id_recipes = req.body.id_recipes;
    let query = `select * from recipes where id_users = ${id_users} and id_recipes= ${id_recipes}`;
    let hasil = await db.executeQuery(query);
    if(hasil.rows.length>0)
    {
        let query2 = `delete from recipes where id_recipes=${id_recipes}`;
        let hasil2 = await db.executeQuery(query2);
        if(hasil2)
        {
            res.status(200).send("Delete Success");
        }
        else{
            res.status(400).send("Error Delete");
        }
    }
    else
    {
        res.status(404).send("Id User atau Id Recipe salah");
    }
})
router.put("/myRecipe",async function(req,res){
    const token= req.header('x-access-token');
    const verified= verifyToken(token,true);
    var id_users = req.body.id_users;
    var nama_recipes = req.body.nama_recipes;
    var deskripsi_recipes = req.body.deskripsi_recipes;
    var bahan_recipes = req.body.bahan_recipes;
    var instruksi_recipes = req.body.instruksi_recipes;
    var id_recipes = req.body.id_recipes;
    if(id_users==undefined||id_recipes==undefined)
    {
        res.status(404).send(
            "Id User dan Id Recipes harus diisi"
        );
    }
    else
    {
        let query = `select * from recipes where id_users =${id_users} and id_recipes=${id_recipes}`;
        let hasil = await db.executeQuery(query);
        let query2,hasil2;
        if(hasil.rows.length>0)
        {
            if(nama_recipes!=undefined)
            {
                if(deskripsi_recipes!=undefined)
                {
                    if(bahan_recipes!=undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      deskripsi_recipes='${deskripsi_recipes}',
                                      bahan_recipes='${bahan_recipes}',
                                      instruksi_recipes='${instruksi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      deskripsi_recipes='${deskripsi_recipes}',
                                      bahan_recipes='${bahan_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                    }
                    else if(bahan_recipes==undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      deskripsi_recipes='${deskripsi_recipes}',
                                      instruksi_recipes='${instruksi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      deskripsi_recipes='${deskripsi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                    }
                }
                else if(deskripsi_recipes==undefined)
                {
                    if(bahan_recipes!=undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      bahan_recipes='${bahan_recipes}',
                                      instruksi_recipes='${instruksi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      bahan_recipes='${bahan_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                    }
                    else if(bahan_recipes==undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      instruksi_recipes='${instruksi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            query2 = `update recipes set nama_recipes='${nama_recipes}',
                                      where id_recipes =${id_recipes}`;
                        }
                    }
                }
            }
            else if(nama_recipes==undefined)
            {
                if(deskripsi_recipes!=undefined)
                {
                    if(bahan_recipes!=undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set deskripsi_recipes='${deskripsi_recipes}',
                                      bahan_recipes='${bahan_recipes}',
                                      instruksi_recipes='${instruksi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            query2 = `update recipes set deskripsi_recipes='${deskripsi_recipes}',
                                      bahan_recipes='${bahan_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                    }
                    else if(bahan_recipes==undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set deskripsi_recipes='${deskripsi_recipes}',
                                      instruksi_recipes='${instruksi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            query2 = `update recipes set deskripsi_recipes='${deskripsi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                    }
                }
                else if(deskripsi_recipes==undefined)
                {
                    if(bahan_recipes!=undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set bahan_recipes='${bahan_recipes}',
                            instruksi_recipes='${instruksi_recipes}'
                            where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            query2 = `update recipes set bahan_recipes='${bahan_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                    }
                    else if(bahan_recipes==undefined)
                    {
                        if(instruksi_recipes!=undefined)
                        {
                            query2 = `update recipes set instruksi_recipes='${instruksi_recipes}'
                                      where id_recipes =${id_recipes}`;
                        }
                        else
                        {
                            res.status(404).send("Salah satu field harus diisi");
                        }
                    }
                }
            }
            hasil2 = await db.executeQuery(query2);
            if(hasil2.rowCount != 0)
            {
                res.status(200).send("Update Sukses");
            }
            else
            {
                res.status(400).send("Error Update");
            }
        }
        else
        {
            return res.status(404).send("Id recipe salah atau Id user salah");
        }
    }
})

router.post("/myRecipe",async function(req,res){
    const token= req.header('x-access-token');
    const verified= verifyToken(token,true);

    
    var id_users = req.body.id_users;
    var nama_recipes = req.body.nama_recipes;
    var deskripsi_recipes = req.body.deskripsi_recipes;
    var bahan_recipes = req.body.bahan_recipes;
    var instruksi_recipes = req.body.instruksi_recipes;
    var id_recipes = id_users + Math.round(Math.random()*100000000);
    if(id_users==undefined||nama_recipes==undefined||deskripsi_recipes==undefined||bahan_recipes==undefined||instruksi_recipes==undefined)
    {
        res.status(404).send(
            "Semua field harus diisi"
        );
    }
    let query = `select * from users where id_users = '${id_users}'`;
    let hasil = await db.executeQuery(query);
    if(hasil.rows.length==0)
    {
        res.status(404).send(
            "Id User tidak ditemukan"        
        );
    }
    else
    {
        let query2 = `INSERT INTO recipes (
            id_recipes,
            nama_recipes,
            deskripsi_recipes,
            bahan_recipes,
            instruksi_recipes,
            id_users
        ) VALUES (
            ${id_recipes},
            '${nama_recipes}',
            '${deskripsi_recipes}',
            '${bahan_recipes}',
            '${instruksi_recipes}',
            ${id_users}
        )`;
        let hasil2 = await db.executeQuery(query2);
        if(hasil2)
        {
            res.status(200).send("Success Add Resep");
        }
        else
        {
            res.status(400).send("Error Insert Resep");
        }
    }
})





module.exports= router;
