const GAS_URL = "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

function callAPI(action, params = {}) {
  return new Promise((resolve, reject) => {
    const cbName = "cb_" + Date.now() + Math.floor(Math.random() * 1000);

    window[cbName] = res => {
      resolve(res);
      delete window[cbName];
      script.remove();
    };

    const query = new URLSearchParams({
      action,
      callback: cbName,
      ...params
    }).toString();

    const script = document.createElement("script");
    script.src = GAS_URL + "?" + query;
    script.onerror = () => {
      reject(new Error("Load GAS failed"));
      delete window[cbName];
      script.remove();
    };

    document.body.appendChild(script);
  });
}

