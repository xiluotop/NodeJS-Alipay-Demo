const fs = require('fs');
const path = require('path');

// 这里配置基本信息
const AlipayBaseConfig = {
    appId: '', // 应用 ID
    privateKey: fs.readFileSync(path.join(__dirname, './sandbox-pem/private_pem2048.txt'), 'ascii'), // 应用私钥
    alipayPublicKey: '',// 支付宝公钥
    gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝的应用网关
    charset:'utf-8',
    version:'1.0',
    signType:'RSA2'
};

module.exports = {
    AlipayBaseConfig: AlipayBaseConfig,
}