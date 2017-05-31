import nrfImage from '../images/nrf.jpg';
import rfmImage from '../images/rfm.png';

export const radios = [
  {
    name: 'NRF24L01+',
    image: nrfImage,
    pros: 'Cheap! No external antenna needed.',
    cons: 'Possible interference and range issues.',
    frequencies: Array(125).fill(0).map((_, channel) => ({
      value: channel,
      display: `2.${(400 + channel).toString().replace(/0+$/,'')} GHz (ch: ${channel + 1})`
    })),
    defaultChannel: 76
  },
  {
    name: 'RFM69',
    image: rfmImage,
    pros: 'Less interference, better range.',
    cons: 'More expensive. Needs an external antenna.',
    frequencies: [433,868,915].map(f => ({ value: f, display: `${f} MHz` })),
    defaultFrequency: 868
  }
];

export const gatewayTypes = [
  {
    name: 'serial',
    title: 'Serial gateway',
    description: 'The gateway is directly connected to a computer\'s serial port, usually through a USB cable.'
  },
  {
    name: 'ethernet',
    title: 'Ethernet based gateway',
    description: 'The gateway is connected to your ethernet network using an ethernet cable'
  },
  {
    name: 'esp8266',
    title: 'ESP8266 WiFi based gateway',
    description: 'The gateway is connected to your ethernet network using the ESP8266 module'
  }
];

export const spFiles = ([
  { key: 'sp-ino', name: 'SecurityPersonalizer.ino' },
  { key: 'src-h', name: 'sha204_lib_return_codes.h' },
  { key: 'sl-c', name: 'sha204_library.cpp' },
  { key: 'sl-h', name: 'sha204_library.h' }
]).map(f => ({ ...f, path: 'https://raw.githubusercontent.com/mysensors/MySensors/development/examples/SecurityPersonalizer/'}));

export const nmFiles = ([
  { key: 'nm-c', name: 'NodeManager.cpp' },
  { key: 'nm-h', name: 'NodeManager.h' }
]).map(f => ({ ...f, path: 'https://raw.githubusercontent.com/mysensors/NodeManager/master/' }));
