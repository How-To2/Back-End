const server = require('../api/server.js');
const request = require('supertest');

let id;
let login = {username: "testuser", password: "anything but that"};
let token;

describe('server', function(){
    it("should get '/'", function(){
        return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
    });
});

describe('register', function(){
    it('should register', function(){
        return request(server)
            .post('/api/mvp2/auth/register')
            .send(login)
            .then(res => {
                id = res.body.id;
                console.log(id)
                expect(res.status).toBe(201);
            })
    })
})

describe('login', function(){
    it("should login", function(){
        return request(server)
            .post('/api/mvp2/auth/login')
            .send(login)
            .then(res => {
                token = res.body.token;
                expect(res.status).toBe(200);
            })

    })
})

describe('howto', function(){
    it('should get /howto', function(){
        return request(server)
            .get('/api/mvp2/howto')
            .set("Authorization", token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})

describe('howto', function(){
    it('should post a howto', function(){
        return request(server)
            .post('/api/mvp2/howto/')
            .send({title: "howto test", author: login.username, howTo: "test howto"})
            .set("Authorization", token)
            .then(res => {
                expect(res.status).toBe(201);
            })
    })
})

describe('howto', function(){
    it('should get by /:id', function(){
        return request(server)
            .get('/api/mvp2/howto/1')
            .set("Authorization", token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})

describe('delete', function(){
    it('should delete', function() {
        return request(server)
            .delete(`/api/mvp2/auth/${id}`)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})  