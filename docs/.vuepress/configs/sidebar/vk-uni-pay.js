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
      'uniCloud/transfer3',
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
  "error",
  {
    title: 'vk-pay云函数示例代码',
    path: '/vk-uni-pay/template/service/tips',
    collapsable: true,
    children: [{
        title: 'pay',
        collapsable: false,
        children: [
          'template/service/pay/code2SessionAlipay',
          'template/service/pay/code2SessionWeixin',
          'template/service/pay/code2SessionWeixinH5',
          'template/service/pay/createPayment',
          'template/service/pay/queryPayment',
          'template/service/pay/queryRefund',
          'template/service/pay/refund',
          'template/service/pay/transfer'
        ]
      },
      {
        title: 'pay-notify',
        collapsable: false,
        children: [
          'template/service/pay-notify/custom1',
          'template/service/pay-notify/goods',
          'template/service/pay-notify/recharge',
          'template/service/pay-notify/vip',
        ]
      }
    ]
  },
  {
    title: 'vk-unicloud-router 框架对接示例',
    children: [{
        title: '后端SDK（云函数）',
        children: [
          'template/vk-unicloud-router/uniCloud/intro',
          'template/vk-unicloud-router/uniCloud/createPayment',
          'template/vk-unicloud-router/uniCloud/pay-notify',
          'template/vk-unicloud-router/uniCloud/queryPayment',
          'template/vk-unicloud-router/uniCloud/queryRefund',
          'template/vk-unicloud-router/uniCloud/refund',
          'template/vk-unicloud-router/uniCloud/transfer'
        ]
      },
      {
        title: '前端SDK（页面）',
        children: [
          'template/vk-unicloud-router/page/createPayment'
        ]
      }
    ]
  }
]
