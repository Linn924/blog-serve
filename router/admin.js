const Router = require("koa-router")
const Md5 = require("md5")
const jwt = require("jsonwebtoken")
const Mysql = require('promise-mysql2')
const mysql = require("../mysql.js")

const admin = new Router() 

//登录
admin.get('/login',async ctx => {
    const username = ctx.request.query.username.trim()
    const password = Md5(ctx.request.query.password.trim())
    const userdata = {name: username,pwd: password}
    const secret = "LinnCooper"

    const connection = await Mysql.createConnection(mysql)
    const sql = `SELECT * FROM admin where username = '${username}' and password= '${password}'`
    const [res] = await connection.query(sql)
    connection.end((err) => console.log(err))

    if (res.length > 0) {
        ctx.body = {
            code:200,
            tips:'登录成功',
            token:jwt.sign(userdata, secret)
        }
    } else {
        ctx.body = {
            code:400,
            tips:'登录失败',
        }
        
    }
})

module.exports = admin