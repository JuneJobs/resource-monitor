'use strict';;
let bit_to_megabyte = (bit) => {
    let megabyte = (bit / 8388608).toFixed(2);
    return megabyte;
}

let monitor = () => {
    let measured_resources = process.memoryUsage();
    let rss = bit_to_megabyte(measured_resources.rss),
        heapTotal = bit_to_megabyte(measured_resources.heapTotal), 
        heapUsed = bit_to_megabyte(measured_resources.heapUsed),
        result = {};

    result = JSON.stringify({
        rss: rss,
        heapTotal: heapTotal,
        heapUsed: heapUsed
    });

    console.log(`프로세스 자원 사용량 확인: \n${result}`);
}

setInterval(monitor, 1000);