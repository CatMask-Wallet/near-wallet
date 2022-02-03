function getExtension() {
  return chrome?.app && chrome?.app.window ? chrome?.app : chrome;
}
function create() {
  const e = 625,
    t = 376,
    o = getExtension(),
    { create: n } = o.windows,
    { screenY: r, outerWidth: c, outerHeight: a } = window,
    i = Math.round(r + a / 2 - e),
    s = Math.round(c);
  return new Promise((o, r) => {
    try {
      n(
        {
          url: '/index.html?type=backgroundMessage',
          type: 'popup',
          height: e,
          width: t,
          top: Math.max(i, 0),
          left: Math.max(s, 0),
        },
        (e) => {
          o(e);
        },
      );
    } catch (c) {
      r(c);
    }
  });
}
chrome.runtime.onMessage.addListener(function (e, t, o) {
  console.log(e, t, o),
    'signTransaction' === e.type &&
      (o('miss'),
      (localStorage.ptc_message_json = JSON.stringify(e)),
      create()),
    'getAccoutId' === e.type && o(localStorage.currentAccountId);
});
