# service/pay/transfer.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
	/**
	 * 查询支付商户里的余额
	 * @url pay/queryAccountBalance 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} provider 支付供应商 alipay支付宝 wxpay微信
	 * @param {String} platform 平台类型：app-plus、mp-weixin，用于获取对应平台的支付配置信息
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let res = { code: 0, msg: '' };
		
		let platform = data.platform || originalParam.context.PLATFORM;
		let provider = data.provider;

		res = await vkPay.queryAccountBalance({
			provider,
			platform
		});
		return res;
	}
}

```