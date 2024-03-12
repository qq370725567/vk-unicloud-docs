---
sidebarDepth: 0
---

# 全局错误码

| 错误模块	|    错误码		|             说明																																				|
|---------	|-------------|---------------------------																															|
| vk-uni-pay|    101			| 请先配置正确的异步回调URL，参考[配置文档](https://vkdoc.fsq.pub/vk-uni-pay/config.html)	|
| vk-uni-pay|    1001			| out_trade_no必须是string类型，且不能为空																								|
| vk-uni-pay|    1002			| type必须是string类型，且不能为空，如设置为goods代表商品订单															|
| vk-uni-pay|    1003			| total_fee必须为正整数（>0的整数）（注意：100=1元）																			|
| vk-uni-pay|    1004			| subject必须是string类型，且不能为空																											|
| vk-uni-pay|    1005			| provider必须是string类型，且不能为空																										|
| vk-uni-pay|    1006			| 用户openid不能为空																																			|
| vk-uni-pay|    1007			| amount必须是数字类型																																		|
| vk-uni-pay|    1008			| amount必须大于0，注意：100=1元（单位分）																								|
| vk-uni-pay|    1009			| account不能为空																																					|
| vk-uni-pay|    1010			| real_name不能为空																																				|
| vk-uni-pay|    1011			| platform不能为空																																				|
| vk-uni-pay|    1012			| 转账接收者的openid不能为空																								              |
| vk-uni-pay|    1013			| code不能为空																																						|
| vk-uni-pay|    1014			| transaction_receipt必须是string类型，且不能为空																					|
| vk-uni-pay|    1015			| transaction_identifier必须是string类型，且不能为空																			|
| vk-uni-pay|    1016			| ios内购凭据校验不通过																																		|
| vk-uni-pay|    1017			| 微信小程序虚拟支付：wxpay_virtual不能为空																																		|
| vk-uni-pay|    1018			| 微信小程序虚拟支付：buy_quantity必须为正整数（>0的整数）																																		|
| vk-uni-pay|    1019			| 微信小程序虚拟支付：参数mode错误																																	|
| vk-uni-pay|    2001			| 订单不存在																																							|
| vk-uni-pay|    2002			| 订单未支付																																							|
| vk-uni-pay|    2003			| 订单未退款																																							|
| vk-uni-pay|    2004			| 该订单暂无法退款，请等1分钟后再试																																							|
| vk-uni-pay|    3001			| 获取支付信息失败，请稍后再试																														|

