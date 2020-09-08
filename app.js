const path = require('path');
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');

function build(opts = {}) {
  // create fastify instance
  const app = fastify(opts);

  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  });

  app.get('/', async (request, reply) => {
    return reply.sendFile('index.html');
  });

  const schema = {
    query: {
      name: { type: 'string' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          content: { type: 'string' },
        },
      },
    },
  };

  app.get('/api/greeting', { schema }, async (request, reply) => {
    const name = request.query ? request.query.name : undefined;
    return reply.send({ content: `Hello, ${name || 'World!'}` });
  });

  return app;
}

module.exports = build;
