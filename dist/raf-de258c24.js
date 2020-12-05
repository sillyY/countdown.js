'use strict';

let start;
function rafAdapter(config) {
    const { timestamp, delay, callback } = config;
    if (start === undefined) {
        start = timestamp;
    }
    const elapsed = timestamp - start;
    if (elapsed < delay) {
        window.requestAnimationFrame(callback);
    }
}

exports.default = rafAdapter;
