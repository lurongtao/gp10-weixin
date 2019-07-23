const Router = require('koa-router')
const authController = require('../controller/auth')

const router = new Router()

router.get('auth', authController.auth)

module.exports = router