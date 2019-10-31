# NodeJs 实现 alipay 网页支付功能

* v1.0
* 沙箱环境测试地址：<http://jiangck.com:9999>
* 正式测试环境地址：<http://jiangck.com:10000>
* 开发步骤：<https://jiangck.com/articles/2019/10/31/1572500443429.html>
* 喜欢的话请订阅支持下，也是对我这个新人的一个鼓励O(∩_∩)O

## 使用方法

* 使用本项目请使用 npm install 进行环境配置

## 文件介绍

* sandbox-pem
  * 存放应用私钥和应用公钥

* public
  * 前端静态资源

* alipay_config.js
  * AlipaySDK 配置文件

* checkSign.js
  * 用于验签

* createOrder.js
  * 创建订单并返回

* server.js
  * 服务器文件，包含各种请求接口，可监听 http 服务

* mysql.js
  * 数据库操作

* alipay.sql
  * 数据库转储文件
