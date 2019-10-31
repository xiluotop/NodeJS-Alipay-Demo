/*
 这个自定义模块用来进行 mysql 数据库订单的增加和查询功能
*/

// 引入 mysql 模块
const mysql = require('mysql');

// 配置 mysql
const mysqlConfig = {
    host: 'localhost', // 数据库主机名
    port: '3306', // 端口号
    user: 'root', // 用户名
    password: '123456', // 密码
    database: 'alipay', // 数据库名
}

// 封装查询函数
function selectSql(sqlstr,callback) {
    // 建立数据库连接
    let sql = mysql.createConnection(mysqlConfig);
    let result = null;
    if (sql) {
        sql.query(sqlstr, callback);
        // 关闭数据库连接
        sql.end();
    }
}

// 封装添加函数
function addSql(sqlstr,callback) {
    return selectSql(sqlstr,callback);
}

// 将两个数据库操作方法暴露
module.exports = {
    selectSql: selectSql,
    addSql: addSql
}