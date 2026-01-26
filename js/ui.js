function showOverlay(text = "กำลังดำเนินการ...") {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;
  overlay.querySelector("p").innerText = text;
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;
  overlay.classList.add("hidden");
}

function showPopup(title, message) {
  const popup = document.getElementById("popup");
  if (!popup) return;
  popup.querySelector("h3").innerText = title;
  popup.querySelector("p").innerText = message;
  popup.classList.remove("hidden");
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (!popup) return;
  popup.classList.add("hidden");
}
