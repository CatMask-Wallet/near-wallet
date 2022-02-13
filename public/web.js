const catMask = {
  getAccoutId: function (callback) {
    const json = JSON.stringify({
      type: 'getAccoutId',
      origin: location.origin,
    });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: json,
      },
      '*',
    );
    const Handler = function (event) {
      if (
        event.data.type !==
        'chrome_web3_wallet_CatMaskMessageType_content_to_page'
      ) {
        return;
      }
      delete event.data.type;
      callback(event.data?.message);
      window.removeEventListener('message', Handler);
    };
    window.addEventListener('message', Handler);
  },
  signMessage: function (message, callback) {
    const json = JSON.stringify({
      type: 'signMessage',
      message: message || '',
      origin: location.origin,
    });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: json,
      },
      '*',
    );
    const Handler = function (event) {
      if (
        event.data.type !==
        'chrome_web3_wallet_CatMaskMessageType_content_to_page'
      ) {
        return;
      }
      delete event.data.type;
      callback(event.data);
      window.removeEventListener('message', Handler);
    };
    window.addEventListener('message', Handler);
  },
  signTransaction: function (message, callback) {
    const json = JSON.stringify({
      type: 'signTransaction',
      message: message || '',
      origin: location.origin,
    });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: json,
      },
      '*',
    );
    const Handler = function (event) {
      if (
        event.data.type !==
        'chrome_web3_wallet_CatMaskMessageType_content_to_page'
      ) {
        return;
      }
      delete event.data.type;
      callback(event.data);
      window.removeEventListener('message', Handler);
    };
    window.addEventListener('message', Handler);
  },
  signTransactionAndSendRaw: function (message, callback) {
    const json = JSON.stringify({
      type: 'signTransactionAndSendRaw',
      message: message || '',
      origin: location.origin,
    });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: json,
      },
      '*',
    );
    const Handler = function (event) {
      if (
        event.data.type !==
        'chrome_web3_wallet_CatMaskMessageType_content_to_page'
      ) {
        return;
      }
      delete event.data.type;
      callback(event.data);
      window.removeEventListener('message', Handler);
    };
    window.addEventListener('message', Handler);
  },
};

window.catMask = catMask;
