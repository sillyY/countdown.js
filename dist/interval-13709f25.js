'use strict';

function rafAdapter(config) {
    const { interval, executeFn } = config;
    return new Promise(async (resolve, reject) => {
        setInterval(() => {
            executeFn();
            resolve(1);
        }, interval);
    });
}

exports.default = rafAdapter;
