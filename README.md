# service_log

한국어: 이 프로젝트는 서버의 인프라를 관리하기위해, node의 process기능을 사용하여 자원들을 수집합니다.
수집된 로그들을 보고, 서버의 현재상태와 고장점에 도달하는 과정을 모니터링 함으로써 메인 프로젝트의 가용성 향상에 도움이 될 수 있는 요소들을 파악할 것이다.

English: This project uses the process function of node to collect resources in order to manage the server's infrastructure.
The resources collected are transferred to the elastic search on the admin server using filebeats.
By viewing the collected logs and monitoring, the current state of the server and the process of reaching the failure points.

This software will identify the factors that may help improve the availability of the main project.

## Installation

Using npm:
```shell
$ npm i service_log
```
In Node.js:
```js
// Load the service_log package
var su = require('service_log');

// Make a logger object
var logger = new su(process.pid, 'service_name');

// Start logger
logger.start();

// Stop logger
logger.end();
```

## Output
```shell
service_name_log.log
```

Output example
```text
timestamp, server_cpu, server_memory_used, server_memory_free, process_cpu, process_memory
1582622716, 6, 16261, 122, 6, 2.23
1582622717, 6, 16261, 122, 1, 2.26
1582622718, 4, 16259, 124, 1, 2.27
1582622719, 4, 16246, 137, 1, 2.27
1582622720, 5, 16259, 124, 0, 2.27
1582622721, 4, 16259, 124, 1, 2.3
1582622722, 2, 16239, 144, 1, 2.3
1582622723, 3, 16239, 144, 1, 2.21
1582622724, 2, 16239, 145, 4, 2.07
1582622725, 2, 16239, 144, 0, 2.08
```
