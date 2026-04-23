/* EduCRM Pro – auth */
(function (global) {
  function login(email, password) {
    const u = DB.users.all().find(x => x.email.toLowerCase() === String(email).toLowerCase() && x.password === password);
    if (!u) return { ok: false, error: 'Invalid email or password' };
    DB.session.set({ id: u.id, name: u.name, email: u.email, role: u.role, at: Date.now() });
    return { ok: true, user: u };
  }
  function logout() { DB.session.clear(); location.href = 'index.html'; }
  function current() { return DB.session.get(); }
  function requireAuth() {
    if (!current()) { location.replace('index.html'); return false; }
    return true;
  }
  global.Auth = { login, logout, current, requireAuth };
})(window);
