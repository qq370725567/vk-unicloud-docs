<template>
  <h1 :id="idCom" v-if="Number(level) === 1"><a :href="'#' + idCom" class="header-anchor">#</a>{{ title }}</h1>
  <h2 :id="idCom" v-else-if="Number(level) === 2"><a :href="'#' + idCom" class="header-anchor">#</a>{{ title }}</h2>
  <h3 :id="idCom" v-else-if="Number(level) === 3"><a :href="'#' + idCom" class="header-anchor">#</a>{{ title }}</h3>
  <h4 :id="idCom" v-else-if="Number(level) === 4"><a :href="'#' + idCom" class="header-anchor">#</a>{{ title }}</h4>
  <h5 :id="idCom" v-else-if="Number(level) === 5"><a :href="'#' + idCom" class="header-anchor">#</a>{{ title }}</h5>
  <h6 :id="idCom" v-else-if="Number(level) === 6"><a :href="'#' + idCom" class="header-anchor">#</a>{{ title }}</h6>
</template>

<script>
  /**
   * <doc-title level="2" title="标题" alias="api" />
   */
  export default {
    name: 'doc-title',
    props: {
      level: {
        Type: [Number, String],
        default: 1,
      },
      title: {
        Type: [String],
        default: '',
      },
      alias: {
        Type: [String],
      },
    },
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
    computed: {
      idCom() {
        let { title, alias } = this;
        return alias ? alias : title;
      },
    },
  };
</script>

<style scoped></style>
