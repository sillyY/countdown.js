'use strict';

var index = require('./index-4179a6a8.js');

function rafAdapter(config) {
    var _this = this;
    var interval = config.interval, executeFn = config.executeFn;
    return new Promise(function (resolve, reject) { return index.__awaiter(_this, void 0, void 0, function () {
        return index.__generator(this, function (_a) {
            setInterval(function () {
                executeFn();
                resolve(1);
            }, interval);
            return [2];
        });
    }); });
}

exports.default = rafAdapter;
