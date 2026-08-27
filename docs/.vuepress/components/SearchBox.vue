<template>
  <div class="search-box pagefind-search-box">
    <input
      ref="input"
      v-model="query"
      aria-label="搜索文档"
      :class="{ focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter.prevent="go(focusIndex)"
      @keydown.up.prevent="onUp"
      @keydown.down.prevent="onDown"
      @keydown.esc.prevent="close"
    />

    <ul v-if="showPanel" class="suggestions" :class="{ 'align-right': alignRight }">
      <li v-if="isDevelopment" class="search-notice">开发模式仅搜索标题和小标题，全文搜索请使用 npm run preview 验证。</li>
      <li v-if="loading" class="search-state">正在加载搜索索引…</li>
      <li v-else-if="error" class="search-state search-error">{{ error }}</li>
      <li v-else-if="searched && !suggestions.length" class="search-state">未找到相关内容</li>
      <li
        v-for="(suggestion, index) in suggestions"
        :key="suggestion.url"
        class="suggestion"
        :class="{ focused: index === focusIndex }"
        @mousedown.prevent="go(index)"
        @mouseenter="focusIndex = index"
      >
        <a :href="suggestion.url" @click.prevent>
          <span class="page-title">{{ suggestion.pageTitle || suggestion.url }}</span>
          <span v-if="suggestion.sectionTitle" class="section-title">
            {{ suggestion.sectionTitle }}
          </span>
          <span v-if="suggestion.excerpt" class="search-excerpt" v-html="suggestion.excerpt" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  const SEARCH_DEBOUNCE_MS = 200;
  const MAX_RESULTS_PER_PAGE = 2;

  export default {
    name: 'SearchBox',

    data() {
      return {
        query: '',
        focused: false,
        focusIndex: -1,
        placeholder: '',
        suggestions: [],
        searched: false,
        searching: false,
        loadingIndex: false,
        error: '',
        debounceTimer: null,
        requestId: 0,
        pagefind: null,
        pagefindPromise: null,
      };
    },

    computed: {
      isDevelopment() {
        return process.env.NODE_ENV !== 'production';
      },

      loading() {
        return this.loadingIndex || this.searching;
      },

      showPanel() {
        return this.focused && Boolean(this.query.trim());
      },

      alignRight() {
        const navCount = (this.$site.themeConfig.nav || []).length;
        const repo = this.$site.repo ? 1 : 0;
        return navCount + repo <= 2;
      },

      maxSuggestions() {
        return this.$site.themeConfig.searchMaxSuggestions || 12;
      },
    },

    watch: {
      query(value) {
        this.scheduleSearch(value);
      },
    },

    mounted() {
      this.placeholder = this.$site.themeConfig.searchPlaceholder || '';
      document.addEventListener('keydown', this.onHotkey);
    },

    beforeDestroy() {
      document.removeEventListener('keydown', this.onHotkey);
      window.clearTimeout(this.debounceTimer);
      this.requestId += 1;
    },

    methods: {
      onFocus() {
        this.focused = true;
        if (!this.isDevelopment) this.ensurePagefind().catch(() => {});
      },

      onBlur() {
        this.focused = false;
      },

      onHotkey(event) {
        if (event.target === document.body && !event.ctrlKey && !event.metaKey && !event.altKey && ['s', '/'].includes(event.key.toLowerCase())) {
          this.$refs.input.focus();
          event.preventDefault();
        }
      },

      scheduleSearch(value) {
        window.clearTimeout(this.debounceTimer);
        const query = value.trim();
        const requestId = ++this.requestId;

        this.error = '';
        this.searched = false;
        this.suggestions = [];
        this.focusIndex = -1;

        if (!query) {
          this.searching = false;
          return;
        }

        if (!this.isDevelopment && this.pagefind && this.pagefind.preload) {
          this.pagefind.preload(query).catch(() => {});
        }

        this.debounceTimer = window.setTimeout(() => {
          this.search(query, requestId);
        }, SEARCH_DEBOUNCE_MS);
      },

      async search(query, requestId) {
        this.searching = true;

        try {
          const suggestions = this.isDevelopment ? this.searchHeaders(query) : await this.searchFullText(query);

          if (requestId !== this.requestId) return;
          this.suggestions = suggestions;
          this.focusIndex = suggestions.length ? 0 : -1;
          this.searched = true;
        } catch (error) {
          if (requestId !== this.requestId) return;
          this.error = '搜索索引加载失败，请刷新页面后重试。';
          this.searched = true;
          if (process.env.NODE_ENV !== 'production') console.error(error);
        } finally {
          if (requestId === this.requestId) this.searching = false;
        }
      },

      searchHeaders(rawQuery) {
        const query = rawQuery.toLowerCase();
        const results = [];

        for (const page of this.$site.pages) {
          if (page.frontmatter && page.frontmatter.search === false) continue;

          const pageTitle = page.title || page.path;
          if (pageTitle.toLowerCase().includes(query)) {
            results.push({
              url: page.path,
              pageTitle,
              sectionTitle: '',
              excerpt: '',
            });
          }

          for (const header of page.headers || []) {
            if (!header.title || !header.title.toLowerCase().includes(query)) continue;
            results.push({
              url: `${page.path}#${header.slug}`,
              pageTitle,
              sectionTitle: header.title,
              excerpt: '',
            });
            if (results.length >= this.maxSuggestions) return results;
          }

          if (results.length >= this.maxSuggestions) return results;
        }

        return results;
      },

      async searchFullText(query) {
        const pagefind = await this.ensurePagefind();
        const searchTerm = this.getSearchTerm(query);
        const isTechnicalQuery = searchTerm !== query;
        const search = await pagefind.search(searchTerm);
        const pageLimit = isTechnicalQuery ? this.maxSuggestions * 3 : this.maxSuggestions;
        const pageResults = search.results.slice(0, pageLimit);
        const pages = await Promise.all(pageResults.map((result) => result.data()));
        const candidates = [];
        const seenUrls = new Set();
        const normalizedQuery = query.toLowerCase();
        const normalizedSearchTerm = searchTerm.toLowerCase();
        const requiresLiteralMatch = /^[a-z0-9_$@-]{2,}$/i.test(searchTerm);
        const queryParts = query
          .toLowerCase()
          .split(/[^\p{L}\p{N}_$@-]+/u)
          .filter(Boolean);

        for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
          const page = pages[pageIndex];
          const pageTitle = (page.meta && page.meta.title) || page.url;
          const subResults = Array.isArray(page.sub_results) && page.sub_results.length ? page.sub_results : [page];
          const pageCandidates = [];

          for (let resultIndex = 0; resultIndex < subResults.length; resultIndex += 1) {
            const result = subResults[resultIndex];
            const url = this.normalizeResultUrl(result.url || page.url);
            if (!url || seenUrls.has(url)) continue;

            seenUrls.add(url);
            const plainExcerpt = result.plain_excerpt || page.plain_excerpt || '';
            const searchableText = `${pageTitle} ${result.title || ''} ${plainExcerpt}`.toLowerCase();
            if (requiresLiteralMatch && !searchableText.includes(normalizedSearchTerm)) continue;

            let specificity = 0;
            if (searchableText.includes(normalizedQuery)) {
              specificity = 2;
            } else if (queryParts.length > 1 && queryParts.every((part) => searchableText.includes(part))) {
              specificity = 1;
            }

            pageCandidates.push({
              url,
              pageTitle,
              sectionTitle: result.title && result.title !== pageTitle ? result.title : '',
              excerpt: result.excerpt || page.excerpt || '',
              specificity,
              pageIndex,
              resultIndex,
            });
          }

          pageCandidates
            .sort((a, b) => b.specificity - a.specificity || a.resultIndex - b.resultIndex)
            .slice(0, MAX_RESULTS_PER_PAGE)
            .forEach((candidate) => candidates.push(candidate));
        }

        return candidates
          .sort((a, b) => b.specificity - a.specificity || a.pageIndex - b.pageIndex)
          .slice(0, this.maxSuggestions)
          .map(({ specificity, pageIndex, resultIndex, ...suggestion }) => suggestion);
      },

      getSearchTerm(query) {
        if (/\s/u.test(query) || !/[.@/$]/u.test(query)) return query;

        return query
          .split(/[^\p{L}\p{N}_$@-]+/u)
          .filter(Boolean)
          .reduce((best, part) => (part.length >= best.length ? part : best), query);
      },

      async ensurePagefind() {
        if (this.pagefind) return this.pagefind;
        if (this.pagefindPromise) return this.pagefindPromise;

        this.loadingIndex = true;
        const base = this.$site.base || '/';
        const normalizedBase = base.endsWith('/') ? base : `${base}/`;
        const bundlePath = `${normalizedBase}pagefind/`;
        const moduleUrl = `${bundlePath}pagefind.js`;

        this.pagefindPromise = import(/* webpackIgnore: true */ moduleUrl)
          .then(async (pagefind) => {
            await pagefind.init();
            this.pagefind = pagefind;
            return pagefind;
          })
          .catch((error) => {
            this.pagefindPromise = null;
            throw error;
          })
          .finally(() => {
            this.loadingIndex = false;
          });

        return this.pagefindPromise;
      },

      normalizeResultUrl(rawUrl) {
        if (!rawUrl || typeof window === 'undefined') return rawUrl;

        try {
          const url = new URL(rawUrl, window.location.origin);
          if (url.origin === window.location.origin) {
            return `${url.pathname}${url.search}${url.hash}`;
          }
        } catch (error) {
          // Pagefind normally returns a root-relative URL; keep it if parsing fails.
        }

        return rawUrl;
      },

      onUp() {
        if (!this.suggestions.length) return;
        this.focusIndex = this.focusIndex <= 0 ? this.suggestions.length - 1 : this.focusIndex - 1;
      },

      onDown() {
        if (!this.suggestions.length) return;
        this.focusIndex = this.focusIndex >= this.suggestions.length - 1 ? 0 : this.focusIndex + 1;
      },

      go(index) {
        const suggestion = this.suggestions[index];
        if (!suggestion) return;

        let target = suggestion.url;
        const base = this.$site.base || '/';
        if (base !== '/' && target.startsWith(base)) {
          target = `/${target.slice(base.length)}`;
        }

        this.$router.push(target);
        this.query = '';
        this.focusIndex = -1;
        this.focused = false;
        this.$refs.input.blur();
      },

      close() {
        this.focused = false;
        this.$refs.input.blur();
      },
    },
  };
