const mysql = require('mysql')

// 创建数据池
const pool  = mysql.createPool({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '11111111',   // 数据库密码
  database : 'weixin'  // 选中数据库
})

// 在数据池中进行会话操作
module.exports = (sql, config) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
    
      connection.query(sql, config, (error, results, fields) => {
  
        resolve(results)
    
        // 结束会话
        connection.release();
    
        // 如果有错误就抛出
        if (error) throw error;
      })
    })
  })
}