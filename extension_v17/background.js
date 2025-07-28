chrome.action.onClicked.addListener(async (tab) => {
  try {
    const [res] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: "MAIN",
      func: async () => {
        const { sRGBHex } = await new EyeDropper().open();
        await navigator.clipboard.writeText(sRGBHex);
        return sRGBHex;
      }
    });
    const hex = res.result;
    const url = `https://encycolorpedia.com/${hex.slice(1)}`;
    chrome.tabs.create({ url });
  } catch (err) {
    console.error(err);
    chrome.notifications.create("", {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icon128.png"),
      title: "Color Picker Error",
      message: err.message
    });
  }
});
chrome.commands.onCommand.addListener(cmd => {
  if(cmd === "pick-and-isolate") chrome.action.onClicked.dispatch();
});