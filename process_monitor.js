'use strict';
const pid_usage = require('pidusage'),
      osu = require('node-os-utils');
const PID = process.pid;

let bit_to_megabyte = (bit) => {
  let megabyte = parseFloat((bit / 8388608).toFixed(2));
  return megabyte;
}

let resource_monitor = () => {
  setInterval(async () => {
    let output = {};
    let process_total_status = await pid_usage(PID);
    let server_cpu_usage = await osu.cpu.usage();
    let server_mem_usage = await osu.mem.info();
    output.timestamp = parseInt(process_total_status.timestamp/1000);
    output.server_cpu = parseInt(server_cpu_usage);
    output.server_memory_used = parseInt(server_mem_usage.usedMemMb);
    output.server_memory_free = parseInt(server_mem_usage.freeMemMb);
    output.process_cpu = parseInt(process_total_status.cpu);
    output.process_memory = bit_to_megabyte(process_total_status.memory);
    
    //console.log(output);
    console.log(`${output.timestamp}, ${output.server_cpu}, ${output.server_memory_used}, ${output.server_memory_free}, ${output.process_cpu}, ${output.process_memory}`);
    /**
     *         
        freeMemMb:2257.28
        freeMemPercentage:13.78
        totalMemMb:16384
        usedMemMb:14126.72
     */
    output = null;
  }, 1000);
}

resource_monitor();

//process_name, timestamp, server_cpu, server_memory_mb, , process_cpu, process_memory_mb