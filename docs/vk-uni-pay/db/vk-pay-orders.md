---
sidebarDepth: 0
---

# vk-pay-orders

统一支付订单表

___该表为插件支付专用表，正常你自己业务的订单还应有一张表，如 `opendb-mall-orders`，它们之间通过商户订单号 `out_trade_no` 来关联___

## 字段

| 字段名称						| 字段类型		| 必填			| 默认值	| 说明																																														|
|-------							|-----------|---------|-------|-------																																												|
| _id									|  string		| 是				|				|																																																|
| pay_type						|  string		| 是				|				| 支付方式 [查看](#pay-type)																																			|
| platform						|  string		|					|				| uni老版本平台 h5、mp-weixin、mp-alipau、app-plus等																							|
| uni_platform				|  string		|					|				| uni新版本平台 web、mp-weixin、mp-alipay、app等																									|
| status							|  number		| 是				| 0			| 支付状态<br/> -1：已关闭 <br/>0：未支付 <br/>1：已支付 <br/>2：已部分退款 <br/>3：已全额退款				|
| type								|  string		| 是				|				| 订单类型 <br/>goods：订单付款 <br/>recharge：余额充值付款 <br/>vip：vip充值付款 <br/>等等，可自定义	|
| out_trade_no				|  string		| 是				|				| 商户订单号（需控制唯一）																																					|
| transaction_id			|  string		|					|				| 交易单号（支付平台订单号，由支付平台控制唯一）																											|
| user_id							|  string		|					|				| 用户 `user_id`																																									|
| nickname						|  string		|					|				| 用户昵称（冗余）																																								|
| device_id						|  string		|					|				| 客户端设备ID																																										|
| client_ip						|  string		|					|				| 客户端ip																																												|
| openid							|  string		|					|				| 用户openid																																											|
| appid								|  string		|					|				| DCloud appid（发起支付时的uniapp项目appid）																											|
| description					|  string		|					|				| 支付描述，如：xxxx手机1台																																				|
| total_fee						|  money		|					|				| 订单总金额，单位为分，100等于1元																																	|
| refund_fee					|  money		|					|				| 订单总退款金额，单位为分，100等于1元																															|
| refund_num					|  number		|					|				| 当前退款笔数																																										|
| refund_list					|  array		|					|				| 退款详情 [查看](#refund-list)																																		|
| user_order_success	|  boolean	|					|				| 用户自己的回调逻辑是否执行成功																																		|
| custom							|  object		|					|				| 自定义数据																																											|
| original_data				|  object		|					|				| 原始数据，微信是v2是xml，v3是json，支付宝是json																									|
| wxpay_info					|  object		|					|				| 微信支付特有数据																																								|
| alipay_info					|  object		|					|				| 支付宝支付特有数据																																							|
| create_date					|  timestamp|					|				| 创建时间																																												|
| pay_date						|  timestamp|					|				| 支付时间																																												|
| notify_date					|  timestamp|					|				| 订单通知支付成功时间																																						|
| cancel_date					|  timestamp|					|				| 订单主动关闭时间																																								|
| stat_data						|  object		|					|				| 用于支付统计的相关数据																																					|
| pid									|  string		|					|				| 商户配置id（对应vk-pay-config表的_id），若此参数有值，则会从数据库中获取支付配置进行支付							|
| app_auth_token			|  string		|					|				| 支付宝服务商模式-子商户的token																																		|
| auth_appid					|  string		|					|				| 支付宝服务商模式-子商户的appid，如果不是服务商模式，则 `auth_appid = provider_appid`								|
| seller_id						|  string		|					|				| 支付宝服务商模式-卖家id																																					|
| notify_url					|  string		|					|				| 异步通知的云函数URL化地址 `notify_url + notify_path = 完整的回调地址`															|
| notify_path					|  string		|					|				| 异步通知的接口路径 `notify_url + notify_path = 完整的回调地址`																		|
| mch_id							|  string		|					|				| 发起支付的商户id																																								|
| provider_appid			|  string		|					|				| 发起支付时的公众号appid 或 小程序appid 或 app开放平台appid 等																			|
| provider_pay_method	|  string		|					|				| 聚合支付时选择的子支付方式																																				|


### pay_type

支付方式  如  wxpay_mp-weixin _ 左边是支付供应商（wxpay） _ 右边是支付类型（mp-weixin）

|         值							|     说明									|    对应支付产品			|
|--------------------			|---------------					|---------------		|
| wxpay_mp-weixin					|  微信 - 小程序						|		微信小程序支付		|
| wxpay_app-plus					|  微信 - APP							|		微信APP支付			|
| wxpay_h5								|  微信 - 网站二维码				|		微信Native支付		|
| wxpay_h5-weixin					|  微信 - 公众号						|		微信JSAPI支付		|
| wxpay_mweb							|  微信 - 手机外部浏览器H5		|		微信H5支付				|
| alipay_mp-alipay				|  支付宝 - 小程序					|		支付宝JSAPI支付		|
| alipay_app-plus					|  支付宝 - APP						|		支付宝APP支付			|
| alipay_h5								|  支付宝 - H5							|		支付宝当面付			|
| appleiap_app-plus				|  iOS内购 - APP						|		苹果应用内购			|
| vkspay_h5								|  VksPay - H5						|		VksPay个人支付		|
| vkspay_mp-weixin				|  VksPay - 微信小程序			|		VksPay个人支付		|
| vkspay_app-plus					|  VksPay - APP						|		VksPay个人支付		|
| wxpay-virtual_mp-weixin	|  微信虚拟支付 - 微信小程序	|		微信小程序虚拟支付	|
| douyin_mp-toutiao				|  抖音支付 - 抖音小程序			|		抖音支付					|

### refund_list

| 字段名称         | 字段类型    |    说明     |
|---------------- |------------|-------------|
| refund_date     |  timestamp | 退款时间 |
| refund_fee      |  money     | 退款金额，单位为分，100等于1元 |
| out_refund_no   |  String    | 退款单号 |
| refund_desc     |  String    | 退款理由 |