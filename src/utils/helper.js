'use strict';

const _ = require('underscore');
const axios = require('axios').default;

const findMany = (query = {}, items = []) => {
  if (_.isEmpty(query)) return items;

  let { name, state, availability } = query;

  return items.filter(item => {
    if (name && state) {
      return (item.name === name || item.clinicName === name) && (item.stateCode === state || item.stateName === name);
    }
    if (name && availability) {
      return getItemByAvailability(item, availability) && (item.name === name || item.clinicName === name);
    }
    if (state && availability) {
      return getItemByAvailability(item, availability) && (item.stateCode === state || item.stateName === state);
    }
    if (name) return item.name === name || item.clinicName === name;
    if (state) return item.stateCode === state || item.stateName === state;
    if (availability) return getItemByAvailability(item, availability);
  });
};

const fetchClinics = async url => {
  const response = await axios.get(url);
  return response.data;
};

function getItemByAvailability(item = {}, availability = '') {
  const duration = availability.split(',');
  const from = duration[0].split(':').slice(1).join(':');
  const to = duration[1].split(':').slice(1).join(':');

  return (
    (item.availability?.from === from && item.availability?.to === to) ||
    (item.opening?.from === from && item.opening?.to === to)
  );
}

module.exports = {
  getItemByAvailability,
  fetchClinics,
  findMany,
};
