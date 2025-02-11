module.exports = [{
    title: '起步',
    collapsable: false,
    children: [
      '',
      'quickstart',
      'config',
      'example',
      'question/question'
    ]
  },
  {
    title: '通用-后端SDK（云函数）',
    collapsable: false,
    children: [
      'uniCloud/createPayment',
      'uniCloud/pay-notify',
      'uniCloud/refund',
      'uniCloud/queryPayment',
      'uniCloud/queryRefund',
      'uniCloud/transfer',
      'uniCloud/queryAccountBalance'
    ]
  },
  {
    title: '通用-前端SDK（页面）',
    collapsable: false,
    children: [
      'page/vk-uni-pay',
      'page/createPayment'
    ]
  },
  {
    title: '通用-数据库表',
    collapsable: false,
    children: [
      'db/vk-pay-orders',
      'db/vk-pay-config'
    ]
  },
  {
    title: '进阶',
    collapsable: false,
    children: [
      'advanced/multi-merchant',
      'advanced/multi-merchant-service-provider'
    ]
  },
  "iosiap",
  "wxpay-virtual",
  "vkspay",
  "error"
]
