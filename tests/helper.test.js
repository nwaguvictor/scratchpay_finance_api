'use strict';
const { getItemByAvailability } = require('../src/utils/helper');

describe('Helper Mathods', () => {
  describe('getItemByAvailability', () => {
    it('should return true if found a matched clinic with query', () => {
      const item = { availability: { from: '01:00', to: '02:00' } };
      const query = 'from:01:00,to:02:00';
      const result = getItemByAvailability(item, query);
      expect(result).toBeTruthy();
    });
    it('should return false if no clinic was found with query', () => {
      const item = { availability: { from: '01:00', to: '02:00' } };
      const query = 'from:00:00,to:02:00';
      const result = getItemByAvailability(item, query);
      expect(result).not.toBeTruthy();
    });
  });
});
