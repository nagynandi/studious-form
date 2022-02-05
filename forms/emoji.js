const correctEmoji = [129321, 128578, 128526, 128525, 128175, 128077, 128076, 9989, 128512, 129299, 128079];
const wrongEmoji = [9940, 10060, 10071, 128534, 128547, 128553, 128555, 128565, 128565, 129318, 129320, 128683, 128680];

export default Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

export {correctEmoji, wrongEmoji}