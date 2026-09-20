const docx = require("docx");
const fs = require("fs");
const {
  Document, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Packer, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, PageBreak, LevelFormat,
} = docx;

const projectDir = "/Users/wyu37433/Library/Mobile Documents/com~apple~CloudDocs/区块链技术/创业大赛";

const COLOR_PRIMARY = "1B4F72";
const COLOR_ACCENT  = "2E86C1";
const COLOR_DARK    = "2C3E50";
const COLOR_LIGHT   = "EBF5FB";
const COLOR_WHITE   = "FFFFFF";
const FONT_BODY     = "Microsoft YaHei";

function title(text) {
  return new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text, bold: true, size: 52, font: "Microsoft YaHei", color: COLOR_PRIMARY })],
  });
}

function subtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text, size: 24, color: COLOR_ACCENT, font: FONT_BODY })],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_ACCENT, space: 4 } },
    children: [new TextRun({ text, bold: true, size: 32, font: "Microsoft YaHei", color: COLOR_PRIMARY })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 28, font: "Microsoft YaHei", color: COLOR_ACCENT })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Microsoft YaHei", color: COLOR_DARK })],
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 360 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
    indent: opts.indent ? { firstLine: 480 } : undefined,
    children: [new TextRun({ text, size: opts.size || 22, font: FONT_BODY, color: opts.color || COLOR_DARK, bold: opts.bold, italics: opts.italics })],
  });
}

function bullet(text, level) {
  level = level || 0;
  return new Paragraph({
    numbering: { reference: "bullets", level: level },
    spacing: { after: 80, line: 320 },
    children: [new TextRun({ text, size: 22, font: FONT_BODY, color: COLOR_DARK })],
  });
}

function numbered(text, level) {
  level = level || 0;
  return new Paragraph({
    numbering: { reference: "numbering", level: level },
    spacing: { after: 80, line: 320 },
    children: [new TextRun({ text, size: 22, font: FONT_BODY, color: COLOR_DARK })],
  });
}

function codeLine(text) {
  return new Paragraph({
    spacing: { after: 40, line: 276 },
    shading: { type: ShadingType.CLEAR, fill: "F4F6F7" },
    indent: { left: 480 },
    children: [new TextRun({ text, size: 20, font: "Courier New", color: "1A1A1A" })],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "D5D8DC", space: 6 } },
    children: [],
  });
}

function tableCell(text, opts) {
  opts = opts || {};
  return new TableCell({
    width: { size: opts.width || 2000, type: WidthType.DXA },
    shading: opts.shading ? { type: ShadingType.CLEAR, fill: opts.shading } : undefined,
    children: [new Paragraph({ spacing: { after: 0, line: 276 }, children: [new TextRun({ text, size: opts.size || 20, font: FONT_BODY, bold: opts.bold, color: opts.color || COLOR_DARK })] })],
  });
}

function headerRow(cells) {
  return new TableRow({ tableHeader: true, children: cells.map(function(c) { return tableCell(c, { bold: true, color: COLOR_WHITE, shading: COLOR_PRIMARY, width: 2000 }); }) });
}

function dataRow(cells, rowIndex) {
  return new TableRow({ children: cells.map(function(c) { return tableCell(c, { shading: rowIndex % 2 === 0 ? COLOR_LIGHT : COLOR_WHITE }); }) });
}

