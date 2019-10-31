// 引入路径模块
const path = require('path');
// 引入自定义数据库模块
// const mysql = require(path.join(__dirname, './mysql.js'));

// ------配置 alipay SDK 环境
// 导入 SDK
const AlipaySDK = require("alipay-sdk").default;
// 导入配置
const alipayConfig = require(path.join(__dirname, './alipay_config.js'));
// 初始化
const alipay = new AlipaySDK(alipayConfig.AlipayBaseConfig)

// 引入 alipayFormData 构造函数，用来创建网站支付需要的 form 表单
const AlipayFormData = require('alipay-sdk/lib/form').default;

// 编写一个创建支付订单的函数，异步等待执行的函数
async function createOrder(goods) {
    let method = 'alipay.trade.page.pay'; // 统一收单下单并支付页面接口
    // 公共参数 可根据业务需要决定是否传入，当前不用
    // let params = {
    //     app_id: '', // 应用 id
    //     method: method, // 调用接口
    //     format: 'JSON', // 返回数据
    //     charset: 'utf-8', // 字符编码
    //     sign_type: 'RSA2', // 验签类型
    //     timestamp: getFormatDate(), // 请求时间戳
    //     version: '1.0', // 版本
    // }
    // 根据官方给的 API 文档提供的一个参数集合
    let bizContent = {
        out_trade_no: Date.now(), // 根据时间戳来生成一个订单号,
        product_code: 'FAST_INSTANT_TRADE_PAY', // 商品码，当前只支持这个
        total_amount: goods.cost, // 商品价格
        subject: goods.goodsName, // 商品名称
        timeout_express: '5m', // 超时时间
        passback_params: JSON.stringify(goods.pack_params), // 将会返回的一个参数，可用于自定义商品信息最后做通知使用
    }
    const formData = new AlipayFormData(); // 获取一个实例化对象
    formData.addField('returnUrl', 'http://你的网站/payresult'); // 客户端支付成功后会同步跳回的地址
    formData.addField('notifyUrl', 'http://你的网站/notify.html'); // 支付宝在用户支付成功后会异步通知的回调地址，必须在公网 IP 上才能收到
    formData.addField('bizContent', bizContent); // 将必要的参数集合添加进 form 表单

    // 异步向支付宝发送生成订单请求, 第二个参数为公共参数，不需要的话传入空对象就行
    const result = await alipay.exec(method, {}, {
        formData: formData
    });
    // 返回订单的结果信息
    return result;
}

// 获取 yyyy-mm-dd HH:MM:SS 格式的时间
function getFormatDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    month = month >= 10 ? month : ('0' + month);
    day = day >= 10 ? day : ('0' + day);
    hour = hour >= 10 ? hour : ('0' + hour);
    min = min >= 10 ? min : ('0' + min);
    sec = sec >= 10 ? sec : ('0' + sec);

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

// 将生成订单的方法暴露出去
module.exports = {
    createOrder: createOrder
}