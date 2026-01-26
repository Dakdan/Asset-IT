// ===============================
// API CONFIG (แกนกลาง)
// ===============================
const API_URL = "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

// ===============================
// CALL API (กลาง)
// ===============================
async function callAPI(action, data = {}) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action,
        ...data
      })
    });

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: "เชื่อมต่อระบบไม่ได้" };
  }
}
