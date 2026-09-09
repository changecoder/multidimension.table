<template>
  <section class="workspace-view">
    <div class="view-header">
      <div>
        <p class="eyebrow">WORKSPACE / OVERVIEW</p>
        <h1>仪表盘</h1>
      </div>
      <button class="primary-action" type="button">+ 添加图表</button>
    </div>
    <div class="dashboard-content">
      <div class="metric-row">
        <div class="metric-block">
          <span>活跃项目</span>
          <strong>24</strong>
          <small>较上周 +12%</small>
        </div>
        <div class="metric-block">
          <span>本周完成</span>
          <strong>186</strong>
          <small>较上周 +8.4%</small>
        </div>
        <div class="metric-block">
          <span>逾期任务</span>
          <strong class="warning">7</strong>
          <small>需要优先处理</small>
        </div>
      </div>
      <div class="dashboard-grid">
        <div class="panel chart-panel">
          <div class="panel-heading"><strong>项目进度</strong><span>最近 30 天</span></div>
          <div class="chart-placeholder"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        </div>
        <div class="panel activity-panel">
          <div class="panel-heading"><strong>最近动态</strong><span>全部</span></div>
          <ul>
            <li><b class="dot blue"></b><span>林晓更新了「网站改版」</span><time>10 分钟前</time></li>
            <li><b class="dot green"></b><span>设计团队完成了 8 项任务</span><time>1 小时前</time></li>
            <li><b class="dot orange"></b><span>「季度复盘」进入待审批</span><time>3 小时前</time></li>
          </ul>
        </div>
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
.dashboard-content { padding: 28px 32px; overflow: auto; }
.metric-row { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--border); background: var(--surface); }
.metric-block { padding: 20px 24px; border-right: 1px solid var(--border); }
.metric-block:last-child { border-right: 0; }
.metric-block span, .metric-block small { display: block; color: var(--text-secondary); font-size: 12px; }
.metric-block strong { display: block; margin: 10px 0 4px; font-size: 30px; line-height: 1; }
.metric-block strong.warning { color: #d96c28; }
.metric-block small { color: #2e9b68; }
.dashboard-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-top: 20px; }
.panel { min-height: 280px; border: 1px solid var(--border); background: var(--surface); }
.panel-heading { height: 56px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); font-size: 13px; }
.panel-heading span { color: var(--text-tertiary); font-size: 12px; }
.chart-placeholder { height: 220px; padding: 30px 20px; display: flex; align-items: end; gap: 14px; background: repeating-linear-gradient(to bottom, transparent 0, transparent 43px, #edf0f3 44px); }
.chart-placeholder i { flex: 1; height: 42%; background: var(--primary); opacity: 0.82; }
.chart-placeholder i:nth-child(2n) { height: 68%; background: #58b98a; }
.chart-placeholder i:nth-child(3n) { height: 52%; }
.activity-panel ul { margin: 0; padding: 10px 20px; list-style: none; }
.activity-panel li { display: grid; grid-template-columns: 8px 1fr auto; gap: 10px; align-items: center; padding: 15px 0; border-bottom: 1px solid #edf0f3; font-size: 13px; }
.activity-panel li:last-child { border-bottom: 0; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); }
.dot.green { background: #58b98a; }
.dot.orange { background: #e89b52; }
time { color: var(--text-tertiary); font-size: 11px; }
@media (max-width: 800px) { .dashboard-grid { grid-template-columns: 1fr; } .metric-block { padding: 16px; } .dashboard-content, .view-header { padding-left: 20px; padding-right: 20px; } }
</style>
