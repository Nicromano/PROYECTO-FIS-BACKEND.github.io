const {format} = require('timeago.js');


var time = {};

time.convertTime = (timestamp) => {
    return format(timestamp);
}
module.exports = time;
