import CryptoJS from "crypto-js";

//var key = CryptoJS.enc.Utf8.parse(getKey());
var key  = CryptoJS.enc.Utf8.parse('smkldospdosldaaa');
var iv   = CryptoJS.enc.Utf8.parse('0392039203920300');

export function getKey(){
    //重新请求获取key
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var header = req.getResponseHeader("Random-Key");
    return header;
}

/**
 * [encrypt 加密]
 * @return {[type]} [description]
 */
export function encrypt(content) {
    var encryptResult = CryptoJS.AES.encrypt(content, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptResult.toString();
}

/**
 * [decrypt 解密]
 * @return {[type]} [description]
 */
export function decrypt(content) {
    // var encryptedHexStr  = CryptoJS.enc.Hex.parse(content);
    // var encryptedBase64Str  = CryptoJS.enc.Base64.stringify(content);
    var bytes = CryptoJS.AES.decrypt(content, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
    return decryptResult.toString();
}