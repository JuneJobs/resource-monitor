'use strict';
let osu = require('node-os-utils'),
    cpu = osu.cpu,
    mem = osu.mem;

let bit_to_megabyte = (bit) => {
    let megabyte = (bit / 8388608).toFixed(2);
    return megabyte;
}

let get_process_resource = () => {
    let measured_process_resource = process.memoryUsage(),
        rss = bit_to_megabyte(measured_process_resource.rss),
        heapTotal = bit_to_megabyte(measured_process_resource.heapTotal), 
        heapUsed = bit_to_megabyte(measured_process_resource.heapUsed);
    return {
        cpu_usage: "",
        mem_usage: {
            rss: rss,
            heapTotal: heapTotal,
            heapUsed: heapUsed
        }
    };
        
};

let get_server_resource = async () => {
    let cpu_usage = await cpu.usage(),
        mem_usage = await mem.info();
    return {
        cpu_usage: cpu_usage, 
        mem_usage: mem_usage
    };
};

let monitor = async () => {
    let process_resource_result = {},
        system_resource_result = {};

    process_resource_result = JSON.stringify(get_process_resource());

    system_resource_result =  await get_server_resource();
    system_resource_result = JSON.stringify(system_resource_result);
    console.log(`process resource usage: \n${process_resource_result}`);
    console.log(`pserver resource usage: \n ${system_resource_result}`);
    var os = require('os');
    var loads = os.loadavg();
}

setInterval(monitor, 1000);