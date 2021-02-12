const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')

let books = require('./books.js')


// app.use(async ctx => {
//     ctx.body = 'Hello world'
// })

app.use(koaBody())

app.use(books.routes())


app.listen(5000, () => console.log('App running on port 5000'))