const path = require("path");
const bp = require('body-parser');
// 引入自定义 mysql 工具
const mysql = require(path.join(__dirname, './mysql.js'));
// 引入 express
const express = require('express');
// 获取 express 实例对象
let app = express();

// 设置托管静态资源
app.use(express.static(path.join(__dirname, './public')));
// 处理 post 请求参数
app.use(bp.urlencoded({
    extended: false
}));

// 前端响应要创建订单的数据对象
app.get('/payinfo', (req, res) => {
    let data = req.query;
    // 做一个简单的商品判断
    if (data && (data.goodsName === '大卫龙' || data.goodsName === '冰阔咯' || data.goodsName === '雪碧' || data.goodsName === 'QQB') && data.count && data.cost) {
        res.send(Object.assign(data, {
            code: 200,
        }));
    } else {
        res.setHeader('content-type', 'application/javascript');
        res.send('alert("信息有误，请重新尝试！！！")');
    }
})

// 获取创建订单的自定义模块
const createOrder = require(path.join(__dirname, './createOrder.js')).createOrder;
// 获取验签自定义模块
const checkSign = require(path.join(__dirname, './checkSign.js'));

// 生成订单请求
app.post('/createOrder', (req, res) => {
    console.log(req.body.price);
    req.body.pack_params = {
        payName: req.body.payName,
        goodsName: req.body.goodsName,
        price: req.body.price,
        count: req.body.count,
        cost: req.body.cost,
    }
    async function asyncCreate() {
        const result = await createOrder(req.body);
        res.send(result);
    }
    asyncCreate();
});

// 支付的信息展示
app.get('/payresult', (req, res) => {
    let htmlStr = '';
    htmlStr += `<p>` + '商户订单号' + ': ' + req.query.out_trade_no + '</p>'
    htmlStr += `<p>` + '支付宝交易订单号' + ': ' + req.query.trade_no + '</p>'
    htmlStr += `<p>` + '交易金额' + ': ' + req.query.total_amount + '￥</p>'
    htmlStr += `<p>` + '交易时间' + ': ' + req.query.timestamp + '￥</p>'
    htmlStr += '<h1 style:"text-align:center;">支付成功！！！<a href="./index.html">返回首页!</a></h1>'
    res.send(htmlStr);
})

app.post('/notify.html', (req, res) => {
    // 输出验签结果
    async function checkResult(postData) {
        let result = await checkSign(postData);
        if (result) {
            // console.log('订单成功支付！！！请做处理')
            // console.log(req.body);
            let data = req.body;
            let goods = JSON.parse(data.passback_params);
            let sqlStr = `
            insert into order_list value("${data.out_trade_no}",
                "${data.trade_no}",
                "${goods.goodsName}",
                ${goods.price},
                ${goods.count},
                ${data.total_amount},
                "支付成功",
                "${goods.payName}");
            `;
            // 响应支付宝 success 处理成功，否则支付宝会一直定时发送异步通知
            res.end('success');
            mysql.addSql(sqlStr)
        }
    }
    checkResult(req.body);
})

// 查询订单接口
app.get('/getorder', (req, res) => {
    mysql.selectSql('select * from order_list', (err, result) => {
        result = Object.assign({
            code: 200,
            msg: '获取成功',
            list: JSON.stringify(result),
        })
        res.send(result);
    });
})

app.listen(9999, () => {
    console.log('server start with 9999...');
})