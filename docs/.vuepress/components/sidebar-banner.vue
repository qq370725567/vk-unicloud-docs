<template>
  <div class="sidebar-banner">
    <a href="https://cert.vk168.top/" target="_blank" class="banner-link">
      <img 
        src="https://cert.vk168.top/manage/static/logo2.png" 
        alt="无忧SSL证书平台" 
        class="banner-image"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'SidebarBanner',
  data() {
    return {};
  }
};
</script>

<style scoped>
.sidebar-banner {
  margin: 1rem 0;
  padding: 0 1rem;
}

.banner-link {
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
}

.banner-link:hover {
  transform: translateY(-2px);
}

.banner-image {
  width: 85%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

.banner-link:hover .banner-image {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .sidebar-banner {
    display: none;
  }
}

@media (max-width: 768px) {
  .sidebar-banner {
    padding: 0 0.5rem;
  }
}
</style>
