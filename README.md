# resource-monitor

한국어: 이 프로젝트는 서버의 인프라를 관리하기위해, node의 process기능을 사용하여 자원들을 수집한다.
수집된 자원들은 filebeats를 이용하여 관리자서버의 elastic search로 전송되어 보관된다.
수집된 로그들을 보고, 서버의 현재상태와 고장점에 도달하는 과정을 모니터링 함으로써 메인 프로젝트의 가용성 향상에 도움이 될 수 있는 요소들을 파악할 것이다.

English: This project uses the process function of node to collect resources in order to manage the server's infrastructure.
The resources collected are transferred to the elastic search on the admin server using filebeats.
By viewing the collected logs and monitoring, the current state of the server and the process of reaching the failure points.
This software will identify the factors that may help improve the availability of the main project.