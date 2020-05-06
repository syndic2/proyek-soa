const thirdPartyAPI= require('../thirdPartyAPI');
const getAPIKey= require('../modules/getAPIKey');
const db= require('../database');
const express= require('express');
const jwt= require('jsonwebtoken');
const fetch= require('node-fetch');

const router= express.Router();
    
router.post('/register', async (req, res) => {
    const data= req.body;

    if (!Object.keys(data).every(key => data[key])) {
        return res.status(400).json({
            status: 400,
            message: 'Field tidak boleh kosong!'
        });
    }

    let query= await db.executeQuery(`
        SELECT * 
        FROM pengguna
        WHERE email_user = '${data.email_user}'
    `);

    if (query.rows.length) {
        return res.status(409).json({
            status: 409,
            message: 'E-mail sudah digunakan.'
        });
    }

    query= await db.executeQuery(`
        INSERT INTO pengguna (id_user, email_user, nama_user, password_user, saldo_user, tipe_user, api_key, api_hit)
        VALUES (
            0,
            '${data.email_user}',
            '${data.nama_user}',
            '${data.password_user}',
            0,
            0,
            '${getAPIKey()}',
            10
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

router.post('/login', async (req, res) => {
    const data= req.body;

    if (!Object.keys(data).every(key => data[key])) {
        return res.status(400).json({
            status: 400,
            message: 'Field tidak boleh kosong!'
        });
    }

    let query= await db.executeQuery(`
        SELECT * 
        FROM pengguna
        WHERE email_user = '${data.email_user}'
    `);

    if (!query.rows.length) {
        return res.status(404).json({
            status: 400,
            message: 'Akun tidak ditemukan.'
        });
    }

    const token= jwt.sign({
        email_user: query.rows[0].email_user.trim(),
        tipe_user: query.rows[0].tipe_user
    }, 'corona');

    return res.status(200).json({
        status: 200,
        message: 'Login berhasil.',
        token: token
    });
});

router.get('/recipe/search', async(req, res) => {
    const fetchAPI= await fetch(`
        ${thirdPartyAPI.host}/search?apiKey=${thirdPartyAPI.api_key}&query=cheese&number=2`
    );
    const data= await fetchAPI.json();

    if (!data.results.length) {
        return res.status(404).json({
            status: '404 NOT FOUND',
            message: 'Recipe tidak ditemukan.'
        });
    }

    return res.status(404).json({
        status: '200 OK',
        message: 'Pencarian berhasil.',
        recipes: data.results
    });
});

module.exports= router;