// Eileen's Flowing Thoughts — Main JS

document.addEventListener('DOMContentLoaded', () => {
  // ===== Highlight active nav link =====
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== Expand/collapse thought items =====
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.thought-item');
      const body = item.querySelector('.thought-body');
      const isExpanded = item.classList.toggle('expanded');
      btn.textContent = isExpanded ? '收起 ↑' : '展开阅读 →';
      body.style.display = isExpanded ? 'block' : 'none';
    });
  });

  // ===== Filter by tags =====
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tag = btn.dataset.tag;
      document.querySelectorAll('[data-tags]').forEach(card => {
        if (tag === 'all' || card.dataset.tags.includes(tag)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== Mobile nav toggle (simple) =====
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const nav = document.querySelector('nav ul');
      nav.classList.toggle('show');
    });
  }

  // ===== Search Toggle =====
  document.querySelectorAll('.search-toggle').forEach(toggle => {
    const wrapper = toggle.closest('.search-wrapper');
    const box = wrapper.querySelector('.search-box');
    const input = wrapper.querySelector('.search-input');
    const closeBtn = wrapper.querySelector('.search-close');

    toggle.addEventListener('click', () => {
      box.classList.add('show');
      toggle.style.display = 'none';
      input.focus();
    });

    closeBtn.addEventListener('click', () => {
      box.classList.remove('show');
      toggle.style.display = '';
      input.value = '';
      const results = wrapper.querySelector('.search-results');
      results.classList.remove('show');
      results.innerHTML = '';
    });
  });

  // ===== Search =====
  const searchIndex = [
    { title: '首页', section: '页面', url: 'index.html', keywords: '首页 欢迎 主页' },
    { title: 'OfferFit — AI简历优化工具', section: '作品', url: 'works.html', keywords: 'AI 简历 优化 产品 OfferFit 求职 匹配 JD' },
    { title: '品牌视觉设计', section: '作品', url: 'works.html', keywords: '设计 品牌 视觉 logo 配色 字体' },
    { title: '水彩系列：四季', section: '作品', url: 'works.html', keywords: '绘画 水彩 四季 艺术 插画' },
    { title: '街拍日记', section: '作品', url: 'works.html', keywords: '摄影 街拍 城市 光影 镜头' },
    { title: '开源小工具', section: '作品', url: 'works.html', keywords: '代码 开源 Python 命令行 工具 效率' },
    { title: '插画合集', section: '作品', url: 'works.html', keywords: '插画 花卉 数字 自然 色彩 设计' },
    { title: '日落收集计划', section: '作品', url: 'works.html', keywords: '摄影 日落 城市 季节 风景' },
    { title: '关于创作的碎片', section: '思考', url: 'thoughts.html', keywords: '创作 灵感 碎片 记录 流水' },
    { title: '读《小王子》有感', section: '思考', url: 'thoughts.html', keywords: '小王子 读书 感悟 镜子 故事 圣埃克苏佩里' },
    { title: '慢下来的力量', section: '思考', url: 'thoughts.html', keywords: '慢 专注 手冲 咖啡 乐器 练习 勇气' },
    { title: '关于"足够好"', section: '思考', url: 'thoughts.html', keywords: '完美主义 草稿 完成 真实 创作' },
    { title: 'Git 常用命令速查', section: '文档', url: 'docs.html', keywords: 'Git 命令 分支 合并 冲突 回滚 技术' },
    { title: '配色入门指南', section: '文档', url: 'docs.html', keywords: '配色 色轮 色彩 设计 入门' },
    { title: '我的效率工具箱', section: '文档', url: 'docs.html', keywords: '工具 效率 软件 笔记 终端 推荐' },
    { title: 'CSS Grid 布局笔记', section: '文档', url: 'docs.html', keywords: 'CSS Grid 布局 网格 前端 技术' },
    { title: '《设计心理学》读书笔记', section: '文档', url: 'docs.html', keywords: '设计心理学 诺曼 人机交互 读书' },
    { title: 'Markdown 写作技巧', section: '文档', url: 'docs.html', keywords: 'Markdown 写作 语法 指南 工具' },
    { title: '字体选择速查表', section: '文档', url: 'docs.html', keywords: '字体 中英文 搭配 选择 设计' },
    { title: '中国ATS招聘管理系统全景报告', section: 'OfferFit', url: 'offerfit/ats-analysis.html', keywords: 'ATS 招聘 管理 系统 市场 竞品 AI 分析 用友 Moka 北森 牛客' },
    { title: '简历诊断大模型评测框架', section: 'OfferFit', url: 'offerfit/llm-eval-framework.html', keywords: '简历 诊断 大模型 评测 框架 数据集 评估 STAR 匹配 公平性 LLM' },
    { title: 'OfferFit 漫想记', section: 'OfferFit', url: 'offerfit/offerfit-thoughts.html', keywords: 'OfferFit 漫想 灵感 产品 想法' },
    { title: '周末手帐 Vlog', section: '视频', url: 'videos.html', keywords: '视频 Vlog 手帐 咖啡 书店 周末' },
    { title: '水彩入门教程', section: '视频', url: 'videos.html', keywords: '视频 教程 水彩 入门 调色 画' },
    { title: '创作过程记录', section: '视频', url: 'videos.html', keywords: '视频 创作 数字插画 线稿 上色 过程' },
    { title: '春日散步', section: '视频', url: 'videos.html', keywords: '视频 春天 樱花 散步 相机 Vlog' },
    { title: '留言板', section: '页面', url: 'guestbook.html', keywords: '留言 评论 讨论 反馈' },
    { title: '关于 Eileen', section: '页面', url: 'about.html', keywords: '关于 Eileen 介绍 兴趣 绘画 摄影 阅读 手帐 代码' },
  ];

  // Detect if we're in a subdirectory
  function getUrl(item) {
    const inSubdir = location.pathname.includes('/offerfit/');
    if (inSubdir) {
      return '../' + item.url;
    }
    return item.url;
  }

  function search(query) {
    if (!query.trim()) return [];
    const terms = query.toLowerCase().split(/\s+/);
    return searchIndex.filter(item => {
      const text = (item.title + ' ' + item.section + ' ' + item.keywords).toLowerCase();
      return terms.every(term => text.includes(term));
    });
  }

  // Init search for all search inputs on the page
  document.querySelectorAll('.search-input').forEach(input => {
    const resultsDiv = input.parentElement.querySelector('.search-results');
    let activeIndex = -1;

    input.addEventListener('input', () => {
      const query = input.value.trim();
      if (!query) {
        resultsDiv.classList.remove('show');
        resultsDiv.innerHTML = '';
        activeIndex = -1;
        return;
      }

      const results = search(query);
      if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="search-no-result">没有找到相关内容</div>';
        resultsDiv.classList.add('show');
        activeIndex = -1;
        return;
      }

      resultsDiv.innerHTML = results.map((item, i) =>
        `<a href="${getUrl(item)}" class="search-result-item${i === 0 ? ' active' : ''}" style="display:block;text-decoration:none;color:inherit;">
          <span class="result-title">${item.title}</span>
          <span class="result-section">${item.section}</span>
        </a>`
      ).join('');
      resultsDiv.classList.add('show');
      activeIndex = 0;
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
      const items = resultsDiv.querySelectorAll('.search-result-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[activeIndex]?.classList.remove('active');
        activeIndex = (activeIndex + 1) % items.length;
        items[activeIndex]?.classList.add('active');
        items[activeIndex]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[activeIndex]?.classList.remove('active');
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        items[activeIndex]?.classList.add('active');
        items[activeIndex]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[activeIndex]) {
          window.location.href = items[activeIndex].href;
        }
      } else if (e.key === 'Escape') {
        resultsDiv.classList.remove('show');
        input.value = '';
        const wrapper = input.closest('.search-wrapper');
        const box = wrapper.querySelector('.search-box');
        const toggle = wrapper.querySelector('.search-toggle');
        box.classList.remove('show');
        toggle.style.display = '';
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!input.parentElement.contains(e.target)) {
        resultsDiv.classList.remove('show');
      }
    });

    // Focus to show results if there's a query
    input.addEventListener('focus', () => {
      if (input.value.trim() && resultsDiv.innerHTML) {
        resultsDiv.classList.add('show');
      }
    });
  });
});
