<template>
  <section class="workspace-view datasheet-view">
    <div class="table-shell">
      <div class="view-tabs" role="tablist" aria-label="数据表视图">
        <button
          v-for="view in views"
          :key="view.id"
          class="view-tab"
          :class="{ active: activeView === view.id }"
          type="button"
          role="tab"
          :aria-selected="activeView === view.id"
          @click="activeView = view.id"
        >
          <span class="view-tab-icon">{{ view.icon }}</span>
          {{ view.name }}
        </button>
        <button class="new-view-button" type="button" aria-label="新建视图">
          <span>+</span>
          新建视图
        </button>
        <span class="tab-spacer"></span>
        <span class="record-count">项目协作表 · 12,480 条记录</span>
      </div>
      <div class="table-toolbar">
        <button class="toolbar-action add-record" type="button">
          <span class="action-icon">+</span>添加记录
        </button>
        <span class="toolbar-divider"></span>
        <button
          v-for="item in toolbarItems"
          :key="item.name"
          class="toolbar-action"
          type="button"
        >
          <span class="action-icon">{{ item.icon }}</span
          >{{ item.name }}
        </button>
      </div>
      <div class="table-view-content">
        <grid-view></grid-view>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import GridView from "../components/grid-view.vue";

const views = [
  { id: "table", name: "表格", icon: "▦" },
  { id: "kanban", name: "看板", icon: "▤" },
  { id: "calendar", name: "日历", icon: "□" },
];

const toolbarItems = [
  { name: "字段配置", icon: "⚙" },
  { name: "视图配置", icon: "☷" },
  { name: "筛选", icon: "▽" },
  { name: "分组", icon: "≡" },
  { name: "排序", icon: "↕" },
  { name: "行高", icon: "↕" },
  { name: "填色", icon: "◐" },
];

const activeView = ref("table");
</script>

<style lang="less" scoped>
.workspace-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.table-shell {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.view-tabs,
.table-toolbar {
  height: 44px;
  flex: 0 0 44px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  border-bottom: 1px solid var(--border);
}
.view-tabs {
  background: var(--surface);
  overflow-x: auto;
  white-space: nowrap;
}
.view-tab,
.new-view-button,
.toolbar-action {
  height: 100%;
  border: 0;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
}
.view-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-right: 24px;
  border-bottom: 2px solid transparent;
}
.view-tab.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
.view-tab-icon {
  color: currentColor;
  font-size: 15px;
}
.new-view-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--primary);
}
.new-view-button span {
  font-size: 18px;
  line-height: 1;
}
.tab-spacer {
  flex: 1;
}
.record-count {
  color: var(--text-tertiary);
  font-size: 12px;
}
.table-toolbar {
  gap: 16px;
  background: var(--bg-secondary);
  overflow-x: auto;
  white-space: nowrap;
}
.toolbar-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: auto;
  padding: 6px 0;
}
.toolbar-action:hover,
.new-view-button:hover {
  color: var(--primary-hover);
}
.add-record {
  color: var(--primary);
  font-weight: 600;
}
.action-icon {
  color: currentColor;
  font-size: 15px;
}
.toolbar-divider {
  width: 1px;
  height: 18px;
  flex: 0 0 1px;
  background: var(--border);
}
.table-view-content {
  flex: 1;
  min-height: 0;
}
@media (max-width: 800px) {
  .view-tabs,
  .table-toolbar {
    padding-left: 20px;
    padding-right: 20px;
  }
  .record-count {
    display: none;
  }
}
</style>
