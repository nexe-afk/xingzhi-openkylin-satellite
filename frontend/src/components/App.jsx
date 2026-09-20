import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Rocket, Settings, BarChart3, Network, Cpu,
  Activity, Gauge, ExternalLink, Github,
  Radio, Zap, Shield, Target,
  ChevronRight, Layers, TrendingUp
} from 'lucide-react';

/* AnimatedCounter hook */
function useAnimatedCounter(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(target * ease));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { val, ref };
}

/* Navigation */
function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: '项目概述', href: '#hero' },
    { label: '星座可视化', href: '#constellation' },
    { label: '四项任务', href: '#tasks' },
    { label: '量化指标', href: '#kpi' },
    { label: '技术架构', href: '#tech' },
    { label: '监控大屏', href: '#dashboard' },
    { label: '里程碑', href: '#timeline' },
  ];

  return (
    <nav className="nav" style={scrolled ? { borderBottomColor: 'rgba(30,41,59,0.6)' } : {}}>
      <div className="container nav__inner">
        <a href="#hero" className="nav__brand" aria-label="星智首页">
          <div className="nav__brand-icon">星</div>
          <span>星智 XingZhi</span>
        </a>
        <ul className={`nav__links${open ? ' open' : ''}`}>
          {links.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
          ))}
          <li>
            <a href="#kpi" className="nav__cta" onClick={() => setOpen(false)}>
              查看成果 <ChevronRight size={14} />
            </a>
          </li>
        </ul>
        <button className="nav__toggle" aria-label="菜单" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}

/* Hero */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src="/images/hero-bg.jpg" alt="低轨卫星在地球轨道运行的深空背景" loading="eager" />
      </div>
      <div className="container hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          2026 中国国际大学生创新大赛 · 产业赛道
        </div>
        <h1 className="hero__title">
          星智 <span>XingZhi</span><br />
          基于 OpenKylin 的低轨卫星应用运行平台
        </h1>
        <p className="hero__subtitle">
          可裁剪、可观测、可协同的国产化空间智能应用底座。
          以 OpenKylin 为 OS 底座，融合云原生调度与全栈可观测体系，
          让每一颗低轨卫星都成为智能计算节点。
        </p>
        <div className="hero__actions">
          <a href="#tasks" className="btn btn--primary"><Rocket size={18} /> 探索方案</a>
          <a href="#tech" className="btn btn--ghost"><ExternalLink size={16} /> 查看架构</a>
        </div>
      </div>
      <div className="hero__hud" aria-hidden="true">
        <div className="hud-panel">
          <div className="hud-panel__label">系统状态</div>
          <div className="hud-panel__value green">ONLINE</div>
          <div className="hud-panel__bar"><div className="hud-panel__bar-fill green" style={{ width: '92%' }} /></div>
        </div>
        <div className="hud-panel">
          <div className="hud-panel__label">星载节点</div>
          <div className="hud-panel__value blue">6 / 6</div>
          <div className="hud-panel__bar"><div className="hud-panel__bar-fill blue" style={{ width: '100%' }} /></div>
        </div>
        <div className="hud-panel">
          <div className="hud-panel__label">调度延迟</div>
          <div className="hud-panel__value cyan">18ms</div>
          <div className="hud-panel__bar"><div className="hud-panel__bar-fill cyan" style={{ width: '25%' }} /></div>
        </div>
      </div>
    </section>
  );
}

