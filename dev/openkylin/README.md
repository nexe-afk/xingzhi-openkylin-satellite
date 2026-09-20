# 任务① 星载OS适配与裁剪优化

## 目标
- 镜像体积降低 ≥20%
- 空闲内存占用降低 ≥15%
- 优化启动开销

## 环境
- OpenKylin 3.0（2026-08-28发布，内核 Linux 7.0）
- 下载：https://www.openkylin.top

## 裁剪策略
1. 无桌面安装（server/minimal 版）
2. 禁用/移除不需要的服务（systemd 服务裁剪）
3. 移除文档/开发工具链/字体
4. 内核模块按需裁剪

## 测量方法
- 镜像体积：`du -sh /` 或 `dd` 制作镜像文件
- 空闲内存：`free -m` 多次采样取均值（静置10分钟后）
- 启动时间：`systemd-analyze blame`

## 记录模板
| 组件 | 裁剪前体积 | 裁剪后体积 | 功能影响 |
|------|-----------|-----------|----------|
| 桌面环境 | ? | 移除 | 无（星载无头） |
| ... | | | |

## 参考
- OpenKylin Gitee: https://gitee.com/openkylin
- 论文: Quantized AI Inference on Small Satellites (arXiv:2606.06528)
