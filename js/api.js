// ===============================
// API CONFIG (แกนกลาง)
// ===============================
const API_URL = "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

// ===============================
// CALL API (กลาง)
// ===============================
function callAPI(action, data = {}) {
  return new Promise((resolve) => {
    const callbackName = "cb_" + Date.now();

    window[callbackName] = function (res) {
      resolve(res);
      delete window[callbackName];
      document.body.removeChild(script);
    };

    const params = new URLSearchParams({
      action,
      callback: callbackName,
      ...data
    });

    const script = document.createElement("script");
    script.src = API_URL + "?" + params.toString();
    document.body.appendChild(script);
  });


}