/* Constellation HUD */
function Constellation() {
  const nodes = [
    { id: 'ground', label: '地面云节点', x: 50, y: 88, type: 'ground' },
    { id: 's1', label: 'SAT-01', x: 22, y: 30, type: 'sat' },
    { id: 's2', label: 'SAT-02', x: 50, y: 15, type: 'sat' },
    { id: 's3', label: 'SAT-03', x: 78, y: 30, type: 'sat' },
    { id: 's4', label: 'SAT-04', x: 18, y: 58, type: 'sat' },
    { id: 's5', label: 'SAT-05', x: 50, y: 50, type: 'sat' },
    { id: 's6', label: 'SAT-06', x: 82, y: 58, type: 'sat' },
  ];
  const links = [
    ['ground', 's1'], ['ground', 's2'], ['ground', 's3'],
    ['s1', 's2'], ['s2', 's3'], ['s4', 's5'], ['s5', 's6'],
    ['s1', 's4'], ['s3', 's6'], ['s2', 's5'],
    ['s4', 'ground'], ['s6', 'ground'],
  ];
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <section className="section constellation" id="constellation">
      <div className="container">
        <div className="section__header">
          <div className="section__tag">// 星座拓扑</div>
          <h2 className="section__title">星间动态云 · 卫星星座可视化</h2>
          <p className="section__desc">6 颗仿真星载节点 + 1 地面云节点，实时展示任务调度与链路状态</p>
          <div className="section__divider" />
        </div>
        <div className="constellation__canvas">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="50" cy="42" rx="38" ry="25" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3" strokeDasharray="2 1.5" className="orbit-line" />
            {links.map(([a, b], i) => (
              <line key={i} x1={nodeMap[a].x} y1={nodeMap[a].y} x2={nodeMap[b].x} y2={nodeMap[b].y} stroke="rgba(59,130,246,0.25)" strokeWidth="0.2" />
            ))}
            {nodes.map((n) => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={n.type === 'ground' ? 2.2 : 1.6} fill={n.type === 'ground' ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.2)'} className="node-pulse" />
                <circle cx={n.x} cy={n.y} r={n.type === 'ground' ? 1.2 : 0.8} fill={n.type === 'ground' ? '#22C55E' : '#3B82F6'} />
                <text x={n.x} y={n.y - (n.type === 'ground' ? 3.5 : 2.8)} textAnchor="middle" fill="rgba(248,250,252,0.7)" fontSize="1.6" fontFamily="Exo, sans-serif" fontWeight="600">{n.label}</text>
              </g>
            ))}
            {[0, 1, 2].map((i) => (
              <circle key={i} r="0.4" fill="#06B6D4" opacity="0.8">
                <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} path={`M${nodeMap.s2.x},${nodeMap.s2.y} L${nodeMap.ground.x},${nodeMap.ground.y}`} />
              </circle>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

/* Tasks */
function Tasks() {
  const tasks = [
    { num: '任务 01', icon: <Settings size={22} />, title: '星载 OS 适配与裁剪优化', desc: '基于 OpenKylin 3.0 进行最小镜像裁剪，去桌面、最小化服务，降低星载资源开销。', metric: '镜像体积 ↓≥20%', metric2: '空闲内存 ↓≥15%', tech: 'OpenKylin 3.0' },
    { num: '任务 02', icon: <Cpu size={22} />, title: '典型场景智能应用', desc: 'YOLOv8n 遥感目标识别 + NCNN 量化推理，在星载环境下实现高效 AI 推理。', metric: '核心业务指标 ↑≥20%', metric2: '推理时延 ↓', tech: 'YOLOv8n + NCNN' },
    { num: '任务 03', icon: <BarChart3 size={22} />, title: '全栈可观测体系', desc: 'Prometheus + Grafana + Node Exporter，覆盖资源/算力/功耗/健康四维监控。', metric: '监控覆盖率 100%', metric2: '告警延迟 <30s', tech: 'Prometheus + Grafana' },
    { num: '任务 04', icon: <Network size={22} />, title: '星间动态云与分布式调度', desc: '自研加权调度器，Docker 仿真 4~6 星载节点 + 地面云节点，实现弹性任务编排。', metric: '调度等待 ↓≥10%', metric2: '故障 60s 恢复', tech: '自研调度 + Docker' },
  ];
  return (
    <section className="section" id="tasks">
      <div className="container">
        <div className="section__header">
          <div className="section__tag">// 核心任务</div>
          <h2 className="section__title">四项攻坚任务 · 全链路闭环</h2>
          <p className="section__desc">紧扣企业命题，从 OS 裁剪到智能推理、可观测、分布式调度，构建完整星载应用平台</p>
          <div className="section__divider" />
        </div>
        <div className="tasks-grid">
          {tasks.map((t, i) => (
            <article className="task-card" key={i}>
              <div className="task-card__number">{t.num}</div>
              <div className="task-card__icon">{t.icon}</div>
              <h3 className="task-card__title">{t.title}</h3>
              <p className="task-card__desc">{t.desc}</p>
              <div className="task-card__metric"><TrendingUp size={13} /> {t.metric}</div>
              <div style={{ marginTop: '8px' }}><span className="badge badge--cyan">{t.metric2}</span></div>
              <div style={{ marginTop: '10px' }}><span className="badge badge--blue">{t.tech}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* KPI Counters */
function KpiCounters() {
  const kpis = [
    { target: 20, suffix: '%', label: '镜像体积降低', sub: 'OpenKylin 3.0 裁剪', color: 'blue', prefix: '↓≥' },
    { target: 15, suffix: '%', label: '空闲内存降低', sub: '星载内存优化', color: 'cyan', prefix: '↓≥' },
    { target: 20, suffix: '%', label: '核心业务提升', sub: 'YOLOv8n + NCNN', color: 'green', prefix: '↑≥' },
    { target: 10, suffix: '%', label: '调度等待降低', sub: '自研加权调度器', color: 'purple', prefix: '↓≥' },
    { target: 60, suffix: 's', label: '单节点故障恢复', sub: '动态重调度', color: 'blue', prefix: '≤' },
    { target: 6, suffix: '', label: '星载仿真节点', sub: 'Docker Compose', color: 'cyan', prefix: '' },
  ];
  return (
    <section className="section" id="kpi" style={{ background: 'rgba(30,41,59,0.08)' }}>
      <div className="container">
        <div className="section__header">
          <div className="section__tag">// 量化指标</div>
          <h2 className="section__title">关键性能指标 · 数据驱动</h2>
          <p className="section__desc">每一项指标都经仿真验证，用数据说话</p>
          <div className="section__divider" />
        </div>
        <div className="kpi-grid">
          {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
        </div>
      </div>
    </section>
  );
}

function KpiCard({ target, suffix, label, sub, color, prefix }) {
  const { val, ref } = useAnimatedCounter(target);
  return (
    <div className="kpi-card" ref={ref}>
      <div className={`kpi-card__value ${color}`}>{prefix}{val}{suffix}</div>
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__sub">{sub}</div>
    </div>
  );
}

/* Tech Stack */
function TechStack() {
  const techs = [
    { name: 'OpenKylin', role: '国产星载 OS', icon: <Shield size={22} /> },
    { name: 'YOLOv8n', role: '目标识别', icon: <Target size={22} /> },
    { name: 'NCNN', role: '推理框架', icon: <Zap size={22} /> },
    { name: 'Docker', role: '容器化', icon: <Layers size={22} /> },
    { name: 'K3s', role: '轻量编排', icon: <Network size={22} /> },
    { name: 'Prometheus', role: '监控采集', icon: <Activity size={22} /> },
    { name: 'Grafana', role: '可视化', icon: <BarChart3 size={22} /> },
    { name: 'Node Exporter', role: '系统指标', icon: <Gauge size={22} /> },
  ];
  return (
    <section className="section" id="tech">
      <div className="container">
        <div className="section__header">
          <div className="section__tag">// 技术架构</div>
          <h2 className="section__title">全栈技术选型 · 开源驱动</h2>
          <p className="section__desc">基于 CNCF 云原生生态与国产操作系统，构建星载应用底座</p>
          <div className="section__divider" />
        </div>
        <div className="tech-grid">
          {techs.map((t, i) => (
            <div className="tech-item" key={i}>
              <div className="tech-item__icon">{t.icon}</div>
              <div className="tech-item__name">{t.name}</div>
              <div className="tech-item__role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Dashboard Preview */
function DashboardPreview() {
  const barData = [
    { h: '02:00', v: 42 }, { h: '04:00', v: 38 }, { h: '06:00', v: 65 },
    { h: '08:00', v: 78 }, { h: '10:00', v: 92 }, { h: '12:00', v: 85 },
    { h: '14:00', v: 70 }, { h: '16:00', v: 88 }, { h: '18:00', v: 95 },
    { h: '20:00', v: 60 }, { h: '22:00', v: 45 }, { h: '24:00', v: 55 },
  ];
  const maxBar = Math.max(...barData.map(b => b.v));
  const sparkPoints = [30, 35, 28, 42, 38, 55, 48, 62, 58, 70, 65, 72, 68, 75, 78];
  const sparkW = 260, sparkH = 80;
  const sparkPath = sparkPoints.map((v, i) => {
    const x = (i / (sparkPoints.length - 1)) * sparkW;
    const y = sparkH - (v / 100) * sparkH;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');
  const netPts = [20, 25, 40, 35, 60, 55, 70, 65, 80, 75, 85, 78, 90, 88, 92];
  const netPath = netPts.map((v, i) => {
    const x = (i / (netPts.length - 1)) * 260;
    const y = 80 - (v / 100) * 80;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');

  return (
    <section className="section" id="dashboard">
      <div className="container">
        <div className="section__header">
          <div className="section__tag">// 监控大屏</div>
          <h2 className="section__title">全栈可观测 · Grafana 风格仪表盘</h2>
          <p className="section__desc">资源 / 算力 / 功耗 / 健康四维监控，实时掌握星载平台运行状态</p>
          <div className="section__divider" />
        </div>
        <div className="dashboard">
          <div className="dashboard__header">
            <div className="dashboard__header-left">
              <div className="dashboard__status"><span className="dashboard__status-dot" />LIVE</div>
              <span style={{ color: 'var(--color-text-dim)' }}>星智 · 星载监控面板</span>
            </div>
            <div className="dashboard__tabs">
              <span className="dashboard__tab active">概览</span>
              <span className="dashboard__tab">算力</span>
              <span className="dashboard__tab">网络</span>
              <span className="dashboard__tab">日志</span>
            </div>
          </div>
          <div className="dashboard__body">
            <div className="dashboard__grid">
              <div className="dash-panel">
                <div className="dash-panel__title">CPU 使用率 · 24H</div>
                <div className="dash-panel__chart">
                  <div className="mini-bars">
                    {barData.map((b, i) => (
                      <div key={i} className="mini-bar" style={{
                        height: `${(b.v / maxBar) * 100}%`,
                        background: b.v > 80 ? 'linear-gradient(180deg, #F59E0B, #EF4444)' : 'linear-gradient(180deg, #3B82F6, #06B6D4)',
                        animationDelay: `${i * 0.08}s`,
                      }} title={`${b.h}: ${b.v}%`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="dash-panel">
                <div className="dash-panel__title">内存占用趋势 · %Used</div>
                <div className="dash-panel__chart">
                  <svg className="sparkline-svg" viewBox={`0 0 ${sparkW} ${sparkH}`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
                        <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                      </linearGradient>
                    </defs>
                    <path d={`${sparkPath} L${sparkW},${sparkH} L0,${sparkH} Z`} fill="url(#spark-fill)" />
                    <path d={sparkPath} fill="none" stroke="#06B6D4" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="dash-panel" style={{ textAlign: 'center' }}>
                <div className="dash-panel__title">节点健康度</div>
                <div className="gauge-ring">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(30,41,59,0.5)" strokeWidth="6" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${0.92 * 2 * Math.PI * 40} ${2 * Math.PI * 40}`} transform="rotate(-90 50 50)" />
                    <text x="50" y="54" textAnchor="middle" fill="#22C55E" fontSize="16" fontFamily="Roboto Mono" fontWeight="700">92%</text>
                  </svg>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>6/6 节点在线</div>
              </div>
              <div className="dash-panel">
                <div className="dash-panel__title">星间链路吞吐 · Mbps</div>
                <div className="dash-panel__chart">
                  <svg className="sparkline-svg" viewBox="0 0 260 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="net-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(168,85,247,0.3)" />
                        <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                      </linearGradient>
                    </defs>
                    <path d={`${netPath} L260,80 L0,80 Z`} fill="url(#net-fill)" />
                    <path d={netPath} fill="none" stroke="#A855F7" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Timeline */
function Timeline() {
  const items = [
    { date: 'Week 1-2 · 9/20 ~ 10/4', title: '打地基', desc: '校赛报名、OpenKylin 3.0 最小镜像裁剪、Docker Compose 搭建 4 个仿真星载节点', status: 'active' },
    { date: 'Week 3-4 · 10/5 ~ 10/18', title: '跑通 AI 推理', desc: '下载公开遥感数据集、YOLOv8n 训练/微调 → NCNN 转换量化、对比测试', status: '' },
    { date: 'Week 5-6 · 10/19 ~ 11/1', title: '串起闭环', desc: 'Prometheus + Node Exporter + Grafana 接入、自研加权调度器、故障注入测试', status: '' },
    { date: 'Week 7-8 · 11/2 ~ 省赛', title: '包装冲刺', desc: '解决方案文档、1 分钟演示视频 + 路演 PPT、答辩排练', status: '' },
  ];
  return (
    <section className="section" id="timeline">
      <div className="container">
        <div className="section__header">
          <div className="section__tag">// 项目里程碑</div>
          <h2 className="section__title">8 周开发计划 · 精准推进</h2>
          <p className="section__desc">从校赛到省赛，每一步都有明确交付物</p>
          <div className="section__divider" />
        </div>
        <div className="timeline" style={{ maxWidth: 700, margin: '0 auto' }}>
          {items.map((item, i) => (
            <div className={`timeline__item ${item.status}`} key={i}>
              <div className="timeline__date">{item.date}</div>
              <div className="timeline__title">{item.title}</div>
              <div className="timeline__desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <div className="nav__brand-icon" style={{ width: 28, height: 28, fontSize: '0.78rem' }}>星</div>
              星智 XingZhi
            </div>
            <p className="footer__about">
              基于 OpenKylin 的低轨卫星应用运行平台。
              可裁剪、可观测、可协同的国产化空间智能应用底座，
              为每一颗低轨卫星赋予智能计算能力。
            </p>
          </div>
          <div>
            <div className="footer__col-title">项目</div>
            <ul className="footer__links">
              <li><a href="#tasks">四项任务</a></li>
              <li><a href="#kpi">量化指标</a></li>
              <li><a href="#tech">技术架构</a></li>
              <li><a href="#timeline">开发计划</a></li>
            </ul>
          </div>
          <div>
            <div className="footer__col-title">生态</div>
            <ul className="footer__links">
              <li><a href="https://www.openkylin.top" target="_blank" rel="noopener noreferrer">OpenKylin 官网</a></li>
              <li><a href="https://gitee.com/openkylin" target="_blank" rel="noopener noreferrer">OpenKylin Gitee</a></li>
              <li><a href="https://github.com/Tencent/ncnn" target="_blank" rel="noopener noreferrer">NCNN GitHub</a></li>
              <li><a href="https://prometheus.io" target="_blank" rel="noopener noreferrer">Prometheus</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 星智团队 · 2026 中国国际大学生创新大赛 · 产业赛道 · 企业命题组（麒麟软件有限公司）</span>
          <div className="footer__socials">
            <a href="https://gitee.com/openkylin" target="_blank" rel="noopener noreferrer" aria-label="Gitee"><Github size={16} /></a>
            <a href="#" aria-label="Email"><Radio size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* App Root */
export default function App() {
  return (
    <>
      <div className="hud-overlay" aria-hidden="true" />
      <Navigation />
      <main>
        <Hero />
        <Constellation />
        <Tasks />
        <KpiCounters />
        <TechStack />
        <DashboardPreview />
        <Timeline />
      </main>
      <Footer />
    </>
  );
}
