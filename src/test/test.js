import assert from 'assert';
import request from 'supertest';

//Test case- 1 -login to system
it('Test case 1 - should respond with success', function(done) {
    request(app)
        .get('http://localhost:3001/login')
        .send({email:"ria@ria.com",password:"ria"})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) done(err);
            assert.equal(res.body.success, true);
            done();
        });
});