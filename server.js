const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const auth = require('./router/')

const router = new Router()
router.use('/', auth.routes())

app.use(router.routes())

app.listen(3333, () => {
  console.log('localhost:3333')
})