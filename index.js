'use strict';
let os = require('os');


let bit_to_megabyte = (bit) => {
    let megabyte = (bit / 8388608).toFixed(2);
    return megabyte;
}



let monitor = () => {
    let measured_process_resource = process.memoryUsage();
    let rss = bit_to_megabyte(measured_process_resource.rss),
        heapTotal = bit_to_megabyte(measured_process_resource.heapTotal), 
        heapUsed = bit_to_megabyte(measured_process_resource.heapUsed),
        process_resource_result = {},
        system_resource_result = {};

    process_resource_result = JSON.stringify({
        rss: rss,
        heapTotal: heapTotal,
        heapUsed: heapUsed
    });

    system_resource_result = JSON.stringify({
        cpu: os.cpus(),
        total_memory: os.totalmem(),
        free_memory: os.freemem()
    });
    

    console.log(`프로세스 자원 사용량: \n${process_resource_result}`);
    console.log(`서버 자원 사용량: \n ${system_resource_result}`);
}

setInterval(monitor, 1000);