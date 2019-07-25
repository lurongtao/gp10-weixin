const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const static = require('koa-static')
const path = require('path')

const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './public'

app.use(static(
  path.join( __dirname, staticPath)
))

app.use(bodyParser({
  extendTypes: {
    text: ['text/xml']
  }
}))

const auth = require('./router/')

const router = new Router()
router.use('/', auth.routes())

app.use(router.routes())

app.listen(3333, () => {
  console.log('localhost:3333')
})