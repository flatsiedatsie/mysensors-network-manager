import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { addNode, deleteNetwork } from './Network';
import Node from '../components/Node';

export const createHandlers = dispatch => (networkId, nodeId) => {
  const d = (type, action) => dispatch({
    type: `NODE/${type}`,
    networkId,
    nodeId,
    ...action
  });

  return {
    addNode: addNode(dispatch),
    deleteNetwork: deleteNetwork(dispatch),

    deleteNode: _ => { d('DELETE'); dispatch(push(`/networks/${networkId}`)); },

    setName: name => d('SET_NAME', { name }),
    setBoard: board => d('SET_BOARD', { board }),
    setDeviceKey: key => d('SET_DEVICE_KEY', { key }),
    setPA: pa => d('SET_PA', { pa }),
    setHW: hw => d('SET_HW', { hw }),
    setBatteryPowered: b => d('SET_BATTERY_POWERED', { batteryPowered: b }),
    setBatteryMin: min => d('SET_BATTERY_MIN', { min }),
    setBatteryMax: max => d('SET_BATTERY_MAX', { max }),
    setMeasure: measure => d('SET_BATTERY_MEASURE', { measure }),
    setMeasurePin: measurePin => d('SET_BATTERY_MEASURE_PIN', { measurePin }),
    setVoltsPerBit: voltsPerBit => d('SET_BATTERY_VPB', { voltsPerBit }),

    setSleepTime: sleepTime => d('SET_SLEEP_TIME', { sleepTime }),
    setSleepUnit: sleepUnit => d('SET_SLEEP_UNIT', { sleepUnit }),

    addSensor: sensor => d('ADD_SENSOR', { sensor }),
    deleteSensor: index => d('DELETE_SENSOR', { index }),

    setSigning: signing => d('SET_SIGNING', { signing }),
    setSoftSigningPin: signingPin => d('SET_SOFT_SIGNING_PIN', { signingPin }),
    setAtshaSigningPin: signingPin => d('SET_ATSHA_SIGNING_PIN', { signingPin }),

    sensorHandlers: sensorIndex => {
      const ds = (type, action) => d(type, { sensorIndex, ...action });

      return {
        setPin: pin => ds('SET_SENSOR_PIN', { pin }),
        setReverse: reverse => ds('SET_SENSOR_REVERSE', { reverse }),
        usePowerPin: use => ds('SET_SENSOR_USE_POWER_PIN', { use }),
        setPowerPin: pin => ds('SET_SENSOR_POWER_PIN', { pin }),
        setReportPercentage: percent => ds('SET_SENSOR_REPORT_PERCENTAGE', { percent }),
        setPercentageMin: min => ds('SET_SENSOR_PERCENTAGE_MIN', { min }),
        setPercentageMax: max => ds('SET_SENSOR_PERCENTAGE_MAX', { max }),
        setReportInterval: time => ds('SET_SENSOR_REPORT_INTERVAL', { time }),
        setReportIntervalUnit: unit => ds('SET_SENSOR_REPORT_INTERVAL_UNIT', { unit }),
        setMvPerAmp: mvPerAmp => ds('SET_SENSOR_MV_PER_AMP', { mvPerAmp }),
        setOnValue: value => ds('SET_SENSOR_ON_VALUE', { value }),
        setInitialValue: value => ds('SET_SENSOR_INITIAL_VALUE', { value }),
        setAutoTurnOff: turnOff => ds('SET_SENSOR_AUTO_TURN_OFF', { turnOff }),
        setTurnOffTime: time => ds('SET_SENSOR_TURN_OFF_TIME', { time }),
        setInterruptMode: mode => ds('SET_SENSOR_INTERRUPT_MODE', { mode }),
        setDebounceTime: time => ds('SET_SENSOR_DEBOUNCE_TIME', { time }),
        setNormalValue: value => ds('SET_SENSOR_NORMAL_VALUE', { value }),
        setTriggerPin: triggerPin => ds('SET_SENSOR_TRIGGER_PIN', { triggerPin }),
        setEchoPin: echoPin => ds('SET_SENSOR_ECHO_PIN', { echoPin })
      }
    }
  }
};

export default connect(
  s => s,
  dispatch => ({ dispatch, createHandlers: createHandlers(dispatch) })
)(Node);
