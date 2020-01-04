
const generateps = require('generate-password');


generate = {}

generate.getString = (long)=>{

    var generateStr = generateps.generate({
        length: long, 
        numbers: true, 
        uppercase: true
    })

    return generateStr;
}

module.exports = generate;