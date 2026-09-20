# 任务③ 全栈可观测体系

## 目标
- 覆盖应用任务/系统资源/异构算力/功耗温度/节点健康
- 实时评估算力负载均衡与资源利用率

## 技术栈
- Prometheus: https://github.com/prometheus/prometheus（指标采集）
- Node Exporter: https://github.com/prometheus/node_exporter（节点监控）
- Grafana: https://github.com/grafana/grafana（大屏展示）

## 部署
```bash
# docker-compose.yml 示例
docker compose up -d
```

## 采集指标
| 类别 | 指标 | 来源 |
|------|------|------|
| 系统资源 | CPU/内存/磁盘/网络 | Node Exporter |
| 应用任务 | 推理时延、任务队列、成功率 | 自定义 exporter |
| 功耗温度 | 功耗(W)、温度(°C) | 自定义 |
| 节点健康 | 存活、心跳、资源水位 | 自定义 |

## 大屏设计
- Grafana Dashboard：星座拓扑 + 节点状态 + 任务流 + 资源水位
- 现场演示：kill节点 → 大屏变红 → 60s内恢复
