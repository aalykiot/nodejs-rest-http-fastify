import * as path from 'path';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyStatic from 'fastify-static';

// interface declaration for the /api/greeting route
interface IQuerystring {
  name: string;
}

function build(opts = {}) {
  // create fastify instance
  const app = fastify(opts);

  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  });

  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
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

  app.get(
    '/api/greeting',
    { schema },
    async (
      request: FastifyRequest<{ Querystring: IQuerystring }>,
      reply: FastifyReply
    ) => {
      const name = request.query?.name;
      return reply.send({ content: `Hello, ${name || 'World!'}` });
    }
  );

  return app;
}

export default build;
