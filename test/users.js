const verifyToken= require('../modules/verifyToken');

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
        it('Not passed (without fields)', (done) => {
            chai.request(server.development)
                .post('/api/users/login')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Field tidak boleh kosong!');
                done();
                });
        });

        it('Not passed (without correct email or password)', (done) => {
            chai.request(server.development)
                .post('/api/users/login')
                .send({
                    email_users: 'jonsu',
                    password_users: 'asd' 
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(404);
                    res.body.should.have.property('message').eql('E-mail atau password tidak ditemukan.');
                done();
                });
        });

        it('Passed', (done) => {
            chai.request(server.development)
                .post('/api/users/login')
                .send({
                    email_users: 'jonsu@mail.com',
                    password_users: 'dsa' 
                })
                .end((err, res) => {
                    token= res.body.token;

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('message').eql('Login berhasil.');
                    res.body.should.have.property('token');
                done();
                });
        });
    });

    describe('/register', () => {
        it('Not passed (without fields)', (done) => {
            chai.request(server.development)
                .post('/api/users/register')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('Field tidak boleh kosong!');
                done();
                });
        });

        it('Not passed (without valid e-mail)', (done) => {
            chai.request(server.development)
                .post('/api/users/register')
                .send({
                    email_users: 'ganteng@',
                    nama_users: 'ganteng',
                    password_users: 'asd'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('message').eql('E-mail tidak valid!');
                done();
                });
        });

        it('Passed', (done) => { //HARUS VALID,
            chai.request(server.development)
                .post('/api/users/register')
                .send({
                    email_users: 'rini@mail.com',
                    nama_users: 'rini',
                    password_users: 'asd'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('message').eql('Register berhasil!');
                done();
                });
        });
    });

    let token;

    before((done) => { // <- PRE-REQUEST, DIJALANIN 1X KALO beforeEach LOOP
        chai.request(server.development)
            .post('/api/users/login')
            .send({
                email_users: 'jonsu@mail.com',
                password_users: 'asd' 
            })
            .end((err, res) => {
                token= res.body.token;
            done();
            });
    });

    describe('/profile', () => {
        describe('/get', () => {
            it('Not passed (without token)', (done) => {
                chai.request(server.development)
                    .get('/api/users/profile')
                    .set('x-access-token', 'undefined')
                    .end((err, res) => {
                        const verified= verifyToken(undefined);

                        res.should.have.status(verified.status);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                    done();
                    });
            });

            it('Not passed (without valid token)', (done) => {
                chai.request(server.development)
                    .get('/api/users/profile')
                    .set('x-access-token', 'asd')
                    .end((err, res) => {
                        const verified= verifyToken('asd');
                        
                        res.should.have.status(verified.status);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                    done();
                    });
            });

            it('Passed', (done) => {
                chai.request(server.development)
                    .get('/api/users/profile')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('profile').should.be.a('object');
                    done();
                    });
            });
        });
    });    
});
