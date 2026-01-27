(async function () {
  const CONFIG = {
    API_BASE: 'https://script.google.com/macros/s/DEPLOY_ID/exec', // 🔴 แก้
    LOGIN_PAGE: 'login.html',
    CHANGE_PASSWORD_PAGE: 'change-password.html',
    HOME_PAGE: 'index.html',
    ADMIN_PAGE: 'admin.html'
  };

  const page = location.pathname.split('/').pop();
  const PUBLIC = ['', 'login.html', 'register.html'];

  if (PUBLIC.includes(page)) return;

  try {
    const token = localStorage.getItem('session_token');
    if (!token) return location.replace(CONFIG.LOGIN_PAGE);

    const res = await fetch(`${CONFIG.API_BASE}?action=checkSession`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const r = await res.json();

    if (!r.ok) {
      localStorage.clear();
      return location.replace(CONFIG.LOGIN_PAGE);
    }

    const { role, firstLogin } = r.data;

    if (firstLogin && page !== CONFIG.CHANGE_PASSWORD_PAGE)
      return location.replace(CONFIG.CHANGE_PASSWORD_PAGE);

    if (page === CONFIG.ADMIN_PAGE && role !== 'ADMIN')
      return location.replace(CONFIG.HOME_PAGE);

  } catch {
    localStorage.clear();
    location.replace(CONFIG.LOGIN_PAGE);
  }
})();
