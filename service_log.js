'use strict';
const pid_usage = require('pidusage'),
      osu = require('node-os-utils'),
      fs = require('fs');

let bit_to_megabyte = (bit) => {
    let megabyte = parseFloat((bit / 8388608).toFixed(2));
    return megabyte;
}
/** 
  * Execute resource manager with export type.
  * @param {String} 'csv' or 'json'
  */

class service_log {
    constructor (pid, service_name) {
        if(service_name === undefined) {
            service_name = 'service'
        }
        this.service_name = service_name
        this.pid = pid;
        this.timer = {};
    }
    start() {
        let monitoring_count = 0,
            log_string = '';
        this.timer = setInterval(async () => {
            const csv_header = 'timestamp, server_cpu, server_memory_used, server_memory_free, process_cpu, process_memory\n';
            let output = {},
                process_total_status = await pid_usage(this.pid),
                server_cpu_usage = await osu.cpu.usage(),
                server_mem_usage = await osu.mem.info(),
                csv_body ='';
            output.timestamp = parseInt(process_total_status.timestamp/1000);
            output.server_cpu = parseInt(server_cpu_usage);
            output.server_memory_used = parseInt(server_mem_usage.usedMemMb);
            output.server_memory_free = parseInt(server_mem_usage.freeMemMb);
            output.process_cpu = parseInt(process_total_status.cpu);
            output.process_memory = bit_to_megabyte(process_total_status.memory);
            csv_body= `${output.timestamp}, ${output.server_cpu}, ${output.server_memory_used}, ${output.server_memory_free}, ${output.process_cpu}, ${output.process_memory}\n`
            //console.log(output);
            /** 
             * CSV type output
             * process_name, timestamp, server_cpu, server_memory_mb, , process_cpu, process_memory_mb
             * 1582042197, 6, 10766, 5617, 9, 2.43
             */
            if(monitoring_count === 0) {
                log_string += csv_header;
                log_string += csv_body;
                monitoring_count ++;
            //mid
            } else if(monitoring_count < 9){
                log_string += csv_body;
                monitoring_count ++;
            //10 seconds later
            } else {
                log_string += csv_body;
                fs.writeFile(`${this.service_name}_logs.log`, log_string, function (err) {
                    if (err) 
                        return console.log(err);
                });
                //Clear All
                log_string= '';
                monitoring_count = 0;
            }
            output = null;
            process_total_status = null;
            server_cpu_usage = null;
            server_mem_usage = null;
            
        }, 1000);
    };
    clear() {
        if(this.timer != {}) {
            clearInterval(this.timer);
        }
    };
}

module.exports = service_log;