const CAT_MASK_MESSAGE_BTOC_TYPE =
  'chrome_web3_wallet_CatMaskMessageType_background_to_content';

function getExtension() {
  if (chrome?.app) {
    if (chrome?.app.window) {
      return chrome?.app;
    }
  }
  if (chrome?.windows) {
    return chrome;
  }
  return chrome;
}

function create(typeStr) {
  const WINDOW_HEIGHT = 625;
  const WINDOW_WIDTH = 376;
  const extension = getExtension();
  const { create } = extension.windows;
  //   const { screenY, outerWidth, outerHeight } = window;
  //   const windowTop = Math.round(screenY + outerHeight / 2 - WINDOW_HEIGHT);
  //   const windowLeft = Math.round(outerWidth);
  return new Promise((resolve, reject) => {
    try {
      create(
        {
          url: `/index.html?type=${typeStr}`,
          type: 'popup',
          height: WINDOW_HEIGHT,
          width: WINDOW_WIDTH,
          //   top: Math.max(windowTop, 0),
          //   left: Math.max(windowLeft, 0),
          top: 0,
          left: 0,
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

const _chrome = chrome;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request, sender, sendResponse);
  if (request.type === 'signMessage') {
    sendResponse('miss');
    //   localStorage.ptc_message_json = JSON.stringify(request);
    chrome.storage.sync.set(
      { ptc_message_json: JSON.stringify(request) },
      function () {
        create('backgroundMessage');
      },
    );
  }
  if (request.type === 'signTransaction') {
    sendResponse('miss');
    // localStorage.ptc_message_json = JSON.stringify(request);
    chrome.storage.sync.set(
      { ptc_message_json: JSON.stringify(request) },
      function () {
        create('backgroundTransaction');
      },
    );
  }
  if (request.type === 'signTransactionAndSendRaw') {
    sendResponse('miss');
    // localStorage.ptc_message_json = JSON.stringify({
    //   ...request.message,
    //   origin: request.origin,
    // });
    chrome.storage.sync.set(
      {
        ptc_message_json: JSON.stringify({
          ...request.message,
          origin: request.origin,
        }),
      },
      function () {
        create('backgroundTransactionAndSend');
      },
    );
  }
  if (request.type === 'getAccoutId') {
    sendResponse('miss');
    _chrome.storage.sync.get('currentAccountId', ({ currentAccountId }) => {
      _chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tabs.map((tab) => {
          _chrome.tabs.sendMessage(
            tab.id,
            {
              type: CAT_MASK_MESSAGE_BTOC_TYPE,
              data: currentAccountId ?? '',
              origin: request.origin,
            },
            () => {},
          );
        });
      });
    });
  }
});
