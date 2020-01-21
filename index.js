'use strict';
let osu = require('node-os-utils'),
    cpu = osu.cpu,
    mem = osu.mem;

let bit_to_megabyte = (bit) => {
    let megabyte = (bit / 8388608).toFixed(2);
    return megabyte;
}

let get_server_resource = async () => {
    let cpu_usage = await cpu.usage(),
        mem_usage = await mem.info();
        return {
            cpu_usage: cpu_usage, 
            mem_usage: mem_usage
        };
}


let monitor = async () => {
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

    system_resource_result = await JSON.stringify(get_server_resource);
    system_resource_result;
    console.log(`프로세스 자원 사용량: \n${process_resource_result}`);
    console.log(`서버 자원 사용량: \n ${system_resource_result}`);
}

setInterval(monitor, 1000);