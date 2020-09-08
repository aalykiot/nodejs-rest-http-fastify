import build from '../app';

const app = build({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT, 10) || 8080;
    await app.listen(port, '0.0.0.0');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
