const su = require('./service_log'),
      monitor = new su(process.pid, 'service_name','./logs/');

monitor.start();


setTimeout(() => {monitor.clear()}, 11000);