console.log('popup.js loaded');

document.getElementById('makeBold').addEventListener('click', async () => {
  console.log('makeBold button clicked')
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (chrome.scripting && chrome.scripting.executeScript) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });
    }
  } catch (error) {
    console.error('Error executing script:', error);
  }
});

document.getElementById('revertBold').addEventListener('click', async () => {
  console.log('revertBold button clicked')
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (chrome.scripting && chrome.scripting.executeScript) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['anticontent.js'],
      });
    }
  } catch (error) {
    console.error('Error executing script:', error);
  }
});