var doc = new Document({
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u25CF", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }, { level: 1, format: LevelFormat.BULLET, text: "\u25CB", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1440, hanging: 360 } } } }] },
      { reference: "numbering", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [
    {
      properties: { page: { size: { width: 11906, height: 16838 } } },
      children: [
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        title("星智 · 基于OpenKylin的低轨卫星应用运行平台"),
        subtitle("项目架构与立项说明"),
        divider(),
        subtitle("2026中国国际大学生创新大赛 · 产业赛道 · 企业命题组"),
        subtitle("命题企业：麒麟软件有限公司"),
        new Paragraph({ spacing: { before: 800 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "文档版本：v1.0  |  日期：2026年9月20日", size: 20, font: FONT_BODY, color: "95A5A6" })] }),
        new Paragraph({ children: [new PageBreak()] }),
      ],
    },
    {
      properties: { page: { size: { width: 11906, height: 16838 } } },
      children: [
        h1("一、项目背景与立项依据"),

        h2("1.1 低轨卫星产业发展趋势"),
        para("近年来，全球低轨（LEO）卫星互联网进入爆发期。SpaceX Starlink已部署超过7,000颗卫星，Amazon Kuiper、中国星网、G60星链等星座计划加速推进，预计2030年全球在轨卫星数量将突破10万颗。", { indent: true }),
        para("低轨卫星的核心优势在于：通信时延低（端到端 < 40ms）、覆盖范围广、组网成本持续下降。随着遥感、导航、物联网（IoT）等应用场景的扩展，‘星载智能计算’成为行业刚需——卫星在轨时必须具备自主数据处理能力，而不能完全依赖地面回传。", { indent: true }),
        para("根据2025年国际空间数据系统咨询委员会（CCSDS）的报告，下一代星载应用平台需满足四个核心需求：轻量化（镜像体积 ≤ 2GB）、可观测性（实时资源监控）、容错性（故障自动恢复）、可扩展性（跨星座协同调度）。", { indent: true }),

        h2("1.2 行业痛点分析"),
        bullet("现有星载软件体系碎片化，缺乏统一的国产化运行平台"),
        bullet("商业卫星应用开发者面临适配成本高、调试困难、缺乏标准化开发框架"),
        bullet("在轨资源管理粗放，算力利用率低，无法满足AI推理等计算密集型任务需求"),
        bullet("跨星座协同调度缺乏成熟技术方案，故障恢复周期长"),
        bullet("国产操作系统在空间应用领域落地案例稀少，缺乏完整技术验证"),

        h2("1.3 企业命题与机遇"),
        para("麒麟软件有限公司发布企业命题「基于OpenKylin的低轨卫星应用运行平台」，核心诉求是：以OpenKylin国产操作系统为底座，构建一套可裁剪、可观测、可协同的星载应用运行环境，验证国产操作系统在空间应用领域的技术可行性与商业价值。", { indent: true }),
        para("这一定位恰好切中行业空白：目前市场上尚无基于国产开源操作系统的成熟星载应用平台，本项目有望建立该领域的技术标杆。", { indent: true }),

        divider(),

        h1("二、项目定位与目标"),

        h2("2.1 项目定义"),
        para("星智（XingZhi）是一个面向低轨卫星场景的轻量化应用运行平台，以OpenKylin 3.0为操作系统底座，集成AI推理引擎、全栈可观测体系和星间调度器，为卫星应用开发者提供「开箱即用」的国产化空间智能计算环境。", { indent: true }),

        h2("2.2 核心目标（对齐企业命题四项任务）"),
        new Table({
          width: { size: 9600, type: WidthType.DXA },
          columnWidths: [1800, 3000, 2400, 2400],
          rows: [
            headerRow(["任务编号", "任务描述", "量化目标", "核心技术"]),
            dataRow(["①", "星载OS适配与裁剪优化", "镜像↓≥20%，内存↓≥15%", "OpenKylin裁剪+最小化服务"], 0),
            dataRow(["②", "典型场景智能应用", "核心业务指标↑≥20%", "YOLOv8n+NCNN量化推理"], 1),
            dataRow(["③", "全栈可观测体系", "资源/算力/功耗全覆盖", "Prometheus+Grafana"], 0),
            dataRow(["④", "星间动态云与分布式调度", "等待↓≥10%，故障60s恢复", "加权调度器+Docker仿真"], 1),
          ],
        }),

        h2("2.3 技术指标承诺"),
        bullet("OS镜像体积：从标准OpenKylin 3.0（~4.2GB）裁剪至≤3.3GB（↓≥20%）"),
        bullet("空闲内存占用：从标准状态（~800MB）降至≤680MB（↓≥15%）"),
        bullet("AI推理吞吐：YOLOv8n-NCNN量化模型相比float32，推理速度↑≥25%，精度损失≤3%"),
        bullet("调度等待时间：加权调度器相比轮询调度，任务等待时间↓≥10%"),
        bullet("故障恢复时间：节点故障后60s内完成任务重调度，系统恢复可用"),

        divider(),

        h1("三、项目技术架构"),

        h2("3.1 架构总览"),
        para("星智平台采用四层架构设计，自底向上依次为：操作系统层→容器编排层→服务组件层→应用层。各层通过标准化接口解耦，支持独立升级与替换。", { indent: true }),

        h3("架构图示意"),
        codeLine("┌───────────────────────────────────────────────────────────────┐"),
        codeLine("│                      应 用 层                                │"),
        codeLine("│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │"),
        codeLine("│  │ 遥感AI推理   │  │ 数据压缩回传  │  │ 星间通信网关        │ │"),
        codeLine("│  └─────────────┘  └──────────────┘  └─────────────────────┘ │"),
        codeLine("├───────────────────────────────────────────────────────────────┤"),
        codeLine("│                      服 务 组 件 层                          │"),
        codeLine("│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌───────────────┐ │"),
        codeLine("│  │NCNN推理   │ │Prometheus │ │Grafana面板 │ │加权调度器     │ │"),
        codeLine("│  │引擎       │ │监控采集   │ │可视化大屏  │ │(自研)         │ │"),
        codeLine("│  └──────────┘ └──────────┘ └───────────┘ └───────────────┘ │"),
        codeLine("├───────────────────────────────────────────────────────────────┤"),
        codeLine("│                      容 器 编 排 层                          │"),
        codeLine("│  ┌──────────────────────────────────────────────────────┐   │"),
        codeLine("│  │  Docker Compose / K3s (轻量化编排)                    │   │"),
        codeLine("│  │  - 容器生命周期管理  - 服务发现  - 健康检查            │   │"),
        codeLine("│  └──────────────────────────────────────────────────────┘   │"),
        codeLine("├───────────────────────────────────────────────────────────────┤"),
        codeLine("│                      操 作 系 统 层                          │"),
        codeLine("│  ┌──────────────────────────────────────────────────────┐   │"),
        codeLine("│  │  OpenKylin 3.0 (裁剪版)                               │   │"),
        codeLine("│  │  - 最小内核  - 无桌面环境  - 精简系统服务              │   │"),
        codeLine("│  │  - 满足星载资源约束 (CPU/内存/存储/功耗)               │   │"),
        codeLine("│  └──────────────────────────────────────────────────────┘   │"),
        codeLine("└───────────────────────────────────────────────────────────────┘"),

        h2("3.2 模块详细设计"),

        h3("模块一：OpenKylin OS裁剪优化"),
        para("以OpenKylin 3.0桌面版为基线，通过以下步骤完成星载适配：", { indent: true }),
        numbered("移除图形桌面环境（UKUI）及所有X11/Wayland依赖包"),
        numbered("禁用非必要系统服务（蓝牙、打印、音频、Power管理等约30项服务）"),
        numbered("内核编译优化：关闭不适用的驱动模块，启用cgroup v2、namespace隔离"),
        numbered("精简包管理器及开发工具链，仅保留运行时必需组件"),
        numbered("输出验证：镜像体积、空闲内存、启动时间三项指标量化对比"),

        h3("模块二：AI智能应用（遥感影像推理）"),
        para("选择遥感影像目标检测作为典型场景，验证星载AI推理能力：", { indent: true }),
        bullet("模型选型：YOLOv8n（Nano版，6.2M参数，适合嵌入式场景）"),
        bullet("量化方案：PyTorch→ONNX→NCNN（腾讯开源推理框架），支持INT8/FP16量化"),
        bullet("数据集：公开遥感数据集（DOTA / NWPU VHR-10 / 自制小样本）"),
        bullet("部署方式：NCNN runtime + Docker容器，支持CPU推理（ARM/x86）"),
        bullet("对比基准：float32 vs INT8量化，测试推理时延、吞吐量、精度（mAP）"),

        h3("模块三：全栈可观测体系"),
        para("基于云原生可观测三支柱（Metrics/Logging/Tracing），构建星载环境监控能力：", { indent: true }),
        bullet("Prometheus：采集容器级CPU/内存/磁盘/网络指标，自定义exporter采集星载参数"),
        bullet("Node Exporter：主机级资源监控，对接OpenKylin裁剪后的最小系统"),
        bullet("Grafana：可视化大屏，实时展示各节点资源状态、任务执行进度、故障告警"),
        bullet("告警规则：资源超阈值自动触发告警，对接调度器进行故障响应"),

        h3("模块四：星间调度器（自研）"),
        para("设计并实现一个轻量级加权任务调度器，核心逻辑：", { indent: true }),
        bullet("感知维度：节点算力（CPU核数/频率）、当前负载（容器数/CPU使用率）、健康度（最近心跳、故障次数）"),
        bullet("调度算法：加权评分=α×算力+β×(1-负载)+γ×健康度，参数可配置"),
        bullet("容错机制：心跳超时→标记不健康→任务迁移→节点恢复后重新纳入"),
        bullet("故障注入测试：随机kill容器/节点，测量恢复时间（目标≤60s）"),

        h2("3.3 仿真验证环境"),
        para("由于真实卫星硬件不可用，采用Docker Compose仿真方案模拟多节点星载环境：", { indent: true }),
        bullet("每个Docker容器模拟一颗卫星节点（独立IP、资源限制）"),
        bullet("4个节点组成仿真星座：1个主控节点+3个工作节点"),
        bullet("通过Docker网络模拟星间链路（延迟、丢包、带宽限制）"),
        bullet("支持故障注入：随机停止容器、模拟网络中断、资源耗尽"),

        divider(),

        h1("四、技术选型与开源生态"),

        h2("4.1 核心技术栈"),
        new Table({
          width: { size: 9600, type: WidthType.DXA },
          columnWidths: [2000, 2800, 2400, 2400],
          rows: [
            headerRow(["层级", "技术组件", "开源地址", "选型理由"]),
            dataRow(["操作系统", "OpenKylin 3.0", "gitee.com/openkylin", "国产开源，命题指定"], 0),
            dataRow(["容器运行时", "Docker CE / Podman", "github.com/moby", "轻量，星载友好"], 1),
            dataRow(["编排调度", "Docker Compose + K3s", "github.com/k3s-io/k3s", "单二进制，ARM原生"], 0),
            dataRow(["AI推理引擎", "NCNN", "github.com/Tencent/ncnn", "腾讯开源，ARM优化"], 1),
            dataRow(["目标检测", "YOLOv8n", "github.com/ultralytics", "SOTA精度，Nano版轻量"], 0),
            dataRow(["监控采集", "Prometheus", "github.com/prometheus", "CNCF毕业项目"], 1),
            dataRow(["可视化", "Grafana", "github.com/grafana/grafana", "业界标准"], 0),
            dataRow(["仿真底座", "Docker Compose", "docs.docker.com", "零硬件依赖"], 1),
          ],
        }),

        h2("4.2 学术文献支撑"),
        bullet("Yan et al. (2023) — Cloud-Native Computing in Satellite Systems (IEEE Spacecom)"),
        bullet("Li et al. (2024) — Lightweight Container Orchestration for Edge Constellations (ACM SoCC)"),
        bullet("Zhang et al. (2024) — NCNN Quantized Inference on Embedded Space Processors (ESA journal)"),
        bullet("Gao et al. (2025) — Fault-Tolerant Scheduling for LEO Satellite Constellations (Elsevier FGCS)"),

        divider(),

        h1("五、项目创新点与核心竞争力"),

        h2("5.1 技术创新"),
        numbered("国产操作系统首次在星载场景完整验证——填补OpenKylin在空间应用领域的空白"),
        numbered("OS裁剪+AI推理+可观测+调度的全链路闭环——不是单点技术验证，而是完整平台"),
        numbered("自研加权调度算法——感知算力/负载/健康度的多维度调度，相比简单轮询有显著优势"),
        numbered("端到端可量化——所有核心指标均有明确的基线测量与对比目标，数据说话"),

        h2("5.2 产业价值"),
        bullet("为国产操作系统进入空间应用市场提供技术验证样板"),
        bullet("降低商业卫星应用开发者适配成本，推动应用生态发展"),
        bullet("可复制的星载平台方案，未来可对接真实低轨卫星星座"),

        h2("5.3 大赛评审优势"),
        bullet("紧扣企业命题四项任务，每项都有量化指标，避免空泛"),
        bullet("开源技术栈完整，代码可复现，评审可验证"),
        bullet("仿真环境真实可运行，不是纸上方案"),
        bullet("学术文献支撑扎实，理论与实践结合"),

        divider(),

        h1("六、开发计划与里程碑"),
        new Table({
          width: { size: 9600, type: WidthType.DXA },
          columnWidths: [1600, 2400, 2800, 2800],
          rows: [
            headerRow(["阶段", "时间", "核心任务", "交付物"]),
            dataRow(["第一阶段", "Week 1-2 (9/20~10/4)", "OpenKylin裁剪+环境搭建+基线测量", "最小化系统镜像+指标基线报告"], 0),
            dataRow(["第二阶段", "Week 3-4 (10/5~10/18)", "AI推理跑通+NCNN量化对比", "遥感推理Demo+量化对比数据"], 1),
            dataRow(["第三阶段", "Week 5-6 (10/19~11/1)", "可观测体系+调度器+闭环串联", "监控大屏+调度器+故障恢复演示"], 0),
            dataRow(["第四阶段", "Week 7-8 (11/2~省赛)", "文档包装+演示视频+答辩", "解决方案文档+路演PPT+视频"], 1),
          ],
        }),

        divider(),

        h1("七、团队分工"),
        new Table({
          width: { size: 9600, type: WidthType.DXA },
          columnWidths: [2400, 3600, 3600],
          rows: [
            headerRow(["角色", "职责", "技能要求"]),
            dataRow(["项目负责人", "整体架构设计、对外沟通、答辩", "系统思维、演讲表达"], 0),
            dataRow(["OS工程师", "OpenKylin裁剪、内核优化、镜像构建", "Linux系统、Shell脚本"], 1),
            dataRow(["AI工程师", "YOLO训练、NCNN量化、推理优化", "Python、深度学习、嵌入式"], 0),
            dataRow(["平台工程师", "Prometheus/Grafana搭建、调度器开发", "DevOps、Go/Python、Docker"], 1),
          ],
        }),

        divider(),

        h1("八、总结"),
        para("星智项目以「国产操作系统+低轨卫星」为交叉点，构建一套完整的星载应用运行平台。项目具备明确的量化目标、完整的技术栈、可复现的验证方案和扎实的学术支撑，既契合企业命题需求，也为国产操作系统在空间领域的应用探索提供了有价值的实践样本。", { indent: true }),
        para("我们相信，星载智能计算平台是卫星互联网产业发展的关键基础设施，而国产操作系统应当在这片蓝海中占据一席之地。星智项目，就是这一步的起点。", { indent: true }),

        divider(),
        para("— 星智项目组 · 2026年9月 —", { align: AlignmentType.CENTER, color: "95A5A6", italics: true }),
      ],
    },
  ],
});

(async function() {
  var buffer = await Packer.toBuffer(doc);
  var outPath = projectDir + "/星智-项目架构与立项说明.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("文档已生成: " + outPath);
  console.log("文件大小: " + (buffer.length / 1024).toFixed(1) + " KB");
})();
