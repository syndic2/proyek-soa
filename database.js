const { Client }= require('pg');
const client= new Client({ 
    connectionString: 'postgres://proyek-soa:soa@localhost:5432/proyek-soa' 
});

client.connect();

const executeQuery= (query) => {
    try {
        return new Promise((resolve, reject) => {
            client.query(query, (err, res) => {
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
