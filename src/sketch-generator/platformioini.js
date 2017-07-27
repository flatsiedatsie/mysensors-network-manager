import { boardsById, chips } from '../lib/constants';

export default ({ network, nodeId }) => {
  const board = network.nodes.find(n => n.id === nodeId).board;

  return `
; PlatformIO Project Configuration File
;
;   Build options: build flags, source filter, extra scripting
;   Upload options: custom port, speed and extra flags
;   Library options: dependencies, extra library storages
;
; Please visit documentation for the other options and examples
; http://docs.platformio.org/en/stable/projectconf.html

[env:${board}]
platform = ${chips[boardsById[board].chip].platform}
framework = arduino
board = ${board}
lib_deps = https://github.com/mysensors/MySensors#development
`};
