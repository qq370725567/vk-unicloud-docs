<template>
  <div class="hero-ad">
    <div class="ad-container">
      <div class="ad-content">
        <div class="ad-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" class="lock-icon">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        </div>
        <div class="ad-text">
          <h3 class="ad-title">无忧SSL证书平台</h3>
          <p class="ad-slogan">免费申请SSL证书，让您从此证书无忧，实现证书自由</p>
          <div class="ad-features">
            <span class="feature">✨ 免费申请SSL证书，让您证书自由</span>
            <span class="feature">✨ 自动续期+自动部署，让您证书无忧</span>
            <span class="feature">⚡ 急速申请SSL证书，让您无需等待</span>
            <span class="feature">🛡️ 采用国际标准加密算法，让您安全无忧</span>
          </div>
        </div>
        <div class="ad-action">
          <a href="https://cert.vk168.top/" target="_blank" class="ad-button">
            立即申请
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroAd',
  data() {
    return {

    };
  }
};
</script>

<style scoped>
.hero-ad {
  margin: 1rem 0;
  padding: 0 1rem;
}

.ad-container {
  max-width: 1200px;
  margin: 0 auto;
}

.ad-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.ad-content:hover {
  transform: translateY(-5px);
}

.ad-icon {
  flex-shrink: 0;
}

.lock-icon {
  width: 48px;
  height: 48px;
  color: #10b981;
}

.ad-text {
  flex: 1;
}

.ad-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
}

.ad-slogan {
  font-size: 1rem;
  margin: 0 0 1rem 0;
  opacity: 0.9;
  line-height: 1.5;
}

.ad-features {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.feature {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
}

/* 为盾牌图标添加绿色样式 */
.shield-feature {
  color: #10b981 !important;
  font-weight: 600;
}

.ad-action {
  flex-shrink: 0;
}

.ad-button {
  display: inline-block;
  background: #10b981; /* 改为绿色 */
  color: #ffffff; /* 改为白色文字以提高对比度 */
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); /* 改为绿色阴影 */
}

.ad-button:hover {
  background: #059669; /* 悬停时的深绿色 */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); /* 改为绿色阴影 */
}

@media (max-width: 768px) {
  .ad-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .ad-features {
    justify-content: center;
  }

  .ad-title {
    font-size: 1.25rem;
  }
}
</style>
