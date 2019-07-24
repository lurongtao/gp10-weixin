const http = require('../utils/http')
const config = require('../config/weixin.config')
const tools = require('../utils/tools')
const querystring = require('querystring')
const db = require('../model/index')

module.exports = {
  async generate(ctx) {
    db('select * from token', [], (results) => {
      console.log(results)
    })

    //1、获取access_token
    let { appID, appsecret } = config
    let { access_token, expires_in:at_expires_in } = await http.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`)

    //2、获取jsapi_ticket
    let { ticket, expires_in:jt_expires_in } = await http.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`)

    //3、生成签名
    let noncestr = tools.noncestr()
    let timestamp = tools.timestamp()

    let string1Obj = {
      noncestr,
      jsapi_ticket: ticket,
      timestamp,
      url: config.url
    }

    let sortedString1Obj = Object.keys(string1Obj).sort().reduce((obj, key) => {
      obj[key] = string1Obj[key]
      return obj
    }, {})

    let string1 = querystring.stringify(sortedString1Obj, null, null, {
      encodeURIComponent(str) {
        return querystring.unescape(str)
      }
    })

    let signature = tools.sha1(string1)

    // 返回config信息
    ctx.body = {
      appId: config.appID,
      timestamp,
      nonceStr: noncestr,
      signature
    }
  }
}