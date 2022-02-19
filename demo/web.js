const catMask = {
  getAccoutId: function (e) {
    const t = JSON.stringify({ type: 'getAccoutId', origin: location.origin });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: t,
      },
      '*',
    );
    const a = function (t) {
      'chrome_web3_wallet_CatMaskMessageType_content_to_page' === t.data.type &&
        typeof t.data?.message === 'string' &&
        (delete t.data.type,
        e(t.data?.message),
        window.removeEventListener('message', a));
    };
    window.addEventListener('message', a);
  },
  signMessage: function (e, t) {
    const a = JSON.stringify({
      type: 'signMessage',
      message: e || '',
      origin: location.origin,
    });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: a,
      },
      '*',
    );
    const s = function (e) {
      'chrome_web3_wallet_CatMaskMessageType_content_to_page' === e.data.type &&
        typeof e.data?.message?.signature === 'string' &&
        typeof e.data?.message?.publicKey === 'string' &&
        (delete e.data.type,
        t(e.data.message),
        window.removeEventListener('message', s));
    };
    window.addEventListener('message', s);
  },
  signTransaction: function (e, t) {
    const a = JSON.stringify({
      type: 'signTransaction',
      message: e || '',
      origin: location.origin,
    });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: a,
      },
      '*',
    );
    const s = function (e) {
      'chrome_web3_wallet_CatMaskMessageType_content_to_page' === e.data.type &&
        typeof e.data?.message?.signature === 'string' &&
        typeof e.data?.message?.publicKey === 'string' &&
        (delete e.data.type,
        t(e.data.message),
        window.removeEventListener('message', s));
    };
    window.addEventListener('message', s);
  },
  signTransactionAndSendRaw: function (e, t) {
    const a = JSON.stringify({
      type: 'signTransactionAndSendRaw',
      message: e || '',
      origin: location.origin,
    });
    postMessage(
      {
        type: 'chrome_web3_wallet_CatMaskMessageType_page_to_content',
        message: a,
      },
      '*',
    );
    const s = function (e) {
      'chrome_web3_wallet_CatMaskMessageType_content_to_page' === e.data.type &&
        typeof e.data?.message?.hash === 'string' &&
        (delete e.data.type,
        t(e.data.message),
        window.removeEventListener('message', s));
    };
    window.addEventListener('message', s);
  },
};
window.catMask = catMask;
