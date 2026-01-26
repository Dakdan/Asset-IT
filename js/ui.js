function showOverlay(text = "กำลังดำเนินการ...") {
  document.querySelector("#overlay p").innerText = text;
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  overlay.classList.add("hidden");
}

function showPopup(title, message) {
  popupTitle.innerText = title;
  popupMessage.innerText = message;
  popup.classList.remove("hidden");
}

function closePopup() {
  popup.classList.add("hidden");
}

const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
