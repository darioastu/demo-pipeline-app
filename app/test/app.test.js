const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  test('GET / responde mensaje', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
  test('GET /health responde OK', async () => {
    const res = await request(app).get('/health');
    expect(res.text).toBe('OK');
  });
});
