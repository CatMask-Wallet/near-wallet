const CAT_MASK_MESSAGE_PTOC_TYPE =
    'chrome_web3_wallet_CatMaskMessageType_page_to_content',
  CAT_MASK_MESSAGE_BTOC_TYPE =
    'chrome_web3_wallet_CatMaskMessageType_background_to_content',
  CAT_MASK_MESSAGE_CTOP_TYPE =
    'chrome_web3_wallet_CatMaskMessageType_content_to_page',
  inPageBundle = `\nconst catMask = {\n  getAccoutId: function (callback) {\n    const json = JSON.stringify({\n      type: 'getAccoutId',\n      origin: location.origin,\n    });\n    postMessage({ type: '${CAT_MASK_MESSAGE_PTOC_TYPE}', message: json }, '*');\n    const Handler = function (event) {\n      if (event.data.type !== '${CAT_MASK_MESSAGE_CTOP_TYPE}') return;\n      delete event.data.type\n      callback(event.data?.message);\n      window.removeEventListener('message', Handler);\n    };\n    window.addEventListener('message', Handler);\n  },\n  signMessage: function (message, callback) {\n    const json = JSON.stringify({\n      type: 'signMessage',\n      message: message || '',\n      origin: location.origin,\n    });\n    postMessage({ type: '${CAT_MASK_MESSAGE_PTOC_TYPE}', message: json }, '*');\n    const Handler = function (event) {\n      if (event.data.type !== '${CAT_MASK_MESSAGE_CTOP_TYPE}') return;\n      delete event.data.type\n      callback(event.data);\n      window.removeEventListener('message', Handler);\n    };\n    window.addEventListener('message', Handler);\n  },\n  signTransaction: function (message, callback) {\n    const json = JSON.stringify({\n      type: 'signTransaction',\n      message: message || '',\n      origin: location.origin,\n    });\n    postMessage({ type: '${CAT_MASK_MESSAGE_PTOC_TYPE}', message: json }, '*');\n    const Handler = function (event) {\n      if (event.data.type !== '${CAT_MASK_MESSAGE_CTOP_TYPE}') return;\n      delete event.data.type\n      callback(event.data);\n      window.removeEventListener('message', Handler);\n    };\n    window.addEventListener('message', Handler);\n  },\n  signTransactionAndSendRaw: function (message, callback) {\n    const json = JSON.stringify({\n      type: 'signTransactionAndSendRaw',\n      message: message || '',\n      origin: location.origin,\n    });\n    postMessage({ type: '${CAT_MASK_MESSAGE_PTOC_TYPE}', message: json }, '*');\n    const Handler = function (event) {\n      if (event.data.type !== '${CAT_MASK_MESSAGE_CTOP_TYPE}') return;\n      delete event.data.type\n      callback(event.data);\n      window.removeEventListener('message', Handler);\n    };\n    window.addEventListener('message', Handler);\n  }\n}\nwindow.catMask = catMask\n`;
function injectScript(e) {
  try {
    const n = document.head || document.documentElement,
      t = document.createElement('script');
    t.setAttribute('async', 'false'),
      (t.textContent = e),
      n.insertBefore(t, n.children[0]),
      n.removeChild(t);
  } catch (n) {
    console.error('CatMask: Provider injection failed.', n);
  }
}
function shouldInjectProvider() {
  return (
    doctypeCheck() &&
    suffixCheck() &&
    documentElementCheck() &&
    !blockedDomainCheck()
  );
}
function doctypeCheck() {
  const { doctype: e } = window.document;
  return !e || 'html' === e.name;
}
function suffixCheck() {
  const e = [/\.xml$/u, /\.pdf$/u],
    n = window.location.pathname;
  for (let t = 0; t < e.length; t++) if (e[t].test(n)) return !1;
  return !0;
}
function documentElementCheck() {
  const e = document.documentElement.nodeName;
  return !e || 'html' === e.toLowerCase();
}
function blockedDomainCheck() {
  const e = [],
    n = window.location.href;
  let t;
  for (let a = 0; a < e.length; a++) {
    const s = e[a].replace('.', '\\.');
    if (((t = new RegExp(`(?:https?:\\/\\/)(?:(?!${s}).)*$`, 'u')), !t.test(n)))
      return !0;
  }
  return !1;
}
window.addEventListener(
  'message',
  function (e) {
    if (e.source == window && e.data.type === CAT_MASK_MESSAGE_PTOC_TYPE) {
      if (!e.data.message) return;
      let t;
      try {
        t = JSON.parse(e.data.message);
      } catch (n) {
        return console.log('invalid message of json');
      }
      if (!t.origin) return;
      chrome.runtime.sendMessage(t, function (e) {});
    }
  },
  !1,
),
  chrome.runtime.onMessage.addListener(function (e, n, t) {
    e.type === CAT_MASK_MESSAGE_BTOC_TYPE &&
      postMessage(
        { type: CAT_MASK_MESSAGE_CTOP_TYPE, message: e.data },
        e.origin,
      ),
      t('close');
  }),
  shouldInjectProvider();
