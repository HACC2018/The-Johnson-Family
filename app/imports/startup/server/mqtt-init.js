// import * as db from '../../api/Wrapper/Wrapper';

const mqtt = require('mqtt');
const client = mqtt.connect({ host: 'm15.cloudmqtt.com', port: 18293, username: 'wqppasqw', password: 'NYLeFLsEcuEh' });
client.on('connect', function () {
  client.subscribe('jfam/gather', function (err) {
  })
})
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  // db.addSmartBinData(JSON.stringify(eval("(" + message.toString() + ")")))
})