'use strict';

const request = require('supertest');
let server;

describe('/scratchpay/clinics', () => {
  beforeEach(() => {
    server = require('../../src/index');
  });
  afterEach(() => {
    server.close();
  });

  describe('GET /', () => {
    it('returns list available clinics', async () => {
      const res = await request(server).get('/scratchpay/clinics');
      const data = JSON.parse(res.text);

      expect(res.status).toBe(200);
      expect(data.clinics.length).toBeGreaterThan(0);
    });
  });
});
