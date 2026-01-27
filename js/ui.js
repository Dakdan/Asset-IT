function showOverlay() {
  document.getElementById("overlay")?.classList.remove("hidden");
}

function hideOverlay() {
  document.getElementById("overlay")?.classList.add("hidden");
}

function showPopup(msg, title = "แจ้งเตือน") {
  const popup = document.getElementById("popup");
  if (!popup) return;

  document.getElementById("popupMsg").innerText = msg;
  document.getElementById("popupTitle").innerText = title;

  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup")?.classList.add("hidden");
}
