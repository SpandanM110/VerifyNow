let para = document.getElementsByTagName('p');
for (elt of para) {
    console.log(elt);
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
}


// Function to extract text from the active tab
function extractText() {
    var text = '';
    // Get all the text nodes on the page
    var textNodes = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    // Iterate over each text node and append the text content to the 'text' variable
    for (var i = 0; i < textNodes.snapshotLength; i++) {
      text += textNodes.snapshotItem(i).textContent.trim() + '\n';
    }
    // Return the extracted text
    return text;
  }
  
  // Function to create and download a CSV file
  function downloadCSV(csv, filename) {
    var csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var csvUrl = URL.createObjectURL(csvBlob);
    var downloadLink = document.createElement('a');
    downloadLink.href = csvUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  // Listen for clicks on the browser action
  chrome.browserAction.onClicked.addListener(function(tab) {
    // Extract text from the active tab
    var text = '';
    chrome.tabs.executeScript({
      code: '(' + extractText + ')();'
    }, function(result) {
      text = result[0];
      // Download the extracted text as a CSV file
      downloadCSV(text, 'text.csv');
    });
  });
  