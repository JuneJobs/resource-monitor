'use strict';
const pid_usage = require('pidusage'),
      osu = require('node-os-utils'),
      PID = process.pid;

let bit_to_megabyte = (bit) => {
  let megabyte = parseFloat((bit / 8388608).toFixed(2));
  return megabyte;
}
/** 
  * Execute resource manager with export type.
  * @param {String} 'csv' or 'json'
  */

let resource_monitor = (export_type) => {
  setInterval(async () => {
    let output = {},
        process_total_status = await pid_usage(PID),
        server_cpu_usage = await osu.cpu.usage(),
        server_mem_usage = await osu.mem.info();
    output.timestamp = parseInt(process_total_status.timestamp/1000);
    output.server_cpu = parseInt(server_cpu_usage);
    output.server_memory_used = parseInt(server_mem_usage.usedMemMb);
    output.server_memory_free = parseInt(server_mem_usage.freeMemMb);
    output.process_cpu = parseInt(process_total_status.cpu);
    output.process_memory = bit_to_megabyte(process_total_status.memory);
    
    //console.log(output);
    /** 
      * CSV type output
      * process_name, timestamp, server_cpu, server_memory_mb, , process_cpu, process_memory_mb
      * 1582042197, 6, 10766, 5617, 9, 2.43
      * 
      * JSON type output
      * {"timestamp":1582042279,"server_cpu":10,"server_memory_used":10861,"server_memory_free":5522,"process_cpu":10,"process_memory":2.42}
      */
    if(export_type === 'csv') {
      console.log(`${output.timestamp}, ${output.server_cpu}, ${output.server_memory_used}, ${output.server_memory_free}, ${output.process_cpu}, ${output.process_memory}`);
    } else if(export_type == 'json') {
      console.log(JSON.stringify(output));
    }
    
    output = null;
    process_total_status = null;
    server_cpu_usage = null;
    server_mem_usage = null;
  }, 1000);
}

resource_monitor('json');

module.export = resource_monitor;