
exports.makeCode = (length) => {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let makecode = ""
    for (let i = 0; i < length; i++) {
        let index = Math.ceil(Math.random() * 9)
        makecode += chars[index];
    }
    return makecode
};


exports.postCode = (phone, code, back) => {

    const md5 = require('blueimp-md5')
    const Base64 = require('js-base64').Base64
    const moment = require('moment')
    const request = require('request')

    const ACCOUNT_SID = "8aaf07087c355e9b017c687fa2a60649"
    const AUTH_TOKEN = "e36e79db50e84f19ae19fa9d906657fe"
    const Rest_URL = "https://app.cloopen.com:8883"
    const AppID = "8aaf07087c355e9b017c687fa3cc0650"

    let time = moment().format('YYYYMMDDHHmmss');
    let sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time).toUpperCase();
    let url = Rest_URL + '/2013-12-26/Accounts/' + ACCOUNT_SID + '/SMS/TemplateSMS?sig=' + sigParameter;

    let body = {
        to: phone,
        appId: AppID,
        templateId: "1",
        'datas': [code, "1"]
    }

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(body).length + '',
        'Authorization': Base64.encode(ACCOUNT_SID + ':' + time)
    }
    request({
        method: 'POST',
        url: url,
        headers: headers,
        body: body,
        json: true,
    }, (err, res, body) => {
        back(body.statusCode == '000000', body.statusCode)
    });
}
