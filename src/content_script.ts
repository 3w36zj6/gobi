chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.gobi) {
    console.log(msg.gobi)
  }
});

import kuromoji from "kuromoji"
const path = require("path")


const text = "すもももももももものうち"
kuromoji.builder({ dicPath: chrome.extension.getURL(path.join(__dirname, "/dict")) }).build((error, tokenizer) => {
  if (error) {
    console.log(error)
  } else {
    const tokens = tokenizer.tokenize(text)
    console.log(tokens)
  }
})