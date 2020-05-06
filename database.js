const pg= require('pg');
const pool= new pg.Pool({ 
    connectionString: `postgres://qujtvikdqqxonx:359c1d27094a8117df29f691adec3f9eafd240d32aa4b791045cf8cfcf163030@ec2-3-231-16-122.compute-1.amazonaws.com:5432/d1c041fls51j9l`,
    ssl: { rejectUnauthorized: false }
});

const executeQuery= (query) => {
    try {
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports= {
    'executeQuery': executeQuery
};
