'use strict';

const axios = require('axios').default;
const { getItemByAvailability, fetchData } = require('../src/utils/helper');

jest.mock('axios');

describe('Helper Mathods', () => {
  describe('getItemByAvailability', () => {
    it('should return true if found a matched clinic with query', () => {
      const item = { availability: { from: '01:00', to: '02:00' } };
      const query = 'from:01:00,to:02:00';
      const result = getItemByAvailability(item, query);
      expect(result).toBe(true);
    });
    it('should return false if no clinic was found with query', () => {
      const item = { availability: { from: '01:00', to: '02:00' } };
      const query = 'from:00:00,to:02:00';
      const result = getItemByAvailability(item, query);
      expect(result).toBe(false);
    });
  });

  describe('fetchClinics', () => {
    it('should resolve with an array of objects of clinics', async () => {
      const response = [
        {
          data: {
            name: 'Good Health Home',
            stateName: 'Alaska',
            availability: { from: '10:00', to: '19:30' },
          },
        },
      ];
      axios.get.mockResolvedValue(response);
      // const url = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json';
      const data = await fetchClinics('/url');
      await expect(fetchClinics('/url')).toEqual(1);
    });
  });
});
