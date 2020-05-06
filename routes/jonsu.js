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
            status: '400 BAD REQUEST',
            message: 'Field tidak boleh kosong!'
        });
    }

    let conn= await db.getConn();
    let query= await db.executeQuery(conn, `
        SELECT * 
        FROM user
        WHERE email_user = '${data.email_user}'
    `);

    conn.release();

    if (query.length) {
        return res.status(409).json({
            status: 409,
            message: 'E-mail sudah terpakai.'
        });
    }

    conn= await db.getConn();
    query= await db.executeQuery(conn, `
        INSERT INTO user
        VALUES (
            null, 
            '${data.email_user}', 
            '${data.nama_user}',
            '${data.password_user}',
            0,
            0,
            '${getAPIKey()}',
            10 
        )
    `);
    
    conn.release();
    
    if (query.affectedRows === 0) {
        return res.status(500).json({
            status: '500 INTERNAL SERVER ERROR',
            message: 'Terjadi kesalahan. Coba lagi.'
        });
    }

    return res.status(200).json({
        status: 200,
        message: 'Register berhasil.'
    });
});

router.post('/login', async (req, res) => {
    const data= req.body;

    if (!Object.keys(data).every(key => data[key])) {
        return res.status(400).json({
            status: '400 BAD REQUEST',
            message: 'Field tidak boleh kosong!'
        });
    }

    let conn= await db.getConn();
    let query= await db.executeQuery(conn, `
        SELECT * 
        FROM user
        WHERE email_user = '${data.email_user}'
    `);

    conn.release();

    if (!query.length) {
        return res.status(404).json({
            status: '404 NOT FOUND',
            message: 'Akun tidak ditemukan.'
        });
    }

    const token= jwt.sign({
        email_user: query[0].email_user,
        tipe_user: query[0].tipe_user
    }, 'corona');

    return res.status(200).json({
        status: '200 OK',
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