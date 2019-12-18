
const crypto_js = require('crypto-js');

crypto = {}

crypto.encrypt = (message, key) =>{
    var return_val = crypto_js.AES.encrypt(message, key);
    
    return return_val.toString();

}

crypto.decrypt = (message_encrypt, key) =>{
    var byte = crypto_js.AES.decrypt(message_encrypt, key);

    var message_decrypt = byte.toString(crypto_js.enc.Utf8);

    return message_decrypt;
}
module.exports = crypto;