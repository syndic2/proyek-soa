const chai= require('chai');
const chaiHttp= require('chai-http');

const server= {
    development: 'http://localhost:3000',
    production: 'https://soa-proyek.herokuapp.com'
};

chai.should(); //ASSERTION STYLE
chai.use(chaiHttp);

describe('/api/users', () => {

    describe('/login', () => {
        it('Passed (with fields)', (done) => {
            chai.request(server.development)
                .post('/api/users/login')
                .send({
                    email_users: 'jonsu@mail.com',
                    password_users: 'asd' 
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(200);
                    res.body.should.have.property('message').eq('Login berhasil.');
                    res.body.should.have.property('token');
                done();
                });
        });

        it('Not Passed (without fields)', (done) => {
            chai.request(server.development)
                .post('/api/users/login')
                .send({
                    email_users: undefined,
                    password_users: undefined
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(400);
                    res.body.should.have.property('message').eq('Field tidak boleh kosong!');
                done();
                });
        });
    });

    describe('/register', () => {
        
    })
});
