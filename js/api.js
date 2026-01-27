const API = 'https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec';

async function callAPI(action, data = {}) {
  const params = new URLSearchParams({ action, ...data });
  const res = await fetch(`${API}?${params.toString()}`);
  return res.json();
}


