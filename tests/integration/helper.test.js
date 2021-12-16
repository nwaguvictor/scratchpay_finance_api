'use strict';

const { fetchData } = require('../../src/utils/helper');

describe('fetchData', () => {
  it('returns resolved with array of objects', async () => {
    const dentalUrl = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json';
    const res = await fetchData(dentalUrl);
    expect(res.length).toBeGreaterThan(0);
  });
});
