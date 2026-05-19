<template>
  <div class="footer-link">MIT Licensed | Copyright @2021 VK | <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备20001549号</a></div>
</template>

<script>
  export default {
    name: 'footer-link',
    props: {},
    data() {
      return {};
    },
    created() {
      this.init();
    },
    mounted() {},
    methods: {
      // 页面数据初始化函数
      init(options = {}) {},
    },
    // 计算属性
    computed: {},
  };
</script>

<style scoped>
  .footer-link {
    padding: 30px 0;
    color: #606266;
    text-align: center;
    font-size: 14px;
    border-top: 1px solid #eaecef;
  }
  .footer-link a {
    color: #606266;
    font-weight: initial;
  }
</style>
