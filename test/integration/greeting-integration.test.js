const supertest = require('supertest');
const rhoaster = require('rhoaster');

const testEnvironment = rhoaster({
  deploymentName: 'nodejs-rest-http',
  dockerImage: 'registry.access.redhat.com/ubi8/nodejs-12',
});

testEnvironment
  .deploy()
  .then(runTests)
  .then((_) => test.onFinish(testEnvironment.undeploy))
  .catch(console.error);

function runTests(route) {
  test('/api/greeting', async (done) => {
    const response = await supertest(route).get('/api/greeting');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.content).toBe('Hello, World!');
    done();
  });

  test('/api/greeting with query param', async (done) => {
    const response = await supertest(route).get('/api/greeting?name=luke');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.content).toBe('Hello, luke');
    done();
  });
}
