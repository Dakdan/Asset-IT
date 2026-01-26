// ===============================
// LOGIN
// ===============================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("กรุณากรอก Email และ Password");
    return;
  }

  const result = await callAPI("login", {
    email,
    password
  });

  if (result.success) {
    localStorage.setItem("it_session", JSON.stringify(result.user));
    location.href = "./index.html";
  } else {
    alert(result.message || "Login ไม่สำเร็จ");
  }
}

// ===============================
// CHECK SESSION
// ===============================
function checkSession() {
  const session = localStorage.getItem("it_session");
  if (!session) {
    location.href = "./login.html";
  }
}
