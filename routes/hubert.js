const thirdPartyAPI= require('../thirdPartyAPI');
const getAPIKey= require('../modules/getAPIKey');
const verifyToken= require('../modules/verifyToken');
const upload= require('../modules/upload');
const asyncForEach= require('../modules/asyncForEach');
const db= require('../database');

const express= require('express');
const jwt= require('jsonwebtoken');
const fetch= require('node-fetch');

const router= express.Router();

router.get('/users/favorite',async (req,res)=>{
    const token= req.header('x-access-token');
    const verified= verifyToken(token);
    if (!verified.id_users) {
        return res.status(verified.status).json(verified);
    }
    let query= await db.executeQuery(`
        SELECT favorite.fav_id as fav_id, recipes.nama_recipes, recipes.deskripsi_recipes
        FROM favorite, recipes
        WHERE favorite.user_id = '${verified.id_users}' AND favorite.recipe_id = recipes.id_recipes
        GROUP BY favorite.fav_id,favorite.recipe_id, recipes.nama_recipes, recipes.deskripsi_recipes
    `);
    if(!query.rows.length){
        return res.json({
            status:200,
            message: "tidak ada resep yang difavorite"
        })
    }
    return res.json({
        status:200,
        message: "sukses",
        data: query.rows
    });
})
router.post('/users/favorite',async (req,res)=>{
    const datas = req.body
    const token= req.header('x-access-token');
    const verified= verifyToken(token);
    if (!verified.id_users) {
        return res.status(verified.status).json(verified);
    }
    if(!datas.recipe_id){
        return res.status(400).send({
            status:400,
            message: "recipe_id harus disertakan"
        })
    }
    let query = await db.executeQuery(`
        SELECT *
        FROM recipes
        WHERE id_recipes = '${datas.recipe_id}'
    `);
    if(!query.rows.length){
        return res.json({
            status:400,
            message: "recipe_id tidak valid"
        })
    }
    let insertquery = await db.executeQuery(`
        INSERT INTO favorite (user_id,recipe_id) VALUES ('${verified.id_users}','${datas.recipe_id}')
    `)
    return res.json({
        status:200,
        message: "sukses menambahkan ke favorite"
    })

})
router.delete('/users/favorite',async (req,res)=>{
    const datas = req.body
    const token= req.header('x-access-token');
    const verified= verifyToken(token);
    if (!verified.id_users) {
        return res.status(verified.status).json(verified);
    }
    if(!datas.fav_id){
        return res.status(400).send({
            status:400,
            message: "fav_id harus disertakan"
        })
    }
    let query = await db.executeQuery(`SELECT * FROM favorite WHERE fav_id = '${datas.fav_id}'`)
    if(!query.rows.length) return res.status(404).json({status:404, message:"fav_id tidak ditemukan"})
    let deletequery = await db.executeQuery(`DELETE FROM favorite WHERE fav_id = '${datas.fav_id}'`)
    return res.json({
        status:200,
        message: "suskses delete dari favorite!"
    })
})

module.exports = router