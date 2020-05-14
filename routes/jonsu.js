const thirdPartyAPI= require('../thirdPartyAPI');
const getAPIKey= require('../modules/getAPIKey');
const verifyToken= require('../modules/verifyToken');
const asyncForEach= require('../modules/asyncForEach');
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
        WHERE email_users = '${data.email_users}'
    `);

    if (query.rows.length) {
        return res.status(409).json({
            status: 409,
            message: 'E-mail sudah digunakan.'
        });
    }

    query= await db.executeQuery(`
        INSERT INTO users (
            email_users, 
            nama_users, 
            password_users, 
            saldo_users, 
            tipe_users, 
            api_key, 
            api_hit
        ) VALUES (
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
        message: 'Register berhasil!'
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
        WHERE email_users = '${data.email_users}' AND
              password_users = '${data.password_users}'
    `);

    if (!query.rows.length) {
        return res.status(404).json({
            status: 400,
            message: 'E-mail atau password salah.'
        });
    }

    const token= jwt.sign({
        id_users: query.rows[0].id_users,
        email_users: query.rows[0].email_users.trim(),
        tipe_users: query.rows[0].tipe_users
    }, 'corona');

    return res.status(200).json({
        status: 200,
        message: 'Login berhasil.',
        token: token
    });
});

router.post('/users/topUp', async (req, res) => {
    const token= req.header('x-access-token');
    const data= req.body;
    const verified= verifyToken(token);

    if (!verified.id_users) {
        return res.status(verified.status).json(verified);
    }

    if (!Object.keys(data).every(key => data[key])) {
        return res.status(400).json({
            status: 400,
            message: 'Field tidak boleh kosong!'
        });
    }

    let query= await db.executeQuery(`
        SELECT *
        FROM users
        WHERE email_users = '${data.email_users}' AND
              password_users = '${data.password_users}'
    `);

    if (!query.rows.length) {
        return res.status(404).json({
            status: 404,
            message: 'E-mail atau password salah!'
        });
    }

    query= await db.executeQuery(`
        UPDATE users
        SET saldo_users = saldo_users + ${parseInt(data.jumlah_topup)}
        WHERE email_users = '${data.email_users}'
    `);

    if (query.rowCount === 0) {
        return res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan. Coba lagi.'
        });
    }

    return res.status(200).json({
        status: 200,
        message: 'Top up berhasil!'
    });
});

router.put('/users/getPremium', async (req, res) => {
    const token= req.header('x-access-token');
    const data= req.body;
    const verified= verifyToken(token);

    if (!verified.id_users) {
        return res.status(verified.status).json(verified);
    }

    if (!Object.keys(data).every(key => data[key])) {
        return res.status(400).json({
            status: 400,
            message: 'Field tidak boleh kosong.'
        });
    }

    let query= await db.executeQuery(`
        SELECT *
        FROM users
        WHERE email_users = '${data.email_users}' AND
              password_users = '${data.password_users}'
    `);

    if (!query.rows.length) {
        return res.status(404).json({
            status: 404,
            message: 'E-mail atau password salah.'
        });
    }

    if (query.rows[0].tipe_users === 1) {
        return res.status(400).json({
            status: 400,
            message: 'Sudah menjadi akun premium.'
        });
    }

    if (query.rows[0].saldo_users < 200000) {
        return res.status(400).json({
            status: 400,
            message: 'Saldo tidak mencukupi.'
        });
    }

    query= await db.executeQuery(`
        UPDATE users
        SET saldo_users = saldo_users - ${query.rows[0].saldo_users}, tipe_users = 1
        WHERE email_users = '${data.email_users}'
    `);

    if (query.rowCount === 0) {
        return res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan. Coba lagi.'
        });
    }

    return res.status(200).json({
        status: 200,
        message: 'Get premium akun berhasil!'
    });
});

router.get('/recipes/search', async(req, res) => {
    const token= req.header('x-access-token');
    const verified= verifyToken(token);

    if (!token.id_users) {
        return res.status(verified.status).json(verified);
    }

    if (!req.query.key || !req.query.query) {
        return res.status(401).json({
            status: 401,
            message: 'Parameter key dan query tidak boleh kosong.'
        });
    }

    let query= await db.executeQuery(`
        SELECT *
        FROM users
        WHERE api_key = '${req.query.key}'
    `);

    if (!query.rows.length) {
        return res.status(401).json({
            status: 401,
            message: 'Anda tidak memiliki akses.'
        });
    }   

    let results= [];
    let fetchAPI= await fetch(`
        ${thirdPartyAPI.host}/search?apiKey=${thirdPartyAPI.api_key}&query=${req.query.query}&number=${req.query.limit}`
    );
    let recipes= await fetchAPI.json();
    
    await recipes.results.asyncForEach(async item => {
        query= await db.executeQuery(`
            SELECT *
            FROM recipes
            WHERE id_recipes = ${item.id}
        `);

        if (!query.rows.length) {
            fetchAPI= await fetch(`
                ${thirdPartyAPI.host}/${item.id}/information?apiKey=${thirdPartyAPI.api_key}&includeNutrition=false
            `);
            let informations= await fetchAPI.json();

            informations.extendedIngredients= informations.extendedIngredients.map(i => i.original);
            informations.analyzedInstructions[0].steps= informations.analyzedInstructions[0].steps.map(i => i.step);

            results.push({
                id_recipes: informations.id,
                nama_recipes: informations.title.replace(/["']/g, ""),
                deskripsi_recipes: informations.summary.replace(/["']/g, ""),
                bahan_recipes: informations.extendedIngredients,
                instruksi_recipes: informations.analyzedInstructions[0].steps
            });

            query= await db.executeQuery(`
                INSERT INTO recipes (
                    id_recipes,
                    nama_recipes,
                    deskripsi_recipes,
                    bahan_recipes,
                    instruksi_recipes
                ) VALUES (
                    ${informations.id},
                    '${informations.title.replace(/["']/g, "")}',
                    '${informations.summary.replace(/["']/g, "")}',
                    '${informations.extendedIngredients.join(', ').replace(/["']/g, "")}',
                    '${informations.analyzedInstructions[0].steps.join(', ').replace(/["']/g, "")}'
                ) 
            `);
        } else {
            results.push({
                id_recipes: query.rows[0].id_recipes,
                nama_recipes: query.rows[0].nama_recipes,
                deskripsi_recipes: query.rows[0].deskripsi_recipes,
                bahan_recipes: query.rows[0].bahan_recipes.split(', '),
                instruksi_recipes: query.rows[0].instruksi_recipes.split(', '),
            });
        }
    });
    
    return res.status(200).json({
        status: 200,
        message: 'Pencarian berhasil.',
        recipes: results
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

router.get('/recipes', async (req, res) => {
    let query= await db.executeQuery(`
        SELECT *
        FROM recipes
    `);

    return res.status(200).json({
        status: 200,
        user: query.rows
    });
});

module.exports= router;