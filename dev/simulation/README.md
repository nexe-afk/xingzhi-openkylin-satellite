# 仿真环境

## 目标
- 容器化搭建星载节点仿真（N=4~6 + 地面云节点）
- 验证任务①②③④全链路

## 技术
- Docker Compose: https://github.com/docker/compose
- OpenSN（参考）: arXiv:2507.03248（LEO卫星网络开源仿真库）
- 容器内跑 OpenKylin 裁剪镜像

## 拓扑
```
[地面云节点] ←→ [星载节点1] ←→ [星载节点2]
                     ↕             ↕
                [星载节点3] ←→ [星载节点4]
```

## 启动
```bash
docker compose up -d
docker compose ps
```