</script>

<style lang="stylus">
  .pagefind-search-box
    display inline-block
    position relative
    margin-right 1rem

    input
      cursor text
      width 10rem
      height 2rem
      color lighten($textColor, 25%)
      display inline-block
      border 1px solid darken($borderColor, 10%)
      border-radius 2rem
      font-size 0.9rem
      line-height 2rem
      padding 0 0.5rem 0 2rem
      outline none
      transition all 0.2s ease
      background #fff url(../../../node_modules/@vuepress/plugin-search/search.svg) 0.6rem 0.5rem no-repeat
      background-size 1rem

      &:focus
        cursor auto
        border-color $accentColor

    .suggestions
      background #fff
      position absolute
      top 2rem
      z-index 20
      border 1px solid darken($borderColor, 10%)
      border-radius 6px
      padding 0.4rem
      margin 0
      list-style-type none
      box-sizing border-box
      box-shadow 0 5px 15px rgba(0, 0, 0, 0.12)

      &.align-right
        right 0

    .suggestion
      line-height 1.4
      border-radius 4px
      cursor pointer

      a
        display block
        padding 0.55rem 0.65rem
        white-space normal
        color lighten($textColor, 20%)

      .page-title
        display block
        color $textColor
        font-weight 600

      .section-title
        display block
        margin-top 0.12rem
        color $accentColor
        font-size 0.88rem
        font-weight 600

      .search-excerpt
        display -webkit-box
        margin-top 0.2rem
        overflow hidden
        color lighten($textColor, 30%)
        font-size 0.82rem
        line-height 1.45
        word-break break-word
        -webkit-box-orient vertical
        -webkit-line-clamp 2

        mark
          padding 0 0.08em
          color inherit
          background #fff1a8

      &.focused
        background-color #f3f4f5

    .search-state,
    .search-notice
      padding 0.65rem
      color lighten($textColor, 30%)
      font-size 0.84rem

    .search-notice
      border-bottom 1px solid $borderColor

    .search-error
      color #c00

  @media (max-width: $MQNarrow)
    .pagefind-search-box
      input
        cursor pointer
        width 0
        border-color transparent
        position relative

        &:focus
          cursor text
          left 0
          width 10rem

  @media (max-width: $MQNarrow) and (min-width: $MQMobile)
    .pagefind-search-box .suggestions
      left 0

  @media (max-width: $MQMobile)
    .pagefind-search-box
      margin-right 0

      input
        left 1rem

      .suggestions
        right 0

  @media (max-width: $MQMobileNarrow)
    .pagefind-search-box input:focus
      width 8rem
</style>
