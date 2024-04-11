module.exports = [{
    title: '起步',
    collapsable: false,
    children: [
      'addQQGroup',
      'vk-unicloud-router',
      '',
      'serverless',
      'quickstart',
      'quickstartExample',
      'catalogue',
      'changelog',
      'changeGuide',
      'codeTips',
      'codeAssist',
      'i18n',
      'product'
    ]
  },
  'jsapi',
  'vk.userCenter',
  {
    title: '前端（页面）',
    collapsable: true,
    children: [
      'pages/callFunction',
      'pages/callFunctionForUrl',
      'pages/interceptor1',
      'pages/interceptor2',
      'pages/list',
      'pages/updateRequestGlobalParam',
      'pages/vuex',
      'pages/uploadFile',
      'pages/config',
      'pages/localStorage',
      'pages/sessionStorage',
      'pages/isQingming',
      'pages/icon',
      {
        title: '组件',
        children: [
          'pages/components/vk-data-goods-sku-popup'
        ]
      },
    ]
  },
  {
    title: '后端（云函数）',
    collapsable: false,
    initialOpenGroupIndex: -1,
    children: [
      'uniCloud/cloudfunctions/resformat',
      'uniCloud/cloudfunctions/error',
      {
        title: '云函数',
        collapsable: true,
        children: [
          'uniCloud/cloudfunctions/catalogue',
          'uniCloud/cloudfunctions/template',
          'uniCloud/cloudfunctions/serviceParam',
          'uniCloud/cloudfunctions/userInfo',
          'uniCloud/cloudfunctions/http',
          'uniCloud/cloudfunctions/timer',
          'uniCloud/cloudfunctions/cloudfunctionsForHttp',
          'uniCloud/cloudfunctions/urlrewrite',
          'uniCloud/cloudfunctions/beautifyCode',
          'uniCloud/cloudfunctions/crypto',
          'uniCloud/cloudfunctions/formRules',
          'uniCloud/cloudfunctions/originalParam',
          'uniCloud/cloudfunctions/urlOriginalParam',
          'uniCloud/cloudfunctions/sseChannel',
          'uniCloud/cloudfunctions/question'
        ]
      },
      'uniCloud/cloudfunctions/cloudObject',
      {
        title: '数据库',
        collapsable: false,
        children: [
          'uniCloud/db/api',
          'uniCloud/db/selects',
          'uniCloud/db/getOne',
          'uniCloud/db/getTree',
          'uniCloud/db/question',
          'uniCloud/db/dao',
          'uniCloud/db/transaction',
          'uniCloud/db/schema'
        ]
      },
      {
        title: '缓存',
        collapsable: false,
        children: [
          'uniCloud/cache/cache'
        ]
      },
      {
        title: '中间件',
        collapsable: false,
        children: [
          'uniCloud/middleware/filter'
        ]
      },
      {
        title: '扩展',
        collapsable: false,
        children: [
          'uniCloud/plus/weixin',
          'uniCloud/plus/weixin-h5',
          'uniCloud/plus/weixin-h5-jsapi',
          'uniCloud/plus/qq',
          'uniCloud/plus/douyin',
          'uniCloud/plus/alipay',
          'uniCloud/plus/baidu',
          'uniCloud/plus/sms',
          'uniCloud/plus/mail',
          'uniCloud/plus/map'
        ]
      },
      {
        title: '全局配置',
        collapsable: false,
        children: [
          'uniCloud/config/uni-id',
          'uniCloud/config/vk-unicloud',
          'uniCloud/config/uni-pay',
        ]
      },
      'uniCloud/redis/redis',
    ]
  },
  {
    title: '常见问题',
    collapsable: true,
    children: [
      'question/q1',
      'question/q2',
      'question/q3',
      'question/q4',
      'question/q5',
      'question/q6',
      'question/q7',
      'question/q8',
      'question/q9',
      'question/q10',
      'question/q11',
      'question/q12',
    ]
  },
  'question/question'
]
