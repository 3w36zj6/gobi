chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.gobi) {
    console.log(msg.gobi);
  }
});


