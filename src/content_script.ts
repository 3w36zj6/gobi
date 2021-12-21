
import kuromoji from "kuromoji"
const path = require("path")

const replaceDocument = (gobi: string) => {
  kuromoji.builder({ dicPath: chrome.extension.getURL(path.join(__dirname, "/dict")) }).build((error, tokenizer) => {
    if (error) {
      console.log(error)
    } else {
      var elementsInsideBody = [...document.body.getElementsByTagName("*")]

      elementsInsideBody.forEach(element => {
        element.childNodes.forEach(child => {
          if (child.nodeType === 3) {
            let value = child.nodeValue
            let value_new = ""
            const tokens = tokenizer.tokenize(value!)

            // 語尾を付与
            for (let i = 0; i < tokens.length; i++) {
              const token = tokens[i]
              const token_next = tokens[i + 1]
              if ((["形容詞", "名詞", "感動詞", "助動詞"].includes(token.pos)) && ((token_next == undefined) || (token_next.pos == "記号"))) {
                value_new += token.surface_form + gobi
              } else {
                value_new += token.surface_form
              }
            }
            child.nodeValue = value_new
          }
        })
      })
    }
  })

}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.gobi) {
    replaceDocument(msg.gobi)
  }
});
