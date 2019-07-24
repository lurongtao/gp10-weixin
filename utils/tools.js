const randomstring = require('randomstring')
const crypto = require('crypto')

exports.noncestr = () => {
  return randomstring.generate(32)
}

exports.timestamp = () => {
  return Math.floor(new Date().getTime() / 1000)
}

exports.sha1 = (str) => {
  return crypto.createHash('sha1').update(str).digest('hex')
}