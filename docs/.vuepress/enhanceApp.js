export default ({ router, Vue }) => {
  if (typeof process === 'undefined') {
    router.onReady(() => {
      const { app } = router;
      app.$once("hook:mounted", () => {
        // 插入横幅广告到左侧菜单
        insertBannerToSidebar();
        setTimeout(() => {
          const { hash } = document.location;
          if (hash.length > 1) {
            const id = decodeURIComponent(hash.substring(1));
            // 获取a标签元素
            const anchor = document.querySelector(`#${id} .header-anchor`);
            // 模拟点击
            if (anchor) anchor.click();
            setTimeout(() => {
              if (anchor) anchor.click();
            }, 400);
          }
        }, 500);
      });
    });
  }
}

// 插入横幅广告到左侧菜单的函数
function insertBannerToSidebar() {
  // 等待DOM加载完成
  setTimeout(() => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !document.querySelector('.sidebar-banner')) {
      // 创建横幅广告元素
      const bannerElement = document.createElement('div');
      bannerElement.className = 'sidebar-banner';
      bannerElement.innerHTML = `
        <a href="https://cert.vk168.top" target="_blank" class="banner-link">
          <img
            src="https://cert-cdn.vk168.top/banner/wuyou-ssl.png"
            alt="无忧SSL证书平台"
            class="banner-image"
          />
        </a>
      `;
      // 插入到侧边栏的顶部
      sidebar.insertBefore(bannerElement, sidebar.firstChild);
    }
  }, 100);
}
