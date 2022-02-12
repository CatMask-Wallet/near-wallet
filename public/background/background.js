function getExtension() {
  if (chrome?.app) {
    if (chrome?.app.window) {
      return chrome?.app;
    }
  }
  return chrome;
}

function create(typeStr) {
  const WINDOW_HEIGHT = 625;
  const WINDOW_WIDTH = 376;
  const extension = getExtension();
  const { create } = extension.windows;
  const { screenY, outerWidth, outerHeight } = window;
  const windowTop = Math.round(screenY + outerHeight / 2 - WINDOW_HEIGHT);
  const windowLeft = Math.round(outerWidth);
  return new Promise((resolve, reject) => {
    try {
      create(
        {
          url: `/index.html?type=${typeStr}`,
          type: 'popup',
          height: WINDOW_HEIGHT,
          width: WINDOW_WIDTH,
          top: Math.max(windowTop, 0),
          left: Math.max(windowLeft, 0),
        },
        (details) => {
          resolve(details);
        },
      );
    } catch (e) {
      reject(e);
    }
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request, sender, sendResponse);
  if (request.type === 'signMessage') {
    sendResponse('miss');
    localStorage.ptc_message_json = JSON.stringify(request);
    create('backgroundMessage');
  }
  if (request.type === 'signTransaction') {
    sendResponse('miss');
    localStorage.ptc_message_json = JSON.stringify(request);
    create('backgroundTransaction');
  }
  if (request.type === 'signTransactionAndSendRaw') {
    sendResponse('miss');
    localStorage.ptc_message_json = JSON.stringify({
      ...request.message,
      origin: request.origin,
    });
    create('backgroundTransactionAndSend');
  }
  if (request.type === 'getAccoutId') {
    sendResponse(localStorage.currentAccountId);
  }
});
