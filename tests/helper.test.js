'use strict';

const { getItemByAvailability, findMany } = require('../src/utils/helper');

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

  describe('findMany', () => {
    it('should return an array of all objects if query object is empty', () => {
      const arrayOfObject = [{ name: 'a' }, { name: 'b' }];
      const query = {};
      const result = findMany(query, arrayOfObject);
      expect(result).toEqual([{ name: 'a' }, { name: 'b' }]);
    });
    it('returns array of objects matching the given name AND state query options, otherwise, or empty array', () => {
      const arrayOfObject = [
        { name: 'a', stateCode: 'b' },
        { clinicName: 'c', stateName: 'd' },
      ];
      const result = findMany({ name: 'a', stateCode: 'b' }, arrayOfObject);

      expect(result).toEqual(expect.arrayContaining([{ name: 'a', stateCode: 'b' }]));
      expect(findMany({ name: 'e', stateCode: 'f' }, arrayOfObject)).toEqual([]);
    });
    it('returns array of objects matching the given name AND availability query options, or empty array', () => {
      const arrayOfObject = [
        { name: 'a', availability: { from: '00:01', to: '00:01' } },
        { name: 'b', availability: { from: '00:11', to: '00:11' } },
      ];
      const query = { name: 'a', availability: 'from:00:01,to:00:01' };
      const result = findMany(query, arrayOfObject);

      expect(result).toEqual(expect.arrayContaining([{ name: 'a', availability: { from: '00:01', to: '00:01' } }]));
      expect(findMany({ name: 'a', availability: 'from:00:11,to:00:22' }, arrayOfObject)).toEqual([]);
    });
    it('returns array of objects matching the given state AND availability query options, or empty array', () => {
      const arrayOfObject = [
        { stateCode: 'a', availability: { from: '00:01', to: '00:01' } },
        { stateName: 'b', opening: { from: '00:11', to: '00:11' } },
      ];
      const query = { state: 'a', availability: 'from:00:01,to:00:01' };
      const result = findMany(query, arrayOfObject);
      const expected = { stateCode: 'a', availability: { from: '00:01', to: '00:01' } };

      expect(result).toEqual(expect.arrayContaining([expected]));
      expect(findMany({ state: 'c', availability: 'from:00:01,to:00:01' }, arrayOfObject)).toEqual([]);
    });
    it('returns array of objects matching the given name query options, or empty array', () => {
      const arrayOfObject = [{ name: 'a' }, { clinicName: 'b' }];
      const result = findMany({ name: 'a' }, arrayOfObject);

      expect(result).toEqual(expect.arrayContaining([{ name: 'a' }]));
      expect(findMany({ name: 'c' }, arrayOfObject)).toEqual([]);
    });
    it('returns array of objects matching the given state query options, or empty array', () => {
      const arrayOfObject = [{ stateCode: 'a' }, { stateName: 'b' }];
      const result = findMany({ state: 'b' }, arrayOfObject);

      expect(result).toEqual(expect.arrayContaining([{ stateName: 'b' }]));
      expect(findMany({ state: 'c' }, arrayOfObject)).toEqual([]);
    });
    it('returns array of objects matching the given availability query options, or empty array', () => {
      const arrayOfObject = [
        { availability: { from: '00:01', to: '00:11' } },
        { opening: { from: '00:01', to: '00:11' } },
      ];
      const result = findMany({ availability: 'from:00:01,to:00:11' }, arrayOfObject);

      expect(result).toEqual(expect.arrayContaining([{ availability: { from: '00:01', to: '00:11' } }]));
      expect(findMany({ opening: 'from:00:01,to:00:22' }, arrayOfObject)).toEqual([]);
    });
  });
});
