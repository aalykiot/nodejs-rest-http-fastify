const build = require('../app');
const fastify = build();

describe('fastify server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('test out greeting route with no query param', async (done) => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/greeting',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toBe('{"content":"Hello, World!"}');
    done();
  });

  test('test out greeting route with a query param', async (done) => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/greeting?name=Luke',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toBe('{"content":"Hello, Luke"}');
    done();
  });
});
