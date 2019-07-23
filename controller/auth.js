const config = require('../config/auth.config')
const crypto = require('crypto')

module.exports = {
  auth (ctx) {
    let {
      signature,
      echostr,
      timestamp,
      nonce
    } = ctx.query

    let orderedStr = [ config.token, timestamp, nonce ].sort().join('')
    let mySignature = crypto.createHash('sha1').update(orderedStr).digest('hex')
    
    if (mySignature === signature) {
      ctx.body = echostr
    } else {
      ctx.body = ''
    }
  }
}