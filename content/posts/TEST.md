---
title: TEST
category: Personal Thingking
description: 用来测试一下
author: Wm1NlkN
date: 2026-03-07
cover: /PostImages/2.webp
readtime: 5 min read
---

### 用图AI探测在企业网络内部出现的横向移动行为

**研究目标**
提出一种无需标注数据、可直接部署于企业网络的图学习方法，用于检测APT的横向移动。

**方法框架**
1.认证图构建：将日志中的每次认证事件建模为图中的一条边，节点为网络内部实体（机器、账号）。
2.无监督图学习与异常检测：学习节点的潜在表示，并通过逻辑回归链接预测器识别低概率的认证事件，实现异常检测。

摘要
1.提出了一种利用无监督图学习来检测APT在企业级计算机网络进行Lateral Movement的技术。此技术使用从行业标准日志实践中提取的信息，能立即部署到真实的企业网络中。该计划为无监督方法，不需要任何标注训练数据
2.这一方法由两个核心组件构成：一个认证图（authentication graph）和一个无监督的基于图的机器学习流水线。该流水线学习认证实体的潜在表示（latent representations），并通过一个已训练的逻辑回归链接预测器识别低概率的认证事件，从而实现异常检测。
3.将此技术运用于一个小规模的模拟环境和一个大规模的真实环境。效果很好

1 引言
![[2.webp]]




&emsp;&emsp;为了有效检测横向移动，我们首先将输入数据（行业标准的认证日志）转化为一种能表示单次认证事件以及整个网络认证行为的结构。为此，我们构建了一个认证图：节点代表认证实体（机器或用户），边代表认证事件。接着，我们使用无监督的节点嵌入技术，为图中每个节点生成潜在表示。最后，我们在这些节点嵌入上训练一个链接预测算法，并利用该算法在新的认证事件中识别低概率的链接。

```
<article className="prose-custom">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                <span className="block w-full flex justify-center my-8">
                  <img
                    {...props}
                    alt={props.alt || "Blog Image"}
                    className="rounded-lg max-h-[600px] object-contain bg-gray-100 dark:bg-gray-800/50"
                    loading="lazy"
                  />
                </span>
              ),
            }}
          >
```
