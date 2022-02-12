function getExtension() {
  return chrome?.app && chrome?.app.window ? chrome?.app : chrome;
}
function create(e) {
  const t = 625,
    n = 376,
    o = getExtension(),
    { create: a } = o.windows,
    { screenY: r, outerWidth: s, outerHeight: c } = window,
    i = Math.round(r + c / 2 - t),
    g = Math.round(s);
  return new Promise((o, r) => {
    try {
      a(
        {
          url: `/index.html?type=${e}`,
          type: 'popup',
          height: t,
          width: n,
          top: Math.max(i, 0),
          left: Math.max(g, 0),
        },
        (e) => {
          o(e);
        },
      );
    } catch (s) {
      r(s);
    }
  });
}
chrome.runtime.onMessage.addListener(function (e, t, n) {
  'signMessage' === e.type &&
    (n('miss'),
    (localStorage.ptc_message_json = JSON.stringify(e)),
    create('backgroundMessage')),
    'signTransaction' === e.type &&
      (n('miss'),
      (localStorage.ptc_message_json = JSON.stringify(e)),
      create('backgroundTransaction')),
    'signTransactionAndSendRaw' === e.type &&
      (n('miss'),
      (localStorage.ptc_message_json = JSON.stringify({
        ...e.message,
        origin: e.origin,
      })),
      create('backgroundTransactionAndSend')),
    'getAccoutId' === e.type && n(localStorage.currentAccountId);
});
