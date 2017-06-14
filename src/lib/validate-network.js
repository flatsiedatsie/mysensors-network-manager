import { radios } from './constants';

const createExpect = record => (value, path) => {
  const chainable = {
    toBeAvailable: () => {
      if(typeof value === 'undefined') record({path, error: 'required'});
      if(typeof value === 'string' && value.trim() === '') record({path, error: 'required'});

      return chainable;
    },
    toBeA: type => {
      chainable.toBeAvailable();

      if(type === 'array') {
        if(!Array.isArray(value)) record({path, error: 'type'});
      } else {
        if(typeof value !== type) record({path, error: 'type'});
      }
    },
    toBePattern: pattern => {
      chainable.toBeA('string');
      if(typeof value === 'string' && value.search(pattern) === -1) record({path, error: 'pattern'});
    },
    toBe: rhs => {
      if(value !== rhs) record({path, error: 'rhs'});
    },
    toBeOfSet: set => {
      if(!set.includes(value)) record({path, error: 'enum'});
    },
    toBeWithin: (min, max) => {
      chainable.toBeA('number');
      if(typeof value === 'number' && (value < min || value > max)) record({path, error: 'range'});
    },
    toBeGreaterThan: min => {
      chainable.toBeA('number');
      if(typeof value === 'number' && value <= min) record({path, error: 'min-value'});
    }
  };

  return chainable;
}

export default network => {
  const errors = [];
  const expect = createExpect(e => errors.push(e));

  expect(network.hmac, 'hmac').toBePattern(/[0-9a-fA-F]{64}/);
  expect(network.aes, 'aes').toBePattern(/^([0-9a-fA-F]{32})$/);
  expect(network.radio, 'radio').toBeOfSet(radios.map(r => r.name));

  if(network.radio === 'NRF24L01+') {
    expect(network.nrfChannel, 'nrfChannel')
      .toBeOfSet(radios.find(r => r.name === 'NRF24L01+').frequencies.map(f => f.value));
  } else if(network.radio === 'RFM69') {
    expect(network.rfmFrequency, 'rfmFrequency')
      .toBeOfSet(radios.find(r => r.name === 'RFM69').frequencies.map(f => f.value));
  }

  expect(network.nodes, 'nodes').toBeA('array');

  expect(network.nodes.find(n => n.type === 'gateway'), 'gateway').toBeA('object');

  network.nodes.forEach((node, nodeIndex) => {
    const ex = (node, key = '') => expect(node, `node[${nodeIndex}].${key}`);

    ex(node).toBeA('object');
    if(typeof node !== 'object') return;

    ex(node.key, 'key').toBePattern(/([0-9a-fA-F]{18})/);

    if(network.radio === 'NRF24L01+') {
      ex(node.pa, 'pa').toBeAvailable();
    } else if(network.radio === 'RFM69') {
      ex(node.hw, 'hw').toBeAvailable();
    }

    ex(node.battery, 'battery').toBeA('object');
    if(typeof node.battery === 'object') {
      ex(node.battery.powered, 'battery.powered').toBeA('boolean');

      if(node.battery.powered) {
        ex(node.battery.min, 'battery.min').toBeWithin(0, 24);
        ex(node.battery.max, 'battery.max').toBeWithin(0, 24);
        ex(node.battery.measure, 'battery.measure').toBeOfSet(['internal', 'external']);
        ex(node.sleepTime, 'sleepTime').toBeGreaterThan(0);
        ex(node.sleepUnit, 'sleepUnit').toBeOfSet(['seconds', 'minutes', 'hours', 'days']);

        if(node.battery.measure === 'external') {
          ex(node.battery.measurePin, 'battery.measurePin').toBeA('string');
          ex(node.battery.voltsPerBit, 'battery.voltsPerBit').toBeA('number');
        }
      }
    }

    ex(node.signing, 'signing').toBeOfSet(['software', 'atsha204']);
    if(node.signing === 'software') {
      ex(node.softSigningPin, 'softSigningPin').toBeA('string');
    } else {
      ex(node.atshaSigningPin, 'atshaSigningPin').toBeA('string');
    }
  });

  return errors;
}
