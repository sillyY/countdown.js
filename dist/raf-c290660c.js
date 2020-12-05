'use strict';

var start;
function rafAdapter(config) {
    var timestamp = config.timestamp, delay = config.delay, callback = config.callback;
    if (start === undefined) {
        start = timestamp;
    }
    var elapsed = timestamp - start;
    if (elapsed < delay) {
        window.requestAnimationFrame(callback);
    }
}

exports.default = rafAdapter;
