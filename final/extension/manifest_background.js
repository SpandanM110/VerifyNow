
console.log("Heell");
chrome.browserAction.onClicked.addListener(buttonClicked)





'use strict'; // numpy_and_numjs_compare.js

const python = require('python-bridge'); // https://www.npmjs.com/package/python-bridge
const nj = require('numjs'); // www.npmjs.com/package/numjs

const py = python(); // return value
let {
  ex, // no return value
  end,
} = py;

// <Python Modules>

ex`import numpy as np`;
ex`import pandas`;

// </>

function fromPython(pycode = {}) {
  return JSON.stringify(pycode);
}

function toJavaScript(pystr = "") {
  return JSON.parse(pystr)
}

function fromPy(pycode = {}) {
  return toJavaScript(fromPython(pycode));
}

async function pyscript() {
  try {
    // If you want, use POSIX command line with $time after you read manual for that $man time
    // and tweak the example here

    // Test here is to compare time taken to assign return values to variables

    // console.log(new Date());
    // let testnumpy = fromPy(await py`np.arange(1000).reshape(50, 20).tolist()`);
    // console.log(new Date()); // 1.8 ~ 2 seconds

    console.log(new Date());
    let testnumjs = nj.arange(1000).reshape(50, 20).tolist();
    console.log(new Date()); // About 0.05 seconds
  } catch (e) { console.log(e) }
  end();
}

(async () => {
  await pyscript();
})().catch(error => {
  console.log("error");
  console.error(error);
});


function buttonClicked(tab) {
    let para = document.getElementsByTagName('p').textContent;
    // document.getElementsByTagName('div').textContent = "helll";
    for (elt of para) {
        console.log(elt);
        elt.style['background-color'] = '#FF00FF';
    }
    console.log("Heell");
    let msg = {
        txt: "heel" + para
        
    }
    chrome.tabs.sendMessage(tab.id, msg)
}