# 任务② 典型场景智能应用

## 目标
- 核心业务指标提升 ≥20%（时延/准确率/吞吐）

## 场景选择（做深1个）
- ✅ 遥感目标识别（YOLOv8n + NCNN量化）—— 推荐首选
- 备选：农作物生长态势分析、灾害监测、海洋环境监测

## 技术栈
- YOLOv8n: https://github.com/ultralytics/ultralytics
- NCNN: https://github.com/Tencent/ncnn（腾讯开源，ARM嵌入式最优）
- ONNX Runtime（备选）: https://github.com/microsoft/onnxruntime

## 数据
- 公开遥感数据集（Sentinel开源样例）
- 明确标注数据来源，涉密脱敏

## 测试方法
- 朴素算法（原始YOLOv8） vs 优化方案（量化/剪枝）
- 同数据集、同硬件
- 多轮测试取均值、标准差、样本截图

## 指标记录
| 模型 | 推理时延(ms/张) | 准确率(%) | 吞吐(张/s) |
|------|----------------|----------|-----------|
| 朴素 | ? | ? | ? |
| 量化 | ? | ? | ? |
| 提升% | | | |
