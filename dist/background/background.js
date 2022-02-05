function getExtension() {
  return chrome?.app && chrome?.app.window ? chrome?.app : chrome;
}
function create(e) {
  const t = 625,
    n = 376,
    o = getExtension(),
    { create: r } = o.windows,
    { screenY: a, outerWidth: c, outerHeight: s } = window,
    i = Math.round(a + s / 2 - t),
    g = Math.round(c);
  return new Promise((o, a) => {
    try {
      r(
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
    } catch (c) {
      a(c);
    }
  });
}
chrome.runtime.onMessage.addListener(function (e, t, n) {
  console.log(e, t, n),
    'signMessage' === e.type &&
      (n('miss'),
      (localStorage.ptc_message_json = JSON.stringify(e)),
      create('backgroundMessage')),
    'signTransaction' === e.type &&
      (n('miss'),
      (localStorage.ptc_message_json = JSON.stringify(e)),
      create('backgroundTransaction')),
    'getAccoutId' === e.type && n(localStorage.currentAccountId);
});
