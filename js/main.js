function checkSession() {
  const session = localStorage.getItem("it_session");
  if (!session) {
    location.href = "./login.html";
  }
}

function logout() {
  localStorage.removeItem("it_session");
  location.href = "./login.html";
}
