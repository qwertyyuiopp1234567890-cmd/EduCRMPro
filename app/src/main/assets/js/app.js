/* EduCRM Pro – shared UI helpers */
(function (global) {
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(c => e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  }
  function escape(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function fmtMoney(n) { return '$' + Number(n || 0).toFixed(2); }
  function todayStr() { return new Date().toISOString().slice(0,10); }

  function topbar(title) {
    const u = Auth.current();
    return `<header class="topbar">
      <h1>${escape(title)}</h1>
      <div style="display:flex;align-items:center;gap:10px">
        <span class="user">${escape(u ? u.name : '')}</span>
        <button class="logout" onclick="Auth.logout()">Logout</button>
      </div>
    </header>`;
  }

  function bottomnav(active) {
    const items = [
      { href: 'dashboard.html',  ico: '🏠', label: 'Home', key: 'dashboard' },
      { href: 'students.html',   ico: '🎓', label: 'Students', key: 'students' },
      { href: 'schedule.html',   ico: '📅', label: 'Schedule', key: 'schedule' },
      { href: 'payments.html',   ico: '💳', label: 'Payments', key: 'payments' },
      { href: 'attendance.html', ico: '✅', label: 'Attend.', key: 'attendance' }
    ];
    return '<nav class="bottomnav">' + items.map(i =>
      `<a class="${active===i.key?'active':''}" href="${i.href}"><span class="ico">${i.ico}</span>${i.label}</a>`
    ).join('') + '</nav>';
  }

  function pageHead(title, actions) {
    return `<div class="page-head"><h2>${escape(title)}</h2><div>${actions||''}</div></div>`;
  }

  function confirmDelete(msg, fn) { if (confirm(msg || 'Delete this item?')) fn(); }

  global.UI = { el, escape, fmtMoney, todayStr, topbar, bottomnav, pageHead, confirmDelete };
})(window);
