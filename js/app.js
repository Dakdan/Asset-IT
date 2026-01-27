/* =============================
   CONFIG
   ============================= */
const API_URL = "https://script.google.com/macros/s/xxxxxxxx/exec"; 
// 🔴 เปลี่ยนเป็น URL Apps Script ของคุณจริง

/* =============================
   OVERLAY / POPUP
   ============================= */
function showOverlay(text = "กำลังดำเนินการ..."){
  let overlay = document.querySelector(".overlay");
  if(!overlay){
    overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="overlay-card">
        <div class="spinner"></div>
        <div>${text}</div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  overlay.classList.remove("hidden");
}

function hideOverlay(){
  const overlay = document.querySelector(".overlay");
  if(overlay) overlay.classList.add("hidden");
}

function showPopup(title, message){
  let popup = document.querySelector(".popup");
  if(!popup){
    popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
      <div class="popup-card">
        <h3 id="popup-title"></h3>
        <p id="popup-message"></p>
        <br>
        <button class="btn-login" onclick="hidePopup()">ตกลง</button>
      </div>
    `;
    document.body.appendChild(popup);
  }
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-message").innerText = message;
  popup.classList.remove("hidden");
}

function hidePopup(){
  const popup = document.querySelector(".popup");
  if(popup) popup.classList.add("hidden");
}

/* =============================
   API CALL (มาตรฐานเดียว)
   ============================= */
async function callAPI(action, data = {}){
  try{
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...data })
    });
    return await res.json();
  }catch(err){
    console.error(err);
    return { ok:false, message:"เชื่อมต่อเซิร์ฟเวอร์ไม่ได้" };
  }
}

/* =============================
   SESSION
   ============================= */
function setSession(user){
  localStorage.setItem("session", JSON.stringify(user));
}

function getSession(){
  const s = localStorage.getItem("session");
  return s ? JSON.parse(s) : null;
}

function clearSession(){
  localStorage.removeItem("session");
}

/* =============================
   AUTH FLOW
   ============================= */
function requireLogin(){
  if(!getSession()){
    location.replace("login.html");
  }
}

function logout(){
  clearSession();
  location.replace("login.html");
}

/* =============================
   AUTH ACTIONS
   ============================= */
async function login(email, password){
  showOverlay();
  const res = await callAPI("login",{ email, password });
  hideOverlay();

  if(res.ok){
    setSession(res.user);
    location.replace("index.html");
  }else{
    showPopup("เข้าสู่ระบบไม่สำเร็จ", res.message);
  }
}

async function register(name, email, password){
  showOverlay();
  const res = await callAPI("register",{ name, email, password });
  hideOverlay();

  if(res.ok){
    location.href = "verify.html";
  }else{
    showPopup("ผิดพลาด", res.message);
  }
}

async function verify(code){
  showOverlay();
  const res = await callAPI("verify",{ code });
  hideOverlay();

  if(res.ok){
    location.replace("login.html");
  }else{
    showPopup("ยืนยันไม่สำเร็จ", res.message);
  }
}
