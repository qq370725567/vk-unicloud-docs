const path = require('path');
const navbar = require('./configs/navbar.js'); // 顶部导航
const sidebar = require('./configs/sidebar.js'); // 左侧菜单
const { slugify } = require('@vuepress/shared-utils'); // 用于处理标题的插件
const headerPlugin = require('./markdown/header'); // 用于处理标题的插件
const pagefindCodeWeightPlugin = require('./markdown/pagefind-code-weight'); // 降低代码块搜索权重

function simplifySlugText(text) {
  // 移除方法后面的括号及里面的内容
  if (text.match(/^uni/) && text.match(/\)$/)) {
    text = text.replace(/^uni/, '').replace(/\(.*\)$/, '');
  }
  // 处理部分非uni开头方法的括号内容，主要是会出现多参数的情况。
  if (text.match(/\([\w+\s+\[\],]+\)$/)) {
    text = text.replace(/\([\w+\s+\[\],]+\)$/, '');
  }
  return text;
}

module.exports = {
  base: '/', // 部署站点的基础路径
  title: 'vk-unicloud 快速开发框架', // 网站的标题
  description: 'VK云开发：多平台全栈快速开发框架。vk-unicloud-router、vk-unicloud-admin、vk-uni-pay', // 网站的描述
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  alias: {
    '@SearchBox': path.resolve(__dirname, './components/SearchBox.vue'),
  },
  // 额外的需要被注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/image/logo.png' }],
    ['link', { rel: 'stylesheet', href: '/css/index.css' }],
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5610a25d9f3fb54501186ba76a46f720";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ],
  ],
  dest: 'dist', // 指定 vuepress build 的输出目录
  themeConfig: {
    // 显示所有页面的标题链接
    //displayAllHeaders: true,
    // 搜索框显示的最大结果数量
    searchMaxSuggestions: 12,
    // 网站logo
    logo: '/image/logo.png',
    lastUpdated: '最后修改时间',
    // 头部 tabs
    nav: navbar,
    // 左侧菜单嵌套最大深度，最大值为2
    sidebarDepth: 2,
    // 侧边栏菜单
    sidebar: sidebar,
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir',
      },
    },
    editLinks: true,
    editLinkText: '编辑此页（一起来纠错与优化，方便你我Ta）',
    docsRepo: 'https://gitee.com/vk-uni/vk-unicloud-docs.git', // 文档源文件的仓库 URL 。
    docsBranch: 'master', // 文档源文件的仓库分支。
    docsDir: 'docs', // 文档源文件存放在仓库中的目录名。
    searchPlaceholder: '搜索文档...',
    // algolia 全文搜索
    // algolia: {
    //   apiKey: 'b9e9a5c44702ca87f06fbeee5cca74b0',
    //   indexName: 'vkfsq',
    //   appId: 'QXK5697W8R'
    // }
  },
  markdown: {
    slugify(str) {
      if (typeof str !== 'string') return '';
      let slug = str;
      if (slug.includes('@')) {
        let array = slug.split('@');
        slug = array.length > 1 ? array[array.length - 1] : str;
      } else {
        slug = simplifySlugText(slug.toLowerCase()).trim();
      }
      return slugify(slug);
    },
    lineNumbers: true, // 是否在每个代码块的左侧显示行号。
    externalLinks: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    extractHeaders: ['h1', 'h2', 'h3', 'h4'],
    chainMarkdown(config) {
      config.plugin('convert-header').use(headerPlugin);
      config.plugin('pagefind-code-weight').use(pagefindCodeWeightPlugin);
    },
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/active-header-links',
    //'vuepress-plugin-smooth-scroll',
    [
      '@vuepress/medium-zoom',
      {
        selector: 'img.preview',
        options: {
          margin: 16,
        },
      },
    ],
    [
      '@vuepress/last-updated',
      {
        dateOptions: {
          hour12: false,
          timeZone: 'Asia/Shanghai',
        },
      },
    ],
    [
      'vuepress-plugin-juejin-style-copy',
      {
        copyText: '复制代码',
        tip: { content: '复制成功', title: '' },
        visibleTip: true,
      },
    ],
    [
      'vuepress-plugin-right-anchor',
      {
        showDepth: 3,
        ignore: ['/', '/client/vk-unicloud-router.html'],
        expand: {
          trigger: 'click',
          clickModeDefaultOpen: true,
        },
        customClass: 'vk-right-anchor',
        disableGlobalUI: false,
      },
    ],
  ],
};
