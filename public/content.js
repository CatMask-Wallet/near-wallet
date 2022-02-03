const CAT_MASK_MESSAGE_PTOC_TYPE =
  'chrome_web3_wallet_CatMaskMessageType_page_to_content';
const CAT_MASK_MESSAGE_BTOC_TYPE =
  'chrome_web3_wallet_CatMaskMessageType_background_to_content';
const CAT_MASK_MESSAGE_CTOP_TYPE =
  'chrome_web3_wallet_CatMaskMessageType_content_to_page';
const inPageBundle = `
const catMask = {
  getAccoutId: function (callback) {
    const json = JSON.stringify({
      type: 'getAccoutId',
      origin: location.origin,
    });
    postMessage({ type: '${CAT_MASK_MESSAGE_PTOC_TYPE}', message: json }, '*');
    const Handler = function (event) {
      if (event.data.type !== '${CAT_MASK_MESSAGE_CTOP_TYPE}') return;
      delete event.data.type
      callback(event.data?.message);
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
    postMessage({ type: '${CAT_MASK_MESSAGE_PTOC_TYPE}', message: json }, '*');
    const Handler = function (event) {
      if (event.data.type !== '${CAT_MASK_MESSAGE_CTOP_TYPE}') return;
      delete event.data.type
      callback(event.data);
      window.removeEventListener('message', Handler);
    };
    window.addEventListener('message', Handler);
  },
};
window.catMask = catMask
`;

window.addEventListener(
  'message',
  function (event) {
    if (event.source != window) return;
    if (event.data.type === CAT_MASK_MESSAGE_PTOC_TYPE) {
      if (!event.data.message) return;
      let json;
      try {
        json = JSON.parse(event.data.message);
      } catch (error) {
        return console.log('invalid message of json');
      }
      if (!json.origin) return;
      chrome.runtime.sendMessage(json, function (response) {
        if (json.type === 'getAccoutId') {
          postMessage(
            { type: CAT_MASK_MESSAGE_CTOP_TYPE, message: response },
            json.origin,
          );
        }
      });
    }
  },
  false,
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request, sender, sendResponse);
  if (request.type === CAT_MASK_MESSAGE_BTOC_TYPE) {
    postMessage(
      { type: CAT_MASK_MESSAGE_CTOP_TYPE, message: request.data },
      request.origin,
    );
  }
  sendResponse('close');
});

if (shouldInjectProvider()) {
  injectScript(inPageBundle);
  // setupStreams();
}

/**
 * Injects a script tag into the current document
 *
 * @param {string} content - Code to be executed in the current document
 */
function injectScript(content) {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', 'false');
    scriptTag.textContent = content;
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
  } catch (error) {
    console.error('MetaMask: Provider injection failed.', error);
  }
}

/**
 * Determines if the provider should be injected
 *
 * @returns {boolean} {@code true} Whether the provider should be injected
 */
function shouldInjectProvider() {
  return (
    doctypeCheck() &&
    suffixCheck() &&
    documentElementCheck() &&
    !blockedDomainCheck()
  );
}

/**
 * Checks the doctype of the current document if it exists
 *
 * @returns {boolean} {@code true} if the doctype is html or if none exists
 */
function doctypeCheck() {
  const { doctype } = window.document;
  if (doctype) {
    return doctype.name === 'html';
  }
  return true;
}

/**
 * Returns whether or not the extension (suffix) of the current document is prohibited
 *
 * This checks {@code window.location.pathname} against a set of file extensions
 * that we should not inject the provider into. This check is indifferent of
 * query parameters in the location.
 *
 * @returns {boolean} whether or not the extension of the current document is prohibited
 */
function suffixCheck() {
  const prohibitedTypes = [/\.xml$/u, /\.pdf$/u];
  const currentUrl = window.location.pathname;
  for (let i = 0; i < prohibitedTypes.length; i++) {
    if (prohibitedTypes[i].test(currentUrl)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks the documentElement of the current document
 *
 * @returns {boolean} {@code true} if the documentElement is an html node or if none exists
 */
function documentElementCheck() {
  const documentElement = document.documentElement.nodeName;
  if (documentElement) {
    return documentElement.toLowerCase() === 'html';
  }
  return true;
}

/**
 * Checks if the current domain is blocked
 *
 * @returns {boolean} {@code true} if the current domain is blocked
 */
function blockedDomainCheck() {
  const blockedDomains = [];
  const currentUrl = window.location.href;
  let currentRegex;
  for (let i = 0; i < blockedDomains.length; i++) {
    const blockedDomain = blockedDomains[i].replace('.', '\\.');
    currentRegex = new RegExp(
      `(?:https?:\\/\\/)(?:(?!${blockedDomain}).)*$`,
      'u',
    );
    if (!currentRegex.test(currentUrl)) {
      return true;
    }
  }
  return false;
}
