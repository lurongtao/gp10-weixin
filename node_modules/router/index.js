const Router = require('koa-router')
const authController = require('../controller/auth')
const replyController = require('../controller/reply')
const jsapiController = require('../controller/jsapi')

const router = new Router()

router.get('auth', authController.auth)
router.post('auth', replyController.autoreply)

router.get('jsapi', jsapiController.generate)

module.exports = router