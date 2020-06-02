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

        it('Passed', (done) => {
            chai.request(server.development)
                .post('/api/users/login')
                .send({
                    email_users: 'jonsu@mail.com',
                    password_users: 'asd' 
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

        /*it ('Passed', (done) => { //HARUS VALID,
            chai.request(server.development)
                .post('/api/users/register')
                .send({
                    email_users: 'cantik@mail.com',
                    nama_users: 'cantik',
                    password_users: 'asd'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('message').eql('Register berhasil!');
                done();
                });
        });*/
    });

    let token;
    let tokenkedua;
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
        chai.request(server.development)
            .post('/api/users/login')
            .send({
                email_users: 'hubert@mail.com',
                password_users: 'asd' 
            })
            .end((err, res) => {
                tokenkedua= res.body.token;
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

    describe('/favorite', () => {
        describe('/get', () => {
            it('Not passed (without token)', (done) => {
                chai.request(server.development)
                    .get('/api/users/favorite')
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
                    .get('/api/users/favorite')
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
                    .get('/api/users/favorite')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('message');
                    done();
                    });
            });
        });

        describe('/post', () => {
            it('Not passed (without token)', (done) => {
                chai.request(server.development)
                    .post('/api/users/favorite')
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
                    .post('/api/users/favorite')
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

            it('Not passed (without recipe_id)', (done) => {
                chai.request(server.development)
                    .post('/api/users/favorite')
                    .set('x-access-token', token)
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('message').eql('recipe_id harus disertakan');
                    done();
                    });
            });

            it('Not passed (invalid recipe_id)', (done) => {
                chai.request(server.development)
                    .post('/api/users/favorite')
                    .set('x-access-token', token)
                    .send({recipe_id:222})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('message').eql('recipe_id tidak valid');
                    done();
                    });
            });

            it('Passed', (done) => {
                chai.request(server.development)
                    .post('/api/users/favorite')
                    .set('x-access-token', token)
                    .send({recipe_id:492560})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('message').eql('sukses menambahkan ke favorite');
                    done();
                    });
            });
        });

        describe('/delete', () => {
            it('Not passed (without token)', (done) => {
                chai.request(server.development)
                    .delete('/api/users/favorite')
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
                    .delete('/api/users/favorite')
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

            it('Not passed (without fav_id)', (done) => {
                chai.request(server.development)
                    .delete('/api/users/favorite')
                    .set('x-access-token', token)
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('message').eql('fav_id harus disertakan');
                    done();
                    });
            });

            it('Not passed (invalid fav_id)', (done) => {
                chai.request(server.development)
                    .delete('/api/users/favorite')
                    .set('x-access-token', token)
                    .send({fav_id:222})
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(404);
                        res.body.should.have.property('message').eql('fav_id tidak ditemukan');
                    done();
                    });
            });

            it('Passed', (done) => {
                chai.request(server.development)
                    .delete('/api/users/favorite')
                    .set('x-access-token', token)
                    .send({fav_id:4})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('message').eql('suskses delete dari favorite!');
                    done();
                    });
            });
        });
    });

    describe('/follow', () => {
        describe('/get', () => {
            it('Not passed (without token)', (done) => {
                chai.request(server.development)
                    .get('/api/users/follow')
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
                    .get('/api/users/follow')
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
                    .get('/api/users/follow')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('message');
                    done();
                    });
            });
        });

        describe('/post', () => {
            it('Not passed (without token)', (done) => {
                chai.request(server.development)
                    .post('/api/users/follow')
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
                    .post('/api/users/follow')
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

            it('Not passed (without recipe_id)', (done) => {
                chai.request(server.development)
                    .post('/api/users/follow')
                    .set('x-access-token', token)
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('message').eql('recipe_id harus disertakan');
                    done();
                    });
            });

            it('Not passed (invalid recipe_id)', (done) => {
                chai.request(server.development)
                    .post('/api/users/follow')
                    .set('x-access-token', token)
                    .send({recipe_id:222})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('message').eql('recipe_id tidak valid');
                    done();
                    });
            });

            it('Passed', (done) => {
                chai.request(server.development)
                    .post('/api/users/follow')
                    .set('x-access-token', token)
                    .send({recipe_id:492560})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('message').eql('sukses menambahkan ke favorite');
                    done();
                    });
            });
        });

        describe('/delete', () => {
            it('Not passed (without token)', (done) => {
                chai.request(server.development)
                    .delete('/api/users/follow')
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
                    .delete('/api/users/follow')
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

            it('Not passed (without fav_id)', (done) => {
                chai.request(server.development)
                    .delete('/api/users/follow')
                    .set('x-access-token', token)
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('message').eql('fav_id harus disertakan');
                    done();
                    });
            });

            it('Not passed (invalid fav_id)', (done) => {
                chai.request(server.development)
                    .delete('/api/users/follow')
                    .set('x-access-token', token)
                    .send({fav_id:222})
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(404);
                        res.body.should.have.property('message').eql('fav_id tidak ditemukan');
                    done();
                    });
            });

            it('Passed', (done) => {
                chai.request(server.development)
                    .delete('/api/users/follow')
                    .set('x-access-token', token)
                    .send({fav_id:4})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('message').eql('suskses delete dari favorite!');
                    done();
                    });
            });
        });
    });
});
