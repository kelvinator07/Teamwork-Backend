import { expect, server, BASE_URL } from './setup';

describe('POST /api/v1/auth/signin', () => {
  const data = {
    email: 'kelvin@gmail.com',
    password: 'qwerty',
  };
  it.skip('signin should return status code 200', (done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('Articles', () => {
  it.skip('get articles page', done => {
    server
      .get(`${BASE_URL}/articles`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach(m => {
          expect(m).to.have.property('name');
          expect(m).to.have.property('message');
        });
        done();
      });
  });
});

it.skip('posts messages', done => {
  const data = { name: 'some name', message: 'new message' };
  server
    .post(`${BASE_URL}/messages`)
    .send(data)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.messages).to.be.instanceOf(Array);
      res.body.messages.forEach(m => {
        expect(m).to.have.property('id');
        expect(m).to.have.property('name', data.name);
        expect(m).to.have.property('message', data.message);
      });
      done();
    });
});