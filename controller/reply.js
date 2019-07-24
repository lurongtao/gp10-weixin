let getRawBody = require('raw-body')
let xmljs = require('xml-js')
const log4js = require('log4js')
log4js.configure({
  appenders: { reply: { type: 'file', filename: 'reply.log' } },
  categories: { default: { appenders: ['reply'], level: 'debug' } }
})
const logger = log4js.getLogger('reply')

module.exports = {
  // getRawBody,第一个参数是Node.js的Stream
  // 此处要定义为ctx.req, 而不是ctx.request
  async autoreply(ctx) {
    let xml = await getRawBody(ctx.req, {
      length: ctx.req.headers['content-length'],
      limit: '1mb',
      encoding: true
    })
    
    // 将xml转化js
    let replyObject = xmljs.xml2js(xml, {
      compact: true,
      cdataKey: 'value',
      textKey: 'value'
    })

    // 归并，扁平化js对象
    let xmlObj = replyObject['xml']
    let result = Object.keys(xmlObj).reduce((obj, key) => {
      obj[key] = xmlObj[key]['value']
      logger.debug(obj)
      return obj
    }, {})
    
    // 此处ToUserName，FromUserName要把拿到的数据，做个颠倒
    let data = {
      Content: '<a href="https://walter666.cn/">JSSDK-DEMO</a>',
      CreateTime: new Date().getTime(),
      ToUserName: result.FromUserName,
      FromUserName: result.ToUserName
    }

    await ctx.render('reply', data)
  }
}