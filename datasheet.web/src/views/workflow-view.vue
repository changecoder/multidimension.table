<template>
  <section class="workspace-view">
    <div class="view-header">
      <div>
        <p class="eyebrow">WORKSPACE / AUTOMATION</p>
        <h1>工作流</h1>
      </div>
      <button class="primary-action" type="button">+ 新建工作流</button>
    </div>
    <div class="workflow-content">
      <div class="workflow-intro">
        <div><h2>自动化流程</h2><p>让重复工作自动发生，把时间留给更重要的事情。</p></div>
        <button class="quiet-action" type="button">管理连接</button>
      </div>
      <div class="workflow-list">
        <article class="workflow-item"><div class="status-dot on"></div><div class="workflow-copy"><strong>新任务通知</strong><span>当任务被创建时，通知项目负责人</span></div><span class="workflow-status">运行中</span><button type="button" aria-label="编辑新任务通知">...</button></article>
        <article class="workflow-item"><div class="status-dot on"></div><div class="workflow-copy"><strong>审批提醒</strong><span>当审批超过 24 小时未处理时发送提醒</span></div><span class="workflow-status">运行中</span><button type="button" aria-label="编辑审批提醒">...</button></article>
        <article class="workflow-item"><div class="status-dot off"></div><div class="workflow-copy"><strong>周报汇总</strong><span>每周一汇总项目数据并发送到群组</span></div><span class="workflow-status paused">已暂停</span><button type="button" aria-label="编辑周报汇总">...</button></article>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.workspace-view { height: 100%; display: flex; flex-direction: column; min-width: 0; }
.view-header { min-height: 92px; padding: 24px 32px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
.eyebrow { margin: 0 0 6px; color: var(--primary); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; }
h1 { margin: 0; font-size: 24px; line-height: 1.2; }
.primary-action { border: 0; border-radius: 6px; padding: 10px 14px; background: var(--primary); color: #fff; font-size: 13px; cursor: pointer; }
.workflow-content { max-width: 900px; padding: 32px; }
.workflow-intro { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
h2 { margin: 0 0 6px; font-size: 16px; }
p { margin: 0; color: var(--text-secondary); font-size: 13px; }
.quiet-action { border: 0; background: transparent; color: var(--primary); font-size: 13px; cursor: pointer; }
.workflow-list { border-top: 1px solid var(--border); }
.workflow-item { min-height: 82px; display: grid; grid-template-columns: 12px 1fr auto 28px; gap: 14px; align-items: center; border-bottom: 1px solid var(--border); }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #58b98a; }
.status-dot.off { background: #c9cdd4; }
.workflow-copy { display: flex; flex-direction: column; gap: 6px; }
.workflow-copy strong { font-size: 13px; }
.workflow-copy span { color: var(--text-secondary); font-size: 12px; }
.workflow-status { color: #2e9b68; font-size: 12px; }
.workflow-status.paused { color: var(--text-tertiary); }
.workflow-item button { border: 0; background: transparent; color: var(--text-tertiary); cursor: pointer; font-size: 15px; }
@media (max-width: 640px) { .workflow-content, .view-header { padding-left: 20px; padding-right: 20px; } .workflow-item { grid-template-columns: 12px 1fr 28px; } .workflow-status { display: none; } }
</style>
