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
});
