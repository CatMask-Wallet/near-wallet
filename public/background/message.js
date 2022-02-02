const CAT_MASK_MESSAGE_CTOP_TYPE =
  "chrome_web3_wallet_CatMaskMessageType_content_to_page";
  const CAT_MASK_MESSAGE_BTOC_TYPE =
    'chrome_web3_wallet_CatMaskMessageType_background_to_content';

window.onload = function () {
  try {
    const json = JSON.parse(localStorage.ptc_message_json);
    window["message-view"].innerText = localStorage.ptc_message_json;
    window["origin-view"].innerText = json.origin;
  } catch (error) {
    console.log(error);
  }
};

window["message-approved-button"].onclick = function () {
  const json = JSON.parse(window["message-view"].innerText);
  chrome.tabs.query({ active: true, currentWindow: false }, (tabs) => {
    tabs.map((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        type: CAT_MASK_MESSAGE_BTOC_TYPE,
        data: 'sign::TODO', //TODO
        origin: json.origin
      }, () => {
        window.close()
      })
    });
  });
};
