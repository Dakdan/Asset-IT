function showOverlay(text="กำลังประมวลผล...") {
  const o = document.getElementById("overlay");
  o.querySelector("p").innerText = text;
  o.classList.remove("hidden");
}

function hideOverlay() {
  document.getElementById("overlay").classList.add("hidden");
}

function showPopup(title, message) {
  const p = document.getElementById("popup");
  p.querySelector("h3").innerText = title;
  p.querySelector("p").innerText = message;
  p.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
