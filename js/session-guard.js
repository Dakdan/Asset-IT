<script>
/**
 * Session Guard v1.0 (FINAL)
 * ใช้ได้ทุกหน้า
 */

(async function () {
  const CONFIG = {
    API_BASE: 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec', // 🔴 แก้ของจริง
    LOGIN_PAGE: 'login.html',
    CHANGE_PASSWORD_PAGE: 'change-password.html',
    HOME_PAGE: 'index.html',
    ADMIN_PAGE: 'admin.html'
  };

  const currentPage = location.pathname.split('/').pop();

  // หน้าที่ไม่ต้อง guard
  const PUBLIC_PAGES = [
    '',
    'login.html',
    'register.html'
  ];

  if (PUBLIC_PAGES.includes(currentPage)) return;

  try {
    const token = localStorage.getItem('session_token');

    // ❌ ไม่มี token → กลับไป login
    if (!token) {
      redirect(CONFIG.LOGIN_PAGE);
      return;
    }

    // 🔍 ตรวจ session กับ backend
    const res = await fetch(`${CONFIG.API_BASE}?action=checkSession`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await res.json();

    // ❌ session ไม่ผ่าน
    if (!data.ok) {
      clearSession();
      redirect(CONFIG.LOGIN_PAGE);
      return;
    }

    const { role, firstLogin } = data.user;

    // 🔐 บังคับเปลี่ยนรหัสครั้งแรก
    if (firstLogin && currentPage !== CONFIG.CHANGE_PASSWORD_PAGE) {
      redirect(CONFIG.CHANGE_PASSWORD_PAGE);
      return;
    }

    // 🛡️ หน้า admin แต่ไม่ใช่ admin
    if (currentPage === CONFIG.ADMIN_PAGE && role !== 'admin') {
      redirect(CONFIG.HOME_PAGE);
      return;
    }

    // ✅ ผ่านทุกเงื่อนไข = ใช้งานได้
    console.log('✅ Session Guard: OK');

  } catch (err) {
    console.error('Session Guard error:', err);
    clearSession();
    redirect(CONFIG.LOGIN_PAGE);
  }

  // ===== helper =====
  function redirect(page) {
    if (!location.pathname.endsWith(page)) {
      location.replace(page);
    }
  }

  function clearSession() {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_profile');
  }
})();
</script>
