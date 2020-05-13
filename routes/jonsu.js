const thirdPartyAPI= require('../thirdPartyAPI');
const getAPIKey= require('../modules/getAPIKey');
const db= require('../database');
const express= require('express');
const jwt= require('jsonwebtoken');
const fetch= require('node-fetch');

const router= express.Router();
    
router.post('/users/register', async (req, res) => {
    const data= req.body;

    if (!Object.keys(data).every(key => data[key])) {
        return res.status(400).json({
            status: 400,
            message: 'Field tidak boleh kosong!'
        });
    }

    let query= await db.executeQuery(`
        SELECT * 
        FROM users
        WHERE email_users = '${data.email_user}'
    `);

    if (query.rows.length) {
        return res.status(409).json({
            status: 409,
            message: 'E-mail sudah digunakan.'
        });
    }

    query= await db.executeQuery(`
        INSERT INTO users (
            id_users, 
            email_users, 
            nama_users, 
            password_users, 
            saldo_users, 
            tipe_users, 
            api_key, 
            api_hit
        ) VALUES (
            0,
            '${data.email_users}',
            '${data.nama_users}',
            '${data.password_users}',
            0,
            0,
            '${getAPIKey()}',
            0
        ) 
    `);

    if (query.rowCount === 0) {
        return res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan. Coba lagi.'
        });
    }

    return res.status(200).json({
        status: 200,
        message: 'Register berhasil'
    });
});

router.post('/users/login', async (req, res) => {
    const data= req.body;

    if (!Object.keys(data).every(key => data[key])) {
        return res.status(400).json({
            status: 400,
            message: 'Field tidak boleh kosong!'
        });
    }

    let query= await db.executeQuery(`
        SELECT * 
        FROM users
        WHERE email_users = '${data.email_users}'
    `);

    if (!query.rows.length) {
        return res.status(404).json({
            status: 400,
            message: 'Akun tidak ditemukan.'
        });
    }

    const token= jwt.sign({
        email_user: query.rows[0].email_users.trim(),
        tipe_user: query.rows[0].tipe_users
    }, 'corona');

    return res.status(200).json({
        status: 200,
        message: 'Login berhasil.',
        token: token
    });
});

router.get('/users', async (req, res) => {
    let query= await db.executeQuery(`
        SELECT *
        FROM users
    `);

    return res.status(200).json({
        status: 200,
        user: query.rows
    });
});

router.get('/recipe/search', async(req, res) => {
    const fetchAPI= await fetch(`
        ${thirdPartyAPI.host}/search?apiKey=${thirdPartyAPI.api_key}&query=cheese&number=2`
    );
    const data= await fetchAPI.json();

    if (!data.results.length) {
        return res.status(404).json({
            status: 400,
            message: 'Recipe tidak ditemukan.'
        });
    }

    return res.status(200).json({
        status: 200,
        message: 'Pencarian berhasil.',
        recipes: data.results
    });
});

module.exports= router;