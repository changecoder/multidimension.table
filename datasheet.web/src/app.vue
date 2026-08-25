<template>
  <div class="root-app">
    <header class="topbar">
      <div class="brand-mark">M</div>
      <div class="brand-name">多维表格</div>
      <div class="topbar-spacer"></div>
      <button class="topbar-action" type="button" aria-label="搜索">⌕</button>
      <div class="avatar">陈</div>
    </header>
    <div class="content">
      <aside class="sidebar-container">
        <p class="sidebar-label">工作区</p>
        <nav class="sidebar-nav" aria-label="主导航">
          <RouterLink to="/datasheet" class="nav-item">
            <span class="nav-icon">▦</span>
            <span>数据表</span>
          </RouterLink>
          <RouterLink to="/dashboard" class="nav-item">
            <span class="nav-icon">▥</span>
            <span>仪表盘</span>
          </RouterLink>
          <RouterLink to="/workflow" class="nav-item">
            <span class="nav-icon">⌘</span>
            <span>工作流</span>
          </RouterLink>
        </nav>
        <div class="sidebar-bottom">
          <button class="sidebar-link" type="button">
            <span class="nav-icon">?</span>帮助中心
          </button>
          <button class="sidebar-link" type="button">
            <span class="nav-icon">⚙</span>设置
          </button>
        </div>
      </aside>
      <main class="main-container">
        <RouterView />
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { socketService } from "./utils/socket-service";

onMounted(() => {
  socketService.connect();
});
</script>
<style lang="less" scoped>
.topbar {
  display: flex;
  height: 64px;
  flex: 0 0 64px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgb(222, 224, 227);
  background: var(--surface);
}
.brand-mark {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  margin-right: 10px;
  border-radius: 7px;
  background: var(--primary);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}
.brand-name {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 700;
}
.topbar-spacer {
  flex: 1;
}
.topbar-action {
  width: 32px;
  height: 32px;
  margin-right: 14px;
  border: 0;
  background: transparent;
  color: var(--text-secondary);
  font-size: 22px;
  cursor: pointer;
}
.avatar {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e8f3ff;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
}
.content {
  flex: 1;
  min-height: 0;
  display: flex;
}
.sidebar-container {
  width: 216px;
  flex: 0 0 216px;
  display: flex;
  flex-direction: column;
  padding: 24px 12px 16px;
  border-right: 1px solid #dee0e3;
  background: #fafbfc;
}
.sidebar-label {
  margin: 0 12px 12px;
  color: var(--text-tertiary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-item,
.sidebar-link {
  min-height: 40px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
}
.nav-item:hover,
.sidebar-link:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.nav-item.router-link-active {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 600;
}
.nav-icon {
  width: 18px;
  color: currentColor;
  text-align: center;
  font-size: 16px;
}
.sidebar-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sidebar-link {
  width: 100%;
}
.main-container {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--surface);
}
@media (max-width: 640px) {
  .sidebar-container {
    width: 64px;
    flex-basis: 64px;
    padding-left: 8px;
    padding-right: 8px;
  }
  .sidebar-label,
  .nav-item span:last-child,
  .sidebar-link {
    font-size: 0;
  }
  .sidebar-link {
    justify-content: center;
    padding: 0;
  }
  .nav-item {
    justify-content: center;
    padding: 0;
  }
  .nav-item .nav-icon,
  .sidebar-link .nav-icon {
    font-size: 16px;
  }
  .brand-name {
    font-size: 14px;
  }
}
</style>
