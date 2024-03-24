export default ({ router }) => {
  if (typeof process === 'undefined') {
    router.onReady(() => {
      const { app } = router;
      app.$once("hook:mounted", () => {
        setTimeout(() => {
          const { hash } = document.location;
          if (hash.length > 1) {
            const id = decodeURIComponent(hash.substring(1));
            // const element = document.getElementById(id);
            // if (element) element.scrollIntoView();
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
